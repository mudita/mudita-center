import { ipcMain } from "electron-better-ipc"
import translationStores from "App/main/store/translations"
import { TranslationEvents } from "Common/enums/translations.enum"
import settingsStore from "App/main/store/settings"
import { defaultLanguage } from "App/translations.config.json"

const registerTranslationListener = () => {
  ipcMain.answerRenderer(TranslationEvents.Get, () => {
    const language = settingsStore.get("language") || defaultLanguage
    return {
      store: translationStores[language].store,
      language,
    }
  })
}

export default registerTranslationListener
