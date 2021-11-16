/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcMain } from "electron-better-ipc"
import { IpcFileSystem } from "App/file-system/constants/ipc-file-system.enum"
import CryptoFileService, {
  CryptoFileOption,
} from "App/file-system/services/crypto-file-service/crypto-file-service"

const registerDecryptFileListener = (): void => {
  ipcMain.answerRenderer<CryptoFileOption, Uint8Array | undefined>(
    IpcFileSystem.DecryptFile,
    CryptoFileService.decrypt
  )
}

export default registerDecryptFileListener
