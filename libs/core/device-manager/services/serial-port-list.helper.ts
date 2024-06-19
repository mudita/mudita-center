/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { getMockedDevices, mockServiceEnabled } from "e2e-mock-server"
import SerialPort, { PortInfo } from "serialport"

export const getSerialPortList = () => {
  if (mockServiceEnabled) {
    return new Promise<PortInfo[]>((resolve) => {
      resolve(getMockedDevices())
    })
  }
  return SerialPort.list()
}
