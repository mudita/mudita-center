/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import PurePhoneBackupAdapter from "Backend/adapters/pure-phone-backups/pure-phone-backups-adapter.class"
import BackupItemInfo from "Common/interfaces/backup-item-info.interface"
import fs from "fs-extra"
import path from "path"
import moment from "moment"
import DeviceResponse, {
  DeviceResponseStatus,
} from "Backend/adapters/device-response.interface"
import getAppSettingsMain from "App/main/functions/get-app-settings"

class PurePhoneBackups extends PurePhoneBackupAdapter {
  public async getBackups(): Promise<DeviceResponse<BackupItemInfo[]>> {
    const { pureOsBackupLocation } = await getAppSettingsMain()
    let backups: BackupItemInfo[] = []

    const regex = /^pure_backup_(\d{12})\.zip$/m

    if (await fs.pathExists(pureOsBackupLocation)) {
      const files = (
        await fs.readdir(pureOsBackupLocation)
      ).filter((fileName) => fileName.startsWith("pure_backup_20"))

      const promises = files.map(async (fileName) => {
        try {
          const { size } = await fs.stat(
            path.join(pureOsBackupLocation, fileName)
          )
          const datetime = fileName.match(regex)?.[1]

          if (datetime) {
            const createdAt = moment(datetime, "YYYYMMDDhhmm").format()

            return {
              createdAt,
              size,
            }
          } else {
            return null
          }
        } catch (error) {
          return null
        }
      })

      const fulfilledPromises = (await Promise.allSettled(promises)).filter(
        ({ status }) => status === "fulfilled"
      ) as PromiseFulfilledResult<BackupItemInfo>[]

      backups = fulfilledPromises.map(({ value }) => value)
    }

    return {
      status: DeviceResponseStatus.Ok,
      data: backups,
    }
  }
}

const createPurePhoneBackupsAdapter = (): PurePhoneBackupAdapter =>
  new PurePhoneBackups()

export default createPurePhoneBackupsAdapter
