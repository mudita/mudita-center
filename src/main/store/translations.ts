import Store from "electron-store"
import { app } from "electron"
import { name } from "../../../package.json"
import { LANGUAGE } from "Renderer/constants/languages"

const commonOptions = {
  cwd: `${app.getPath("appData")}/${name}/locales`,
  clearInvalidConfig: process.env.NODE_ENV === "production",
}

const translationStores: Record<string, Store> = {}

for (const lang of LANGUAGE.available) {
  let defaults = {}
  try {
    defaults = require(`../../renderer/locales/default/${lang}.json`)
  } catch (error) {
    console.log(`No default translations file for language "${lang}"`)
  }

  translationStores[lang] = new Store({
    name: lang,
    defaults,
    ...commonOptions,
  })
}

export default translationStores
