/**
 * @callback netlifyCallback
 */

const config = require("../config")
const moment = require("moment")
const { v4: uuidv4 } = require("uuid")

const { GithubAPI } = require("./github")
const { FB } = require("fb")
FB.setAccessToken(config.apikey)

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
      token: config.token,
    })

    gh.init()
      .then(() => {
        FB.api(
          "",
          "post",
          {
            batch: [
              { method: "get", relative_url: "/me/events" },
              { method: "get", relative_url: "/techvista18/events" },
            ],
          },
          function(response) {
            const filesToPush = []

            response.forEach(item => {
              const file = JSON.parse(item.body)
              file.data.forEach(event => {
                const date = moment(event.start_time).format("YYYY-MM-DD")
                const id = uuidv4()

                filesToPush.push({
                  content: JSON.stringify({
                    templateKey: "fb-post",
                    id,
                    source: "fb",
                    title: event.name,
                    url: `facebook.com/${event.id}`,
                    page: "test page",
                    description: event.description,
                    date,
                    location: Object.prototype.hasOwnProperty.call(
                      event,
                      "place"
                    )
                      ? event.place.name
                      : "",
                  }),
                  path: `src/data/fb/fb-${date}-${id}.json`,
                })
              })
            })

            gh.pushFiles(
              `FB-JSON storage in CMS on ${Date()}`,
              filesToPush
            ).then(() => {
              callback(null, {
                statusCode: 200,
                body: JSON.stringify(filesToPush),
              })
            })
          }
        )
      })
      .catch(err => {
        callback(err)
      })
  }
}

module.exports.handler = sourceFB
