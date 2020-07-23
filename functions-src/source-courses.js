/**
 * @callback netlifyCallback
 */

const config = require("../config");
const { GithubAPI } = require("./github");
const {FB, FacebookApiException} = require('fb');
FB.setAccessToken(config.apikey)
const axios = require("axios")
/**
 * Pulls in FB events, saves it in a JSON, and pushes these JSONs as files to Github, where they are recognized by Netlify CMS.
 * @async
 * @param {Object} event: Provided by Netlify, this is similar to the event object received from the AWS API Gateway.
 * @param {Object} context: Provided by Netlify if Identity is enabled, contains a `clientContext` object with `identity` and `user` properties.
 * @param {netlifyCallback} callback: Defined like callback in an AWS Lambda function, used to return either an error, or a response object.
 */
const sourceFB = (_event, context, callback) => {
  if (context.clientContext) {
    let gh = new GithubAPI({
      token: config.token
    });

    gh.setRepo('akirillo', 'begin_2.0-jamstack');
    gh.setBranch('master')
      .then(() => {
        axios.get(`https://apis.berkeley.edu/uat/sis/v2/courses?subject-area-code=COMPSCI&sort-by=last-updated&page-number=1&page-size=50`)
          .then((response) => {
          const filesToPush = [];

          filesToPush.add(JSON.stringify(response))

          gh.pushFiles(`Courses storage in CMS on ${Date()}`, filesToPush)
            .then(() => {
              callback(null, {
                statusCode: 200,
                body: JSON.stringify(filesToPush),
              })
            })
        })
        .catch(err => {
            callback(err);
        })
    })
    .catch(err => {
      callback(err);
    })
  }
};
 
module.exports.handler = sourceFB;