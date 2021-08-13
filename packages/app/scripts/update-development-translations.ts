namespace UpdateDevelopmentTranslation {
  const axios = require("axios")
  const path = require("path")
  const fs = require("fs-extra")
  const { availableLanguages } = require("../src/translations.config.json")
  const FormData = require("form-data")

  require("dotenv").config({
    path: path.join(__dirname, "../../../.env"),
  })

  const script = async () => {
    try {
      console.log(`Sending translations to phrase.com [DEV]`)

      const localesDir = "./src/renderer/locales/"

      for (const { code, id, dev } of availableLanguages) {
        const filePath = `${localesDir}${code}.json`

        if ((await fs.pathExists(filePath)) && dev) {
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
  }

  script()
}
