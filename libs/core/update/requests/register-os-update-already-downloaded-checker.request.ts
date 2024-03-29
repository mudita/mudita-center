/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcMain } from "electron-better-ipc"
import fs from "fs-extra"
import path from "path"
import getAppSettingsMain from "Core/__deprecated__/main/functions/get-app-settings"
import { OsRelease } from "Core/update/dto"

export const osUpdateAlreadyDownloadedChannel = "os-update-exists-check"

export const registerOsUpdateAlreadyDownloadedCheck = (): void => {
  ipcMain.answerRenderer<OsRelease["file"], boolean>(
    osUpdateAlreadyDownloadedChannel,
    async ({ url, size }) => {
      const fileName = url.split("/").pop() as string
      const { osDownloadLocation } = await getAppSettingsMain()
      const filePath = path.join(osDownloadLocation, fileName)

      return fs.existsSync(filePath) && fs.statSync(filePath).size === size
    }
  )
}
