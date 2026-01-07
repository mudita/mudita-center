/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import SHA3 from "crypto-js/sha3"
import encBase64 from "crypto-js/enc-base64"
import AES from "crypto-js/aes"
import { ApiDevice, BackupFileValidator } from "devices/api-device/models"
import { AppSettings } from "app-settings/renderer"
import { AppFileSystem } from "app-utils/renderer"

interface SaveBackupStepParams {
  device: ApiDevice
  files: Record<string, string>
  password?: string
}

export const saveBackupStep = async ({
  device,
  files,
  password,
}: SaveBackupStepParams) => {
  if (!device.productId || !device.vendorId) {
    throw new Error("Device is missing productId or vendorId")
  }
  const appVersion = await AppSettings.get("version")
  const header = {
    vendorId: device.vendorId,
    productId: device.productId,
    serialNumber: device.serialNumber,
    appVersion,
    ...(password
      ? { password: SHA3(password).toString(encBase64), crypto: "AES" }
      : {}),
  }
  const data = Object.entries(files).reduce((acc, [feature, featureData]) => {
    const encryptedData = password
      ? AES.encrypt(featureData, password).toString()
      : featureData
    return { ...acc, [feature]: encryptedData }
  }, {})

  const fileToSave = BackupFileValidator.safeParse({
    header,
    data,
  })
  if (!fileToSave.success) {
    throw new Error("Failed to create backup file")
  }

  const backupDirectory = await AppSettings.get("user.backupLocation")
  const deviceDirectory = `${device.vendorId}-${device.productId}`
  const fileName = device.serialNumber
    ? `${Date.now()}_${device.serialNumber}`
    : `${Date.now()}`
  const fileExtension = ".mcbackup"

  await AppFileSystem.writeFile({
    fileAbsolutePath: [
      backupDirectory,
      deviceDirectory,
      fileName + fileExtension,
    ],
    absolute: true,
    data: fileToSave.data,
    options: { writeAsJson: true },
  })
  return [backupDirectory, deviceDirectory]
}
