/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import DeviceResponse from "Backend/adapters/device-response.interface"
import { DeviceFile } from "Backend/adapters/device-file-system/device-file-system-adapter.class"

export default abstract class DeviceBackupAdapter {
  public abstract backuping : boolean
  public abstract downloadDeviceBackup(): Promise<DeviceResponse<DeviceFile>>
}
