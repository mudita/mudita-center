/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcRenderer } from "electron-better-ipc"
import { osUpdateAlreadyDownloadedChannel } from "App/update/requests/register-os-update-already-downloaded-checker.request"
import { Release } from "App/update/types"

export const osUpdateAlreadyDownloadedCheck = (
  file: Release["file"]
): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    try {
      const data = ipcRenderer.callMain<Release["file"], boolean>(
        osUpdateAlreadyDownloadedChannel,
        file
      )
      resolve(data)
    } catch (error) {
      reject(error)
    }
  })
}
