import { Device } from "usb"
import SerialPort from "serialport"
import { SerialPortAdapterClass } from "./serial-port-adapter.class"

export class SerialPortAdapter implements SerialPortAdapterClass {
  public async request(device: Device, payload: any): Promise<string> {
    const serialPort = new SerialPort(device.path)

    const request = this.createValidRequest({
      ...payload,
      uuid: this.uuid(),
    })

    return serialPort.write(request)
  }

  private uuid(): number {
    return Math.floor(Math.random() * 10000)
  }

  private createValidRequest(payload: unknown): string {
    const encoder = new TextEncoder()

    let requestStr = "#"
    const payloadAsString = JSON.stringify(payload)
    const sizeAsString = String(
      encoder.encode(payloadAsString).length
    ).padStart(9, "0")
    requestStr += sizeAsString
    requestStr += payloadAsString

    return requestStr
  }
}
