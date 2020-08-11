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
  const token = event.headers.authorization.replace(/Bearer/i, "").trim()
  jwt.verify(token, process.env.JWT_SECRET, error => {
    if (!error) {
      gh.init()
        .then(() => {
          return gh.getConfigs("rss")
        })
        .then(rssConfigs => {
          const feedPromises = []

          rssConfigs.forEach(config => {
            feedPromises.push(rssParser.parseURL(config.url))
          })

          return Promise.all(feedPromises).then(feeds => {
            return feeds.map((feed, i) => ({
              feed,
              feedKey: rssConfigs[i].feedKey,
            }))
          })
        })
        .then(feeds => {
          const filesToPush = []

          feeds.forEach(feedObj => {
            const { feed } = feedObj
            const { feedKey } = feedObj
            feed.items.forEach(item => {
              const date = moment(item.isoDate).format("YYYY-MM-DD")
              const id = uuidv4()

              if (item.contentSnippet) {
                filesToPush.push({
                  content: Buffer.from(
                    JSON.stringify({
                      templateKey: "rss-post",
                      id,
                      feedKey,
                      title: item.title,
                      url: item.guid,
                      author: item.creator,
                      excerpt: item.contentSnippet,
                      date,
                    })
                  ),
                  path: `src/data/rss/${feedKey}-${date}-${id}.json`,
                })
              }
            })
          })

          gh.pushFiles(
            `[skip netlify] RSS content push on ${moment().format(
              "YYYY-MM-DD"
            )}`,
            filesToPush
          ).then(() => {
            callback(null, {
              statusCode: 200,
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
