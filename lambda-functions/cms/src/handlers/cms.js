const contentful = require("contentful")
/**
 * A Lambda function that downloads data from Contentful.
 */
exports.retrieveCMSData = async (event) => {
  try {
    if (event.httpMethod.toLocaleLowerCase() === "post") {
      const body = JSON.parse(event.body)
      const client =
        body.resource === "help"
          ? contentful.createClient({
              accessToken: process.env.MC_CONTENTFUL_ACCESS_TOKEN,
              space: process.env.MC_CONTENTFUL_SPACE_ID,
              environment: process.env.MC_CONTENTFUL_ENVIRONMENT_ID,
              host: process.env.MC_CONTENTFUL_HOST,
            })
          : contentful.createClient({
              accessToken: process.env.MUDITA_WEB_CONTENTFUL_ACCESS_TOKEN,
              space: process.env.MUDITA_WEB_CONTENTFUL_SPACE_ID,
            })
      const data = await client[body.method](body.query)
      return {
        statusCode: 200,
        body: JSON.stringify(data),
      }
    } else {
      return {
        statusCode: 405,
      }
    }
  } catch (e) {
    console.log(e)
  }
}
