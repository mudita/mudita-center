namespace GetProductionTranslation {
  const axios = require("axios")
  const path = require("path")
  const fs = require("fs-extra")
  const { localesUrl, axiosConfig } = require("../src/common/configs/phrase")

  require("dotenv").config({
    path: path.join(__dirname, "../../../.env"),
  })

  interface Locale {
    id: string
    name: string
    code: string
    default: boolean
    main: boolean
    rtl: boolean
    plural_forms: string[]
    created_at: string
    updated_at: string
    source_locale: string | null
  }

  const script = async () => {
    try {
      const { data: locales } = await axios.get(localesUrl, axiosConfig)

      const nonEmptyLocales = locales.filter((locale: Locale) => {
        const suffix = locale.name.split("-").slice(-1)[0]
        return Object.keys(locale).length > 0 && suffix !== "dev"
      })

      for (const { id, code } of nonEmptyLocales) {
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

        await fs.ensureFileSync(path.resolve(localesJsonPath))

        if (Object.keys(data).length) {
          let translations = data

          if (fs.pathExists(path.resolve(localesJsonPath))) {
            const oldTranslations =
              (await fs.readJson(path.resolve(localesJsonPath), {
                throws: false,
              })) ?? {}
            translations = {
              ...oldTranslations,
              ...data,
            }
          }

          await fs.writeJson(path.resolve(localesJsonPath), translations)

          console.log(`Translation for ${code} saved`)
        }
      }
      console.log("Translations config updated successfully")
    } catch (error) {
      console.log(error)
    }
  }

  script()
}
