/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import { ipcRenderer } from "electron-better-ipc"
import { osUpdateAlreadyDownloadedChannel } from "App/main/functions/register-os-update-already-downloaded-checker"
import { Release } from "App/main/functions/register-pure-os-update-listener"

const osUpdateAlreadyDownloadedCheck = (
  file: Release["file"]
): Promise<boolean> => {
  return new Promise(async (resolve, reject) => {
    try {
      const data = await ipcRenderer.callMain<Release["file"], boolean>(
        osUpdateAlreadyDownloadedChannel,
        file
      )
      resolve(data)
    } catch (error) {
      reject(error)
    }
  })
}

export default osUpdateAlreadyDownloadedCheck
