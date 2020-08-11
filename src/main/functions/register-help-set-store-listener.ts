import { ipcMain } from "electron-better-ipc"
import { HelpActions } from "Common/enums/help-actions.enum"
import helpStore from "App/main/store/help"

const registerHelpSetStoreListener = () => {
  ipcMain.handle(HelpActions.SetStoreValue, (event, response) => {
    return helpStore.set("data", response)
  })
}

export default registerHelpSetStoreListener
