/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { DownloadDeviceFileLocallyOptions } from "App/__deprecated__/backend/adapters/device-file-system/device-file-system-adapter.class"
import DeviceBackupAdapter from "App/__deprecated__/backend/adapters/device-backup/device-backup-adapter.class"
import {
  RequestResponse,
  RequestResponseStatus,
} from "App/core/types/request-response.interface"

export class DeviceBackupFakeAdapter implements DeviceBackupAdapter {
  public backuping = false

  async downloadDeviceBackup(
    options: DownloadDeviceFileLocallyOptions
  ): Promise<RequestResponse<string[]>> {
    return {
      status: RequestResponseStatus.Ok,
      data: [],
    }
  }
}

const createFakeDeviceBackupAdapter = (): DeviceBackupAdapter =>
  new DeviceBackupFakeAdapter()

export default createFakeDeviceBackupAdapter
