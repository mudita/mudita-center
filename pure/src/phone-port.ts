import SerialPort from "serialport"
import { ConnectResponse, ConnectResponseStatus } from "./types"

class PhonePort {
  port: SerialPort | undefined

  connect(path: string): Promise<ConnectResponse> {
    return new Promise((resolve) => {
      this.port = new SerialPort(path)
      this.port.on("open", () => {
        resolve({ status: ConnectResponseStatus.Ok })
      })
    })
  }
}

export type CreatePhonePort = () => PhonePort

export const createPhonePort: CreatePhonePort = () => new PhonePort()

export default PhonePort
