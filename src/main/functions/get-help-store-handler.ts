import { ipcMain } from "electron-better-ipc"
import { HelpActions } from "Common/enums/help-actions.enum"
import helpStore from "App/main/store/help"

export const registerGetHelpStoreHandler = () =>
  ipcMain.handle(HelpActions.GetStore, (event, response) => {
    return helpStore.get("data")
  })

export const removeHetHelpStoreHandler = () =>
  ipcMain.removeHandler(HelpActions.GetStore)
