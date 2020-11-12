import SerialPort from "serialport"
import { EventEmitter } from "events"
import path from "path"
import * as fs from "fs"
import {
  BodyCommand,
  Endpoint,
  EventName,
  FileResponseStatus,
  Method,
  RequestConfig,
  Response,
  ResponseStatus,
} from "./types"
import { createValidRequest, getNewUUID, portData } from "./parser"
import { Contact, CountBodyResponse } from "./endpoints/contact.types"
import { DeviceInfo } from "./endpoints/device-info.types"

class PhonePort {
  private port: SerialPort | undefined
  private eventEmitter = new EventEmitter()
  private isPolling = true

  async connect(path: string): Promise<Response> {
    return new Promise((resolve) => {
      this.port = new SerialPort(path, (error) => {
        if (error) resolve({ status: ResponseStatus.ConnectionError })
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
          if (error) resolve({ status: ResponseStatus.ConnectionError })
          resolve({ status: ResponseStatus.Ok })
        })
      }
    })
  }

  async request(
    config: {
      endpoint: Endpoint.DeviceInfo
      method: Method.Get
    }
  ): Promise<Response<DeviceInfo>>
  async request(
    config: {
      endpoint: Endpoint.Contacts
      method: Method.Get
      body: true
    }
  ): Promise<Response<CountBodyResponse>>
  async request(
    config: {
      endpoint: Endpoint.Contacts
      method: Method.Get
      body: number
    }
  ): Promise<Response<Contact[]>>
  async request(
    config: {
      endpoint: Endpoint.Contacts
      method: Method.Post
      body: Contact
    }
  ): Promise<Response<Contact>>
  async request(
    config: {
      endpoint: Endpoint.Contacts
      method: Method.Put
      body: Contact
    }
  ): Promise<Response<Contact>>
  async request(
    config: {
      endpoint: Endpoint.Contacts
      method: Method.Delete
      body: Contact["id"]
    }
  ): Promise<Response<string>>
  async request(
    config: {
      endpoint: Endpoint.PureUpdate
      method: Method.Post
      file: string
    }
  ): Promise<Response>
  async request(
    config: {
      endpoint: Endpoint.File
      method: Method.Post
      file: string
    }
  ): Promise<Response>
  async request(config: RequestConfig): Promise<Response<any>>
  async request(config: RequestConfig): Promise<Response<any>> {
    if (config.endpoint === Endpoint.File) {
      return this.fileRequest(config)
    } else if (config.endpoint === Endpoint.PureUpdate) {
      return this.pureUpdateRequest(config)
    } else {
      return new Promise((resolve) => {
        if (!this.port || !this.isPolling) {
          resolve({ status: ResponseStatus.ConnectionError })
        } else {
          // TODO: check that UUID has any requirements in the contract
          // uuid not working with pure contract
          // timestamp not working with pure contract
          const uuid = getNewUUID()

          const listener = async (event: any) => {
            const response = await portData(event)

            if (response.uuid === String(uuid)) {
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
  }

  on(eventName: EventName, listener: () => void): void {
    this.eventEmitter.on(eventName, listener)
  }

  off(eventName: EventName, listener: () => void): void {
    this.eventEmitter.off(eventName, listener)
  }

  private async fileRequest({ file }: RequestConfig): Promise<Response<any>> {
    return new Promise((resolve) => {
      if (!this.port || !this.isPolling || !file) {
        resolve({ status: ResponseStatus.ConnectionError })
      } else {
        this.isPolling = false
        const uuid = getNewUUID()

        const listener = async (event: any) => {
          const response = await portData(event)

          if (response.uuid === String(uuid)) {
            if (response.body.status === ResponseStatus.InternalServerError) {
              this.eventEmitter.off(EventName.DataReceived, listener)
              this.isPolling = true
              resolve(response)
            } else if (response.body.status === FileResponseStatus.Ok) {
              const readStream = fs.createReadStream(file, {
                highWaterMark: 16384,
              })

              readStream.on("data", (data) => {
                if (this.port) {
                  this.port.write(data)
                  this.port.drain()
                }
              })

              // readStream.on("error", (err) => {})

              readStream.on("end", () => {
                this.isPolling = true
              })
            }

            // uuid implementation is missing?
          } else if (
            response.endpoint === Endpoint.FilesystemUpload &&
            response.status === ResponseStatus.Accepted
          ) {
            this.eventEmitter.off(EventName.DataReceived, listener)
            resolve(response)
          }
        }

        this.eventEmitter.on(EventName.DataReceived, listener)

        const fileName = path.basename(file)
        const fileSize = fs.lstatSync(file).size

        const newConfig = {
          uuid,
          endpoint: Endpoint.FilesystemUpload,
          method: Method.Post,
          body: {
            fileName,
            fileSize,
            command: BodyCommand.Download,
          },
        }

        const request = createValidRequest(newConfig)
        this.port.write(request)
      }
    })
  }

  private pureUpdateRequest(config: RequestConfig): Promise<Response<any>> {
    return new Promise((resolve) => {
      if (!this.port || !this.isPolling || !config.file) {
        resolve({ status: ResponseStatus.ConnectionError })
      } else {
        this.isPolling = false
        const uuid = getNewUUID()

        const listener = async (event: any) => {
          const response = await portData(event)

          // uuid implementation is missing?
          if (response.endpoint === Endpoint.Update) {
            if (response.body.status === "Ready for reset") {
              this.eventEmitter.off(EventName.DataReceived, listener)
              resolve({ status: ResponseStatus.Ok })
            }
          }
        }

        this.eventEmitter.on(EventName.DataReceived, listener)

        const fileName = path.basename(config.file)
        const newConfig = {
          uuid,
          endpoint: Endpoint.Update,
          method: Method.Post,
          body: {
            fileName,
          },
        }

        const request = createValidRequest(newConfig)
        this.port.write(request)
      }
    })
  }
}

export type CreatePhonePort = () => PhonePort

export const createPhonePort: CreatePhonePort = () => new PhonePort()

export default PhonePort
