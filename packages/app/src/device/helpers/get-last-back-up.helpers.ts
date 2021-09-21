/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import DeviceResponse from "Backend/adapters/device-response.interface"
import BackupInfo from "Common/interfaces/backup-info"

export const getLastBackUp = (backupsInfo: DeviceResponse<BackupInfo>) => {
  return backupsInfo.data!.backups.sort(
    (a, b) => Number(new Date(b.createdAt)) - Number(new Date(a.createdAt))
  )[0]
}
