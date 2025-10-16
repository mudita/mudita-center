/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ApiDevice } from "devices/api-device/models"
import { AppFileSystem } from "app-utils/renderer"
import { AppSettings } from "app-settings/renderer"

interface ReadBackupsListParams {
  device: ApiDevice
}
export const readBackupsList = async ({ device }: ReadBackupsListParams) => {
  const backupDirectory = await AppSettings.get("user.backupLocation")

  const directories = await AppFileSystem.readDir({
    fileAbsolutePath: backupDirectory,
    absolute: true,
  })
  if (!directories.ok) {
    return []
  }

  const deviceDirectories = directories.data.filter((dir) => {
    const [vid, pid] = dir.split("-")
    return (
      [device.vendorId, ...(device.otherVendorIds || [])].includes(vid) &&
      [device.productId, ...(device.otherProductIds || [])].includes(pid)
    )
  })

  return (
    await Promise.all(
      deviceDirectories.map(async (dir) => {
        const filesResponse = await AppFileSystem.readDir({
          fileAbsolutePath: [backupDirectory, dir],
          absolute: true,
        })
        if (!filesResponse.ok) {
          return []
        }
        return filesResponse.data
          .map((file) => {
            const [name, ext] = file.split(".")
            const [date, serialNumber] = name.split("_")

            if (ext !== "mcbackup" || serialNumber !== device.serialNumber) {
              return null
            }
            return {
              path: [backupDirectory, dir, file],
              createdAt: new Date(Number(date)),
            }
          })
          .filter(Boolean) as { path: string[]; createdAt: Date }[]
      })
    )
  )
    .flat()
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
}
