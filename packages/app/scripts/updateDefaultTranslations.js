const path = require("path")
const axios = require("axios")
const fs = require("fs-extra")
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
    const config = {
      availableLanguages: [],
      defaultLanguage: "",
    }

    const { data: locales } = await axios.get(localesUrl, axiosConfig)
    await fs.ensureDir(path.resolve(path.join("src", "renderer", "locales")))

    const nonEmptyLocales = locales.filter(
      (locale) => Object.keys(locale).length > 0
    )

    for (const { id, code, default: defaultLanguage } of nonEmptyLocales) {
      const localesJsonPath = path.join(
        "src",
        "renderer",
        "locales",
        `${code}.json`
      )
      const { data } = await axios.get(`${localesUrl}/${id}/download`, {
        ...axiosConfig,
        params: { file_format: "react_simple_json" },
      })

      if (defaultLanguage) {
        config.defaultLanguage = code
      }

      if (Object.keys(data).length) {
        let translations = data

        if (!process.env.OVERWRITE) {
          if (fs.pathExists(path.resolve(localesJsonPath))) {
            const oldTranslations = await fs.readJson(
              path.resolve(localesJsonPath)
            )
            translations = {
              ...oldTranslations,
              ...data,
            }
          }
        }

        await fs.writeJson(path.resolve(localesJsonPath), translations)
        config.availableLanguages.push({
          id,
          code,
        })
        console.log(`Translation for ${code} sent`)
      }
    }

    await fs.writeJson(
      path.resolve(path.join("src", "translations.config.json")),
      config
    )
    console.log("Translations config updated successfully")
  } catch (error) {
    console.log(error)
  }
})()
