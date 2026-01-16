/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { SerialPortApiDevice } from "./api-device/serial-port-api-device"
// import { SerialPortPureDevice } from "./pure-device/serial-port-pure-device"
import { SerialPortHarmonyDevice } from "./harmony-device/serial-port-harmony-device"
import { SerialPortHarmonyMscDevice } from "./harmony-device/serial-port-harmony-msc-device"

export const devices = [
  SerialPortApiDevice,
  // SerialPortPureDevice,
  SerialPortHarmonyDevice,
  SerialPortHarmonyMscDevice,
]
