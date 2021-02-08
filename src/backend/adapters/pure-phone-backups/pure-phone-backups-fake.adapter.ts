/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import PurePhoneBackupAdapter from "Backend/adapters/pure-phone-backups/pure-phone-backups-adapter.class"
import BackupItemInfo from "Common/interfaces/backup-item-info.interface"
import DeviceResponse, {
  DeviceResponseStatus,
} from "Backend/adapters/device-response.interface"

class PurePhoneBackupsFake extends PurePhoneBackupAdapter {
  public async getBackups(): Promise<DeviceResponse<BackupItemInfo[]>> {
    return {
      status: DeviceResponseStatus.Ok,
      data: [
        {
          createdAt: "2020-01-15T07:35:01.562Z",
          size: 1234,
        },
      ],
    }
  }
}

const createFakePurePhoneBackupsAdapter = (): PurePhoneBackupAdapter =>
  new PurePhoneBackupsFake()

export default createFakePurePhoneBackupsAdapter
