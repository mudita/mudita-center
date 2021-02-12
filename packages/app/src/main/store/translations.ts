import Store from "electron-store"
import { app } from "electron"
import { name } from "../../../package.json"
import { availableLanguages } from "App/translations.config.json"

const commonOptions = {
  cwd: `${app.getPath("appData")}/${name}/locales`,
  clearInvalidConfig: process.env.NODE_ENV === "production",
}

const translationStores: Record<string, Store> = {}

for (const { code } of availableLanguages) {
  let defaults = {}
  try {
    defaults = require(`../../renderer/locales/default/${code}.json`)
  } catch (error) {
    console.log(`No default translations file for language "${code}"`)
  }

  translationStores[code] = new Store({
    name: code,
    defaults,
    ...commonOptions,
  })
}

export default translationStores
