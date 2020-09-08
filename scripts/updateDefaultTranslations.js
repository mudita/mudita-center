const axios = require("axios")
const fs = require("fs-extra")
require("dotenv").config()

/**
 * Function that updates default translations files. It fetches all translations
 * registered for given project on phrase.com (that are not empty) and creates
 * according JSON files in src/renderer/locales/default/ directory.
 *
 * It also updates src/translations.config.json file that contains all available
 * languages and the default one set on phrase.com app.
 *
 * Can be run with node by running "npm run update:translations" command.
 */
;(async () => {
  try {
    const config = {
      availableLanguages: [],
      defaultLanguage: "",
    }

    const { data: locales } = await axios.get(
      `${process.env.PHRASE_API_URL}/locales/`,
      {
        headers: {
          Authorization: `token ${process.env.PHRASE_API_KEY}`,
        },
      }
    )

    await fs.ensureDir("./src/renderer/locales/default/")

    for (const { id, code, default: defaultLanguage } of locales) {
      const { data } = await axios.get(
        `${process.env.PHRASE_API_URL}/locales/${id}/download`,
        {
          headers: {
            Authorization: `token ${process.env.PHRASE_API_KEY}`,
          },
          params: { file_format: "react_simple_json" },
        }
      )

      if (defaultLanguage) {
        config.defaultLanguage = code
      }

      if (Object.keys(data).length) {
        await fs.writeJson(`./src/renderer/locales/default/${code}.json`, data)
        config.availableLanguages.push({
          id,
          code,
        })
        console.log(`${code} translations updated successfully`)
      }
    }

    await fs.writeJson(`src/translations.config.json`, config)
    console.log("Translations config updated successfully")
  } catch (error) {
    console.log(error)
  }
})()
