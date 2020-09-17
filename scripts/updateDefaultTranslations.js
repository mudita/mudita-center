const axios = require("axios")
const fs = require("fs-extra")
require("dotenv").config()
const { localesUrl, axiosConfig } = require("../src/common/configs/phrase")

/**
 * Function that updates default translations files. It fetches all translations
 * registered for given project on phrase.com (that are not empty) and creates
 * according JSON files in src/renderer/locales/default/ directory.
 *
 * By default local translations are merged with the new ones. This can be made
 * with
 *    "npm run translations:update"
 * command, while
 *    "npm run translations:overwrite"
 * will overwrite local translations file.
 *
 * It also updates src/translations.config.json file that contains info about
 * all available languages and the default one set on phrase.com app.
 */
;(async () => {
  try {
    let iterator = 0
    const config = {
      availableLanguages: [],
      defaultLanguage: "",
    }

    const { data: locales } = await axios.get(localesUrl, axiosConfig)

    await fs.ensureDir("./src/renderer/locales/default/")

    for (const { id, code, default: defaultLanguage } of locales) {
      const { data } = await axios.get(`${localesUrl}/${id}/download`, {
        ...axiosConfig,
        params: { file_format: "react_simple_json" },
      })

      if (defaultLanguage) {
        config.defaultLanguage = code
      }

      if (Object.keys(data).length) {
        let translations = {}

        if (!process.env.OVERWRITE) {
          if (fs.pathExists(`./src/renderer/locales/default/${code}.json`)) {
            const oldTranslations = await fs.readJson(
              `./src/renderer/locales/default/${code}.json`
            )
            translations = {
              ...oldTranslations,
              ...data,
            }
          }
        } else {
          translations = data
        }

        await fs.writeJson(
          `./src/renderer/locales/default/${code}.json`,
          translations
        )
        config.availableLanguages.push({
          id,
          code,
        })
        iterator++
        console.log(`Translation for ${code} updated`)
      }
    }

    await fs.writeJson(`src/translations.config.json`, config)
    console.log("Translations config updated successfully")
  } catch (error) {
    console.log(error)
  }
})()
