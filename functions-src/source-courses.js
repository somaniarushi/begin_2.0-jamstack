/**
 * @callback netlifyCallback
 */

const jwt = require("jsonwebtoken")
const moment = require("moment")
const { v4: uuidv4 } = require("uuid")
const gh = require("./github")
const axios = require("axios")
/**
 * Pulls in FB events, saves it in a JSON, and pushes these JSONs as files to Github, where they are recognized by Netlify CMS.
 * @async
 * @param {Object} event: Provided by Netlify, this is similar to the event object received from the AWS API Gateway.
 * @param {Object} context: Provided by Netlify if Identity is enabled, contains a `clientContext` object with `identity` and `user` properties.
 * @param {netlifyCallback} callback: Defined like callback in an AWS Lambda function, used to return either an error, or a response object.
 */
const sourceCourses = (event, _context, callback) => {
  const token = event.headers.authorization.replace(/Bearer/i, "").trim()
  jwt.verify(token, process.env.JWT_SECRET, error => {
    if (!error) {
      gh.init()
        .then(() => {
          return gh.getConfigs("courses")
        })
        .then(courseConfigs => {
          const coursePromises = []

          courseConfigs.forEach(courseConfig => {
            coursePromises.push(
              axios({
                method: "GET",
                url: `https://apis.berkeley.edu/uat/sis/v2/courses/${courseConfig.id}`,
                params: {
                  "id-type": "cms-version-independent-id",
                },
                headers: {
                  Accept: "application/json",
                  app_id: process.env.COURSES_APP_ID,
                  app_KEY: process.env.COURSES_APP_KEY,
                },
              })
            )
          })

          return Promise.all(coursePromises).then(courseResponses =>
            courseResponses.map((courseResponse, i) => ({
              course: courseResponse.data.apiResponse.response.courses[0],
              courseKey: courseConfigs[i].courseKey,
            }))
          )
        })
        .then(courses => {
          const filesToPush = []

          courses.forEach(courseObj => {
            const { course } = courseObj
            const { courseKey } = courseObj

            const id = uuidv4()

            filesToPush.push({
              content: Buffer.from(
                JSON.stringify({
                  templateKey: "course",
                  id,
                  courseKey,
                  number: course.displayName,
                  title: course.title,
                  description: course.description,
                })
              ),
              path: `src/data/courses/${courseKey}-${id}`,
            })
          })

          gh.pushFiles(
            `RSS content push on ${moment().format("YYYY-MM-DD")}`,
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

module.exports.handler = sourceCourses
