/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import fs from "fs"
import { SerialisedIndexData } from "elasticlunr"
import CryptoFileService from "App/file-system/services/crypto-file-service/crypto-file-service"

export class SyncFileSystemService {
  constructor(private token: string) {}

  readFileSync(filePath: string): Buffer | undefined | null {
    try {
      const buffer = fs.readFileSync(filePath)
      return CryptoFileService.decryptViaToken({ buffer, token: this.token })
    } catch {
      return null
    }
  }

  writeIndexSync(filePath: string, index: SerialisedIndexData<any>): void {
    const buffer = Buffer.from(JSON.stringify(index))
    const encryptedBuffer = CryptoFileService.encryptViaToken({
      buffer,
      token: this.token,
    })

    if (encryptedBuffer === undefined) {
      throw new Error("Encryption fails")
    }

    fs.writeFileSync(filePath, encryptedBuffer)
  }

  readIndexSync(filePath: string): SerialisedIndexData<any> {
    const index = this.readFileSync(filePath)

    return JSON.parse(index as unknown as string)
  }
}
