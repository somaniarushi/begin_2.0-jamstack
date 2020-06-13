/**
 * @callback netlifyCallback
 */

const config = require("../config");
const Parser = require("rss-parser");
const moment = require("moment");

const rssParser = new Parser();
const { GithubAPI } = require("./github");

/**
 * Pulls in RSS content, saves the source, title, url, author, excerpt, and date of each item in a JSON, and pushes
 * these JSONs as files to Github, where they are recognized by Netlify CMS.
 * @async
 * @param {Object} event: Provided by Netlify, this is similar to the event object received from the AWS API Gateway.
 * @param {Object} context: Provided by Netlify if Identity is enabled, contains a `clientContext` object with `identity` and `user` properties.
 * @param {netlifyCallback} callback: Defined like callback in an AWS Lambda function, used to return either an error, or a response object.
 */
const sourceRSS = (_event, context, callback) => {
  if (context.clientContext) {
    // TODO: Look into using the context object for auth.
    // const { identity, user } = context.clientContext;
    let gh = new GithubAPI({
      token: config.token
    });

    gh.setRepo('akirillo', 'begin_2.0-jamstack');
    gh.setBranch('master')
      .then(() => {
        rssParser.parseURL("http://scet.berkeley.edu/feed/")
          .then(feed => {
            const filesToPush = [];

            feed.items.forEach(item => {
              const date = moment(item.isoDate).format("YYYY-MM-DD");
              filesToPush.push({ content: JSON.stringify({
                source: "scet",
                templateKey: "rss-post",
                title: item.title,
                url: item.guid,
                author: item.creator,
                excerpt: item.contentSnippet,
                date
              }), path: `src/data/rss/scet-${date}.json` })
            })

            gh.pushFiles("Testing JSON usage in CMS", filesToPush)
              .then(() => {
                callback(null, {
                  statusCode: 200,
                  body: JSON.stringify(filesToPush),
                })
              })
          })
      })
      .catch(err => {
        callback(err);
      })
  }
};

module.exports.handler = sourceRSS;