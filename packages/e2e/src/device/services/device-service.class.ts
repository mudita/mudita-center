/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { PortInfo } from "serialport"

export interface DeviceServiceClass {
  startInMSC(): Promise<void>
  getDevice(): Promise<PortInfo>
}
