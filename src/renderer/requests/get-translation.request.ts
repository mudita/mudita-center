import { ipcRenderer } from "electron-better-ipc"
import {
  TranslationEventResponse,
  TranslationEvents,
} from "App/main/functions/register-translation-listener.types"

export const getTranslation = (): Promise<TranslationEventResponse> => {
  return ipcRenderer.callMain(TranslationEvents.Get)
}
