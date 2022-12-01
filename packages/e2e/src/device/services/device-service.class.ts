/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Device } from "usb"

export interface DeviceServiceClass {
  startInMSC(): Promise<void>
  getDevice(): Promise<Device>
}
