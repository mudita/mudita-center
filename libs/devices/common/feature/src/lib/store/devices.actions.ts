/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAction } from "@reduxjs/toolkit"
import { SerialPortDeviceInfo } from "app-serialport/models"

export const setDevices =
  createAction<SerialPortDeviceInfo[]>("devices/setDevices")
