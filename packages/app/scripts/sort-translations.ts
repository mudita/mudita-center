namespace SortTranslations {
  const fs = require("fs-extra")
  const { availableLanguages } = require("../src/translations.config.json")

  const script = async () => {
    console.log("Sorting translations")

    try {
      for (const { code } of availableLanguages) {
        const filePath = `./src/renderer/locales/default/${code}.json`

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
        }
      }
    } catch (error: any) {
      console.log(error)
    }
  }

  script()
}
