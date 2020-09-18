require("dotenv").config()

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
