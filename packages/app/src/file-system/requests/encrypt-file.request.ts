/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcRenderer } from "electron-better-ipc"
import { IpcFileSystem } from "App/file-system/constants"
import { CryptoFileOptions } from "App/file-system/services/crypto-file-service/crypto-file-service"

const encryptFile = async (
  options: CryptoFileOptions
): Promise<Uint8Array | undefined> => {
  return await ipcRenderer.callMain(IpcFileSystem.EncryptFile, options)
}

export default encryptFile
