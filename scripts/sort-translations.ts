namespace SortTranslations {
  const fs = require("fs-extra")
  const translationConfig = require("../src/translations.config.json")
  const path = require("path")

  const script = async () => {
    console.log("Sorting translations")

    try {
      for (const { code } of translationConfig.availableLanguages) {
        const filePath = path.join(
          __dirname,
          "..",
          `src/__deprecated__/renderer/locales/default/${code}.json`
        )

        if (await fs.pathExists(filePath)) {
          let data: Record<string, string> = await fs.readJson(filePath)

          data = Object.entries(data)
            .sort((a, b) => {
              const keyA = a[0].toLowerCase()
              const keyB = b[0].toLowerCase()
              return keyA > keyB ? 1 : keyB > keyA ? -1 : 0
            })
            .reduce(
              (
                object: Record<string, string>,
                [key, value]: [string, string]
              ) => ((object[key] = value), object),
              {}
            )

          await fs.writeFileSync(filePath, JSON.stringify(data, null, 2))

          console.log(`Translation for ${code} sorted`)
        } else {
          console.error("Translation file not found!", filePath)
        }
      }
    } catch (error: any) {
      console.log(error)
    }
  }

  script()
}
