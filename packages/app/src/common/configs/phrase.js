const path = require("path")
require("dotenv").config({
  path:
    process.env.NODE_ENV === "production"
      ? path.join(__dirname, "../../../.env.production")
      : path.join(__dirname, "../../../.env.development"),
})

const localesUrl = `${process.env.PHRASE_API_URL}/locales`

const axiosConfig = {
  headers: {
    Authorization: `token ${process.env.PHRASE_API_KEY}`,
  },
}

module.exports = {
  localesUrl,
  axiosConfig,
}
