import { ipcMain } from "electron-better-ipc"
import { HelpActions } from "Common/enums/help-actions.enum"
import helpStore from "App/main/store/help"
import { merge } from "lodash"

export const registerSetHelpStoreHandler = () =>
  ipcMain.handle(HelpActions.SetStoreValue, (event, response) => {
    const oldData = helpStore.get("data")
    const newData = merge(oldData, response)
    return helpStore.set("data", newData)
  })

export const removeSetHelpStoreHandler = () =>
  ipcMain.removeHandler(HelpActions.SetStoreValue)
