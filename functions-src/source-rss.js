// from https://www.netlify.com/docs/functions/#identity-and-functions

// Note that `netlify-lambda` only locally emulates Netlify Functions, while `netlify-identity-widget` interacts with a real Netlify Identity instance. This means that `netlify-lambda` doesn't support Netlify Functions + Netlify Identity integration.

// const axios = require("axios");
var vfile = require('vfile')
// var report = require('vfile-reporter')
var unified = require('unified')
var parseRehype = require('rehype-parse')
var rehype2remark = require('rehype-remark')
var stringify = require('remark-stringify')
const config = require("../config");
const Parser = require("rss-parser");

const rssParser = new Parser();
const { GithubAPI } = require("./github");

module.exports.handler = (event, context, callback) => {
  // TODO: Look into context.clientContext
  if (context.clientContext) {
    // const { identity, user } = context.clientContext;

    let gh = new GithubAPI({
      username: config.username,
      password: config.password
    });

    gh.setRepo('akirillo', 'begin_2.0-jamstack');
    gh.setBranch('master')
      .then(() => {
        rssParser.parseURL("http://scet.berkeley.edu/feed/")
          .then(feed => {
            const processor = unified()
            .use(parseRehype, {emitParseErrors: true, duplicateAttribute: false})
            .use(rehype2remark)
            .use(stringify);

            const filesToPush = [];
            const filePromises = [];

            feed.items.forEach(item => {
              filePromises.push(processor.process(vfile(Buffer.from(item["content:encoded"]))));
            })
            
            Promise.all(filePromises)
            .then(files => {
              files.forEach((file, i)=> {
                filesToPush.push({ content: file.toString(), path: `src/data/rss/test-${i}.md` })
              })

              gh.pushFiles("Testing multiple file push", filesToPush)
                .then(() => {
                  callback(null, {
                    statusCode: 200,
                    body: JSON.stringify(feed.items),
                  })
                })

            })
          })
      })
      .catch(err => {
        callback(err);
      })
  }
}
