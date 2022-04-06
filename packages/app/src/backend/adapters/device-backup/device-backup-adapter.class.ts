/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { DownloadDeviceFileLocallyOptions } from "Backend/adapters/device-file-system/device-file-system-adapter.class"
import { RequestResponse } from "App/core/types/request-response.interface"

export default abstract class DeviceBackupAdapter {
  public abstract backuping: boolean
  public abstract downloadDeviceBackup(
    options: DownloadDeviceFileLocallyOptions
  ): Promise<RequestResponse<string[]>>
}
