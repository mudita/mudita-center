import { ipcMain } from "electron-better-ipc"
import { HelpActions } from "Common/enums/help-actions.enum"
import helpStore from "App/main/store/help"

export enum AppLogsEvents {
  Get = "get-app-logs",
}

const registerHelpSetStoreListener = () => {
  ipcMain.handle(HelpActions.SetStoreValue, (event, response) => {
    return helpStore.set("data", response)
  })
}

export default registerHelpSetStoreListener
