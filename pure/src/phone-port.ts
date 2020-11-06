import SerialPort from "serialport"
import { Response, ResponseStatus } from "./types"

class PhonePort {
  port: SerialPort | undefined

  connect(path: string): Promise<Response> {
    return new Promise((resolve) => {
      this.port = new SerialPort(path)
      this.port.on("open", () => {
        resolve({ status: ResponseStatus.Ok })
      })
    })
  }

  disconnect(): Promise<Response> {
    return Promise.resolve({ status: ResponseStatus.Error })
  }
}

export type CreatePhonePort = () => PhonePort

export const createPhonePort: CreatePhonePort = () => new PhonePort()

export default PhonePort
