import { ipcMain } from "electron-better-ipc"
import { HelpActions } from "Common/enums/help-actions.enum"
import helpStore from "App/main/store/help"

export const registerGetHelpStoreHandler = () =>
  ipcMain.answerRenderer(HelpActions.GetStore, () => {
    return helpStore.get("data")
  })

export const removeGetHelpStoreHandler = () =>
  ipcMain.removeHandler(HelpActions.GetStore)
