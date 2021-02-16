/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import { ipcMain } from "electron-better-ipc"
import AutoLaunch from "auto-launch"
import { app } from "electron"
import { SettingsActions } from "Common/enums/settings-actions.enum"
import logger from "App/main/utils/logger"

const registerAutoLaunchListener = () => {
  if (process.env.NODE_ENV === "production") {
    const autoLaunch = new AutoLaunch({
      name: "PureDesktopApp",
      path: app.getPath("exe"),
      isHidden: true,
    })
    ipcMain.answerRenderer(SettingsActions.GetAutostartValue, async () => {
      try {
        return await autoLaunch.isEnabled()
      } catch (error) {
        logger.error(error)
        return false
      }
    })
    ipcMain.answerRenderer(SettingsActions.SetAutostart, async (response) => {
      try {
        if (response) {
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
  }
}

export default registerAutoLaunchListener
