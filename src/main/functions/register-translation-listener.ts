import { ipcMain } from "electron-better-ipc"
import translationStores from "App/main/store/translations"
import { TranslationEvents } from "App/main/functions/register-translation-listener.types"
import settingsStore from "App/main/store/settings"
import { defaultLanguage } from "App/translations.config.json"

const registerTranslationListener = () => {
  ipcMain.answerRenderer(TranslationEvents.Get, () => {
    const language = settingsStore.get("language") || defaultLanguage
    return {
      store: translationStores[defaultLanguage].store,
      language,
    }
  })
}

export default registerTranslationListener
