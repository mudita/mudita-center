/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { DeviceId } from "Core/device/constants/device-id"

export interface CreateDeviceBackup {
  cwd: string
  token?: string
  extract?: boolean
  fileBase?: string
  key?: string
  deviceId?: DeviceId
}
