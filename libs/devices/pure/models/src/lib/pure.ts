/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  SerialPortDeviceInfo,
  SerialPortDeviceType,
} from "app-serialport/models"

export type Pure = Pick<
  SerialPortDeviceInfo<SerialPortDeviceType.Pure>,
  "deviceType" | "path" | "id"
> &
  Partial<Omit<SerialPortDeviceInfo, "deviceType" | "path" | "id">>
