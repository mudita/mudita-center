/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import SHA3 from "crypto-js/sha3"
import encBase64 from "crypto-js/enc-base64"
import { BackupFile } from "devices/api-device/models"

interface CheckBackupPasswordParams {
  password?: string
  header: BackupFile["header"]
}

export const checkBackupPassword = ({
  password,
  header,
}: CheckBackupPasswordParams) => {
  if (password && "password" in header) {
    const passwordHash = SHA3(password).toString(encBase64)
    return passwordHash === header.password
  }
  return true
}
