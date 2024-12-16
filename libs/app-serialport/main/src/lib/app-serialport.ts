/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { SerialPort } from "serialport"

export class AppSerialport {
  private instances: Map<string, SerialPort>

  constructor() {
    this.instances = new Map()
  }

  private instanceExists(path: string) {
    return this.instances.has(path)
  }

  private createInstance(path: string) {
    const serialPort = new SerialPort({ path, baudRate: 9600 })
    this.instances.set(path, serialPort)
  }

  private ensureInstance(path: string) {
    if (!this.instanceExists(path)) {
      this.createInstance(path)
    }
    return this.instances.get(path) as SerialPort
  }

  changeBaudRate(path: string, baudRate: number) {
    const serialPort = this.ensureInstance(path)
    serialPort.update({ baudRate })
  }

  write(path: string, data: string) {
    const serialPort = this.ensureInstance(path)
    serialPort.write(data)
  }
}
