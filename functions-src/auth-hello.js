// from https://www.netlify.com/docs/functions/#identity-and-functions

// Note that `netlify-lambda` only locally emulates Netlify Functions, while `netlify-identity-widget` interacts with a real Netlify Identity instance. This means that `netlify-lambda` doesn't support Netlify Functions + Netlify Identity integration.

// // const GitHub = require('github-api');
// const gh = new GitHub({ username: "", password: "" });

const axios = require("axios");

module.exports.handler = (event, context, callback) => {
  if (context.clientContext) {
    const { identity, user } = context.clientContext;
    console.log(identity, user);

    const testBuf = new Buffer("testing testing 1 2 3");

    axios.post("https://api.github.com/repos/akirillo/begin_2.0-jamstack/contents/src/data/test.txt", {
      message: "testing github api",
      content: testBuf.toString("base64")
    })
      .then(res => {
        callback(null, {
          statusCode: 200,
          body: JSON.stringify(res.data),
        })
      })

    // const repo = gh.getRepo("akirillo", "begin_2.0-jamstack");

    // repo.writeFile("master", "src/data/test.txt", "testing testing 1 2 3", "testing github api")
    //   .then(res => {
    //     callback(null, {
    //       statusCode: 200,
    //       body: JSON.stringify(res.data),
    //     })
    //   })
      
    // callback(null, {
    //   statusCode: 200,
    //   body: JSON.stringify("null"),
    // })
  } else {
    console.log(`
    Note that netlify-lambda only locally emulates Netlify Functions, 
    while netlify-identity-widget interacts with a real Netlify Identity instance. 
    This means that netlify-lambda doesn't support Netlify Functions + Netlify Identity integration.
    `)
    callback(null, {
      statusCode: 200,
      body: JSON.stringify({
        msg:
          "auth-hello - no authentication detected. Note that netlify-lambda doesnt locally emulate Netlify Identity.",
      }),
    })
  }
}
