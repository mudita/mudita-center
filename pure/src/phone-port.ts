import SerialPort from "serialport"
import { EventEmitter } from "events"
import { EventName, RequestConfig, Response, ResponseStatus } from "./types"
import { createValidRequest, getNewUUID, portData } from "./parser"

class PhonePort {
  port: SerialPort | undefined
  eventEmitter = new EventEmitter()

  async connect(path: string): Promise<Response> {
    return new Promise((resolve) => {
      this.port = new SerialPort(path, (error) => {
        if (error) resolve({ status: ResponseStatus.Error })
        resolve({ status: ResponseStatus.Ok })
      })

      this.port.on("data", (event) => {
        this.eventEmitter.emit(EventName.DataReceived, event)
      })

      this.port.on("close", () => {
        this.eventEmitter.emit(EventName.Disconnected)
      })
    })
  }

  async disconnect(): Promise<Response> {
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

  async request(config: RequestConfig): Promise<Response> {
    return new Promise((resolve) => {
      if (this.port === undefined) {
      } else {
        // TODO: check that UUID has any requirements in the contract
        // uuid not working with pure contract
        // timestamp not working with pure contract
        const uuid = getNewUUID()

        const listener = async (event: any) => {
          const response = await portData(event)

          if(response.uuid === String(uuid)){
            this.eventEmitter.off(EventName.DataReceived, listener)
            resolve(response)
          }
        }

        this.eventEmitter.on(EventName.DataReceived, listener)

        const request = createValidRequest({ ...config, uuid })
        this.port.write(request)
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
