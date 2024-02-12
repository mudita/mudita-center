/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { DeviceStatus } from "./status"
import OverviewOsVersion from "./overview-os-version"
import AboutDataBox from "./about-data-box"
import { BackupBox } from "./backup-box"

export const predefinedComponents = {
  "device-status": DeviceStatus,
  "overview-os-version": OverviewOsVersion,
  "about-data-box": AboutDataBox,
  "backup-box": BackupBox,
}
