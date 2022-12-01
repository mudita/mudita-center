/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcMain } from "electron-better-ipc"
import { IpcFileSystem } from "App/file-system/constants/ipc-file-system.enum"
import CryptoFileService, {
  CryptoFileOptions,
} from "App/file-system/services/crypto-file-service/crypto-file-service"

const registerDecryptFileListener = (): void => {
  ipcMain.answerRenderer<CryptoFileOptions, Uint8Array | undefined>(
    IpcFileSystem.DecryptFile,
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/unbound-method
    CryptoFileService.decrypt
  )
}

export default registerDecryptFileListener
