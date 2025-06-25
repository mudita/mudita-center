/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  SerialPortDeviceInfo,
  SerialPortDeviceType,
} from "app-serialport/models"

export type Harmony = Pick<
  SerialPortDeviceInfo<SerialPortDeviceType.Harmony>,
  "deviceType" | "path"
> &
  Partial<Omit<SerialPortDeviceInfo, "deviceType" | "path">>
