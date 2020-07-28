/**
 * @callback netlifyCallback
 */

const Parser = require("rss-parser")
const moment = require("moment")
const { v4: uuidv4 } = require("uuid")
const jwt = require("jsonwebtoken")

const rssParser = new Parser()
const gh = require("./github")

/**
 * Pulls in RSS content, saves the source, id, title, url, author, excerpt, and date of each item in a JSON, and pushes
 * these JSONs as files to Github, where they are recognized by Netlify CMS.
 * @async
 * @param {Object} event: Provided by Netlify, this is similar to the event object received from the AWS API Gateway.
 * @param {Object} context: Provided by Netlify if Identity is enabled, contains a `clientContext` object with `identity` and `user` properties.
 * @param {netlifyCallback} callback: Defined like callback in an AWS Lambda function, used to return either an error, or a response object.
 */
const sourceRSS = (event, _context, callback) => {
  const token = event.headers.Authorization.replace(/Bearer/i, "").trim()
  jwt.verify(token, process.env.JWT_SECRET, error => {
    if (!error) {
      gh.init()
        .then(() => {
          return gh.getSources("rss")
        })
        .then(sources => {
          const feedPromises = []

          sources.forEach(source => {
            feedPromises.push({
              promise: rssParser.parseURL(source.url),
              source: source.sourceKey,
            })
          })

          return Promise.all(
            feedPromises.map(feedPromise => feedPromise.promise)
          ).then(feeds => {
            return feeds.map((feed, i) => ({
              feed,
              source: sources[i].sourceKey,
            }))
          })
        })
        .then(feeds => {
          const filesToPush = []

          feeds.forEach(feedObj => {
            const { feed } = feedObj
            const { source } = feedObj
            feed.items.forEach(item => {
              const date = moment(item.isoDate).format("YYYY-MM-DD")
              const id = uuidv4()

              filesToPush.push({
                content: JSON.stringify({
                  templateKey: "rss-post",
                  id,
                  source,
                  title: item.title,
                  url: item.guid,
                  author: item.creator,
                  excerpt: item.contentSnippet,
                  date,
                }),
                path: `src/data/rss/${source}-${date}-${id}.json`,
              })
            })
          })

          gh.pushFiles(
            `RSS content push on ${moment().format("YYYY-MM-DD")}`,
            filesToPush
          ).then(() => {
            callback(null, {
              statusCode: 200,
              headers: {
                "Content-Type": "text/html; charset=UTF-8",
              },
              body: JSON.stringify(filesToPush),
            })
          })
        })
        .catch(err => {
          callback(err)
        })
    } else {
      console.log(error)
    }
  })
}

module.exports.handler = sourceRSS
