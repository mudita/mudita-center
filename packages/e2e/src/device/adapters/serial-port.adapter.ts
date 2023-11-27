/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Device } from "usb"
import SerialPort from "serialport"
import { SerialPortAdapterClass } from "./serial-port-adapter.class"
import { SerialPortParser } from "../../pure/parsers"
import { Response } from "../../pure/types"
export class SerialPortAdapter implements SerialPortAdapterClass {
  public async request(device: Device, payload: any): Promise<Response> {
    const serialPort = new SerialPort(device.path)

    const request = SerialPortParser.createValidRequest({
      ...payload,
      uuid: SerialPortParser.getNewUUID(),
    })

    serialPort.write(request)
    const result = await this.handleSerialPortResponse(serialPort)
    serialPort.close()

    return new SerialPortParser().parseData(result)
  }

  public async requests(device: Device, payloads: any[]): Promise<Response[]> {
    const serialPort = new SerialPort(device.path)

    const requests = payloads.map((payload) =>
      SerialPortParser.createValidRequest({
        ...payload,
        uuid: SerialPortParser.getNewUUID(),
      })
    )
    const responses: Response[] = []

    for (const request of requests) {
      serialPort.write(request)
      const result = await this.handleSerialPortResponse(serialPort)

      responses.push(new SerialPortParser().parseData(result))
    }

    serialPort.close()

    return responses
  }

  private handleSerialPortResponse(serialPort: SerialPort): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      serialPort.on("data", (event) => {
        resolve(event)
      })

      serialPort.on("error", (event) => {
        reject(event)
      })
    })
  }
}
