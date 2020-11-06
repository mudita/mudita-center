import SerialPort from "serialport"
import { EventName, Response, ResponseStatus } from "./types"
import { EventEmitter } from "events"

class PhonePort {
  port: SerialPort | undefined
  eventEmitter = new EventEmitter()

  connect(path: string): Promise<Response> {
    return new Promise((resolve) => {
      this.port = new SerialPort(path)
      this.port.on("open", () => {
        resolve({ status: ResponseStatus.Ok })
      })

      this.port.on("close", () => {
        this.eventEmitter.emit(EventName.Disconnected)
      })
    })
  }

  disconnect(): Promise<Response> {
    return new Promise((resolve) => {
      if (this.port === undefined) {
        resolve({ status: ResponseStatus.Ok })

      } else {
        this.port.close()
        this.port.on("close", () => {
          resolve({ status: ResponseStatus.Ok })
        })
      }
    })
  }

  on(eventName: EventName, listener: () => void): void {
    this.eventEmitter.on(eventName, listener)
  }
}

export type CreatePhonePort = () => PhonePort

export const createPhonePort: CreatePhonePort = () => new PhonePort()

export default PhonePort
