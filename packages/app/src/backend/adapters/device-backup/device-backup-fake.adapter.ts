/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import DeviceResponse, {
  DeviceResponseStatus,
} from "Backend/adapters/device-response.interface"
import { DeviceFile } from "Backend/adapters/device-file-system/device-file-system-adapter.class"
import DeviceBackupAdapter from "Backend/adapters/device-backup/device-backup-adapter.class"

export class DeviceBackupFakeAdapter implements DeviceBackupAdapter {
  async downloadDeviceBackup(): Promise<DeviceResponse<DeviceFile>> {
    return {
      status: DeviceResponseStatus.Ok,
      data: {
        name: `<YYYY-MM-DD>T<HHMMSS>Z`,
        data: Buffer.from("backup data"),
      },
    }
  }
}

const createFakeDeviceBackupAdapter = (): DeviceBackupAdapter =>
  new DeviceBackupFakeAdapter()

export default createFakeDeviceBackupAdapter
