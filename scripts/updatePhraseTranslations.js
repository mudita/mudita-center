const axios = require("axios")
const fs = require("fs-extra")
const path = require("path")
require("dotenv").config({
  path:
    process.env.NODE_ENV === "production"
      ? path.join(__dirname, "../.env.production")
      : path.join(__dirname, "../.env.development"),
})

const { availableLanguages } = require("../src/translations.config.json")
const FormData = require("form-data")

/**
 * Function that uploads translation files to phrase.com.
 * Translation files are taken from src/renderer/locales/default/ directory.
 *
 * Phrase will automatically merge the sent files with its current translations
 * with the following strategy:
 * - new key are added
 * - existing keys won't be overwritten
 *
 * Can be run with node by running "npm run translations:send" command.
 */
;(async () => {
  try {
    console.log(`Sending translations to phrase.com`)
    const localesDir = "./src/renderer/locales/default/"

    for (const { code, id } of availableLanguages) {
      const filePath = `${localesDir}${code}.json`
      if (await fs.pathExists(filePath)) {
        const formData = new FormData()
        formData.append("file_format", "react_simple_json")
        formData.append("locale_id", id)
        formData.append("file", fs.createReadStream(filePath))

        await axios.post(`${process.env.PHRASE_API_URL}/uploads`, formData, {
          headers: {
            Authorization: `token ${process.env.PHRASE_API_KEY_DEV}`,
            ...formData.getHeaders(),
          },
        })
        console.log(`Translation for ${code} sent`)
      }
    }
  } catch (error) {
    console.log(error)
  }
})()
