/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { getMockedDevices } from "e2e-mock-server"
// import SerialPort, { PortInfo } from "serialport"
import { PortInfo } from "serialport"

export const getSerialPortList = () => {
  // if (process.env.MOCK_DEVICE_ENABLED === "1") {
  //   return new Promise<PortInfo[]>((resolve) => {
  //     resolve(getMockedDevices())
  //   })
  // }
  // return SerialPort.list()
  return new Promise<PortInfo[]>((resolve) => {
    resolve(getMockedDevices())
  })
}
