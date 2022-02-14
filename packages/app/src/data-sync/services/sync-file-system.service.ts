/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import fs from "fs"
import { SerialisedIndexData } from "elasticlunr"
import CryptoFileService from "App/file-system/services/crypto-file-service/crypto-file-service"
import { SyncFileSystemClass } from "App/data-sync/services/sync-file-system-class"
import path from "path"

export class SyncFileSystemService implements SyncFileSystemClass {
  constructor(private token: string) {}

  readFileSync(filePath: string): Buffer | undefined {
    const buffer = fs.readFileSync(filePath)
    return CryptoFileService.decryptViaToken({ buffer, token: this.token })
  }

  writeIndexSync(filePath: string, index: SerialisedIndexData<any>): void {
    const serialisedIndex = JSON.stringify(index) ?? ""
    const buffer = Buffer.from(serialisedIndex)

    const encryptedBuffer = CryptoFileService.encryptViaToken({
      buffer,
      token: this.token,
    })

    if (encryptedBuffer === undefined) {
      throw new Error("Encryption fails")
    }

    const fileDir = path.dirname(filePath)
    if (!fs.existsSync(fileDir)) {
      fs.mkdirSync(fileDir, {
        recursive: true,
      })
    }
    fs.writeFileSync(filePath, encryptedBuffer)
  }

  readIndexSync(filePath: string): SerialisedIndexData<any> {
    const index = this.readFileSync(filePath)

    return JSON.parse(index as unknown as string)
  }
}
