/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { PortInfo } from "serialport"
import { DeviceType } from "./device-type.constant"

export interface DeviceBaseProperties extends PortInfo {
  id: string
  deviceType: DeviceType
  serialNumber: string | undefined
}
