import SerialPort from "serialport"
import { EventName, Response, ResponseStatus } from "./types"
import { EventEmitter } from "events"

class PhonePort {
  port: SerialPort | undefined
  eventEmitter = new EventEmitter()

  connect(path: string): Promise<Response> {
    return new Promise((resolve) => {
      this.port = new SerialPort(path, (error) => {
        if (error) resolve({ status: ResponseStatus.Error })
        resolve({ status: ResponseStatus.Ok })
      })

      // data listener have to be register to allow works well for close event 🙈
      this.port.on("data", () => {})

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
        this.port.close((error) => {
          if (error) resolve({ status: ResponseStatus.Error })
          resolve({ status: ResponseStatus.Ok })
        })
      }
    })
  }

  on(eventName: EventName, listener: () => void): void {
    this.eventEmitter.on(eventName, listener)
  }

  off(eventName: EventName, listener: () => void): void {
    this.eventEmitter.off(eventName, listener)
  }
}

export type CreatePhonePort = () => PhonePort

export const createPhonePort: CreatePhonePort = () => new PhonePort()

export default PhonePort
