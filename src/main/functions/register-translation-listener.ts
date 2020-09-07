import { ipcMain } from "electron-better-ipc"
import translationStores from "App/main/store/translations"
import { TranslationEvents } from "App/main/functions/register-translation-listener.enum"
import settingsStore from "App/main/store/settings"

const registerTranslationListener = () => {
  ipcMain.answerRenderer(TranslationEvents.Get, () => {
    const language = settingsStore.get("language")?.tag || "en-US"
    return translationStores[language].store
  })
}

export default registerTranslationListener
