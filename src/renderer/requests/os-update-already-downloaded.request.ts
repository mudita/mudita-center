/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import { ipcRenderer } from "electron-better-ipc"
import { osUpdateAlreadyDownloadedChannel } from "App/main/functions/register-os-update-already-downloaded-checker"
import { Filename, Filesize } from "Renderer/interfaces/file-download.interface"

const osUpdateAlreadyDownloadedCheck = (
  filePath: Filename,
  fileSize: Filesize
): Promise<boolean> => {
  return new Promise(async (resolve, reject) => {
    try {
      const data = await ipcRenderer.callMain<
        { filePath: Filename; fileSize: Filesize },
        boolean
      >(osUpdateAlreadyDownloadedChannel, { filePath, fileSize })
      resolve(data)
    } catch (error) {
      reject(error)
    }
  })
}

export default osUpdateAlreadyDownloadedCheck
