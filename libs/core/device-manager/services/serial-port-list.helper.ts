/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { getMockedDevices } from "e2e-mock-server"
// import SerialPort from "serialport"
import { PortInfo } from "serialport"

export const getSerialPortList = () => {
  return new Promise<PortInfo[]>((resolve) => {
    resolve(getMockedDevices())
  })
  //   return SerialPort.list()
}
