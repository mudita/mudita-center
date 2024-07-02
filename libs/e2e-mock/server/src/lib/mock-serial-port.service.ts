/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import SerialPort from "serialport"
import { ISerialPortService } from "Libs/device-protocol/feature/src/services/serial-port.service"
import { getMockedDevices } from "./mock-descriptor/mock-descriptor"

export class MockSerialPortService implements ISerialPortService {
  async list(): Promise<SerialPort.PortInfo[]> {
    return getMockedDevices()
  }
}
