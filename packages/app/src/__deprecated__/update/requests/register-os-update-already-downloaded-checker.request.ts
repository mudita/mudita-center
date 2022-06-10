/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcMain } from "electron-better-ipc"
import fs from "fs-extra"
import path from "path"
import { Release } from "App/__deprecated__/update/types"
import getAppSettingsMain from "App/__deprecated__/main/functions/get-app-settings"

export const osUpdateAlreadyDownloadedChannel = "os-update-exists-check"

export const registerOsUpdateAlreadyDownloadedCheck = (): void => {
  ipcMain.answerRenderer<Release["file"], boolean>(
    osUpdateAlreadyDownloadedChannel,
    async ({ url, size }) => {
      const fileName = url.split("/").pop() as string
      const { pureOsDownloadLocation } = await getAppSettingsMain()
      const filePath = path.join(pureOsDownloadLocation, fileName)

      return fs.existsSync(filePath) && fs.statSync(filePath).size === size
    }
  )
}
