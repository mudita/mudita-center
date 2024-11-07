/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { DeviceType } from "device-protocol/models"

export const isCoreDevice = (deviceType: DeviceType): boolean => {
  return (
    deviceType === DeviceType.MuditaHarmony ||
    deviceType === DeviceType.MuditaPure
  )
}
