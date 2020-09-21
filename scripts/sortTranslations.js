const fs = require("fs-extra")
const { availableLanguages } = require("../src/translations.config.json")

;(async () => {
  console.log("Sorting translations")
  try {
    for (const { code } of availableLanguages) {
      const filePath = `./src/renderer/locales/default/${code}.json`
      if (await fs.pathExists(filePath)) {
        let data = await fs.readJson(filePath)
        data = Object.entries(data)
          .sort((a, b) => {
            const keyA = a[0].toLowerCase()
            const keyB = b[0].toLowerCase()
            return keyA > keyB ? 1 : keyB > keyA ? -1 : 0
          })
          .reduce((object, [key, value]) => ((object[key] = value), object), {})
        await fs.writeJson(filePath, data)
        console.log(`Translation for ${code} sorted`)
      }
    }
  } catch (error) {
    console.log(error)
  }
})()
