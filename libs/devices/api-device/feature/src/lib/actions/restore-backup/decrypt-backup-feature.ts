/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { BackupFile, BackupFileDecrypted } from "devices/api-device/models"
import AES from "crypto-js/aes"
import encUtf8 from "crypto-js/enc-utf8"

interface DecryptBackupFeatureParams {
  password?: string
  header: BackupFile["header"]
  data: BackupFile["data"][string]
}

export const decryptBackupFeature = ({
  password,
  header,
  data,
}: DecryptBackupFeatureParams): BackupFileDecrypted["data"][string] => {
  let decrypted = data

  if (password && "crypto" in header) {
    switch (header.crypto.toLowerCase()) {
      case "aes": {
        decrypted = AES.decrypt(data, password).toString(encUtf8)
        break
      }
      default: {
        throw new Error(`Unsupported encryption method: ${header.crypto}`)
      }
    }
  }
  return JSON.parse(Buffer.from(decrypted, "base64").toString("utf-8"))
}
