import { ipcMain } from "electron-better-ipc"
import AutoLaunch from "auto-launch"
import { app } from "electron"
import { SettingsActions } from "Common/enums/settings-actions.enum"
import logger from "App/main/utils/logger"

const registerAutoLaunchListener = () => {
  // if (process.env.NODE_ENV === "production") {
  const autoLaunch = new AutoLaunch({
    name: "PureDesktopApp",
    path: app.getPath("exe"),
    isHidden: true,
  })
  let enabled: boolean
  ipcMain.answerRenderer(SettingsActions.GetAutostartValue, async () => {
    try {
      enabled = await autoLaunch.isEnabled()
      return enabled
    } catch (error) {
      logger.error(error)
      return false
    }
  })
  ipcMain.answerRenderer(SettingsActions.SetAutostart, async (response) => {
    try {
      if (response && !enabled) {
        await autoLaunch.enable()
      } else {
        await autoLaunch.disable()
      }
      return true
    } catch (error) {
      logger.error(error)
      return false
    }
  })
  // }
}

export default registerAutoLaunchListener
