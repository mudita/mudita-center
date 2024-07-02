/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import SerialPort from "serialport"

export interface ISerialPortService {
  list(): Promise<SerialPort.PortInfo[]>
}

export class SerialPortService implements ISerialPortService {
  list(): Promise<SerialPort.PortInfo[]> {
    return SerialPort.list()
  }
}
