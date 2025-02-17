/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { SerialPortDeviceInfo } from "app-serialport/models"

export interface DevicesReducer {
  current: SerialPortDeviceInfo[]
}