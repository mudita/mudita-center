import { ipcRenderer } from "electron-better-ipc"
import { TranslationEvents } from "App/main/functions/register-translation-listener.enum"

export const getTranslation = (): Promise<Record<string, string>> => {
  return ipcRenderer.callMain(TranslationEvents.Get)
}
