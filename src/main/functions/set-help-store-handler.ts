import { ipcMain } from "electron-better-ipc"
import { HelpActions } from "Common/enums/help-actions.enum"
import helpStore from "App/main/store/help"

export const registerSetHelpStoreHandler = () =>
  ipcMain.handle(HelpActions.SetStoreValue, (event, response) => {
    return helpStore.set("data", response)
  })

export const removeSetHelpStoreHandler = () =>
  ipcMain.removeHandler(HelpActions.SetStoreValue)
