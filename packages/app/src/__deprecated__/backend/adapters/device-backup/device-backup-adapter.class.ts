/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { BackupCategory } from "@mudita/pure"
import { DownloadDeviceFileLocallyOptions } from "App/__deprecated__/backend/adapters/device-file-system/device-file-system-adapter.class"
import { RequestResponse } from "App/core/types/request-response.interface"

export default abstract class DeviceBackupAdapter {
  public abstract backuping: boolean
  public abstract downloadDeviceBackup(
    options: DownloadDeviceFileLocallyOptions,
    category?: BackupCategory
  ): Promise<RequestResponse<string[]>>
}
