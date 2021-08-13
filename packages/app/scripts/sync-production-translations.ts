namespace SyncProductionTranslation {
  const axios = require("axios")
  const path = require("path")
  const fs = require("fs-extra")
  const { availableLanguages } = require("../src/translations.config.json")
  const { localesUrl, axiosConfig } = require("../src/common/configs/phrase")
  const FormData = require("form-data")

  require("dotenv").config({
    path: path.join(__dirname, "../../../.env"),
  })

  interface AvailableLanguage {
    id: string
    code: string
    dev: boolean
  }

  interface GroupedLanguages {
    dev: string
    prod: string
  }

  const script = async () => {
    try {
      console.log(`Sending translations to phrase.com [PROD]`)

      const localesDir = "./src/renderer/locales/tmp/"

      const groupedByCode: Record<
        string,
        GroupedLanguages
      > = availableLanguages.reduce(
        (acc: Record<string, GroupedLanguages>, value: AvailableLanguage) => {
          const currentLang = acc[value.code] ?? ({} as GroupedLanguages)
          currentLang[value.dev ? "dev" : "prod"] = value.id
          acc[value.code] = currentLang
          return acc
        },
        {}
      )

      Object.entries(groupedByCode).forEach(
        async ([key, value]: [string, GroupedLanguages]) => {
          if (value.dev && value.prod) {
            const filePath = `${localesDir}${key}.json`
            const { data } = await axios.get(
              `${localesUrl}/${value.dev}/download`,
              {
                ...axiosConfig,
                params: { file_format: "react_simple_json" },
              }
            )

            await fs.ensureFileSync(path.resolve(filePath))
            await fs.writeJson(path.resolve(filePath), data)

            const formData = new FormData()
            formData.append("file_format", "react_simple_json")
            formData.append("locale_id", value.prod)
            formData.append("file", fs.createReadStream(filePath))

            await axios.post(
              `${process.env.PHRASE_API_URL}/uploads`,
              formData,
              {
                headers: {
                  Authorization: `token ${process.env.PHRASE_API_KEY_DEV}`,
                  ...formData.getHeaders(),
                },
              }
            )

            await fs.removeSync(path.resolve(localesDir))

            console.log(`Translation for ${key} synced`)
          }
        }
      )
    } catch (error) {
      console.log(error)
    }
  }

  script()
}
