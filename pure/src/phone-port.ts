import SerialPort from "serialport"
import { EventEmitter } from "events"
import path from "path"
import * as fs from "fs"
import {
  BodyCommand,
  Endpoint,
  PortEventName,
  FileResponseStatus,
  Method,
  RequestConfig,
  Response,
  ResponseStatus, UpdateResponseStatus,
} from "./phone-port.types"
import { createValidRequest, getNewUUID, parseData } from "./parser"
import { Contact, CountBodyResponse } from "./endpoints/contact.types"
import { DeviceInfo } from "./endpoints/device-info.types"

class PhonePort {
  #port: SerialPort | undefined
  #eventEmitter = new EventEmitter()
  #isPolling = true

  constructor(private path: string) {}

  public async connect(): Promise<Response> {
    return new Promise((resolve) => {
      this.#port = new SerialPort(this.path, (error) => {
        if (error) {
          resolve({ status: ResponseStatus.ConnectionError })
        } else {
          resolve({ status: ResponseStatus.Ok })
        }
      })

      this.#port.on("data", async (event) => {
        this.#eventEmitter.emit(PortEventName.DataReceived, event)
      })

      this.#port.on("close", () => {
        this.#eventEmitter.emit(PortEventName.Disconnected)
      })
    })
  }

  public async disconnect(): Promise<Response> {
    return new Promise((resolve) => {
      if (this.#port === undefined) {
        resolve({ status: ResponseStatus.Ok })
      } else {
        this.#port.close((error) => {
          if (error) {
            resolve({ status: ResponseStatus.ConnectionError })
          } else {
            resolve({ status: ResponseStatus.Ok })
          }
        })
      }
    })
  }

  public async request(config: {
    endpoint: Endpoint.DeviceInfo
    method: Method.Get
  }): Promise<Response<DeviceInfo>>
  public async request(config: {
    endpoint: Endpoint.Contacts
    method: Method.Get
    body: { count: true }
  }): Promise<Response<CountBodyResponse>>
  public async request(config: {
    endpoint: Endpoint.Contacts
    method: Method.Get
    body: { count: number }
  }): Promise<Response<Contact[]>>
  public async request(config: {
    endpoint: Endpoint.Contacts
    method: Method.Post
    body: Contact
  }): Promise<Response<Contact>>
  public async request(config: {
    endpoint: Endpoint.Contacts
    method: Method.Put
    body: Contact
  }): Promise<Response<Contact>>
  public async request(config: {
    endpoint: Endpoint.Contacts
    method: Method.Delete
    body: Contact["id"]
  }): Promise<Response<string>>
  public async request(config: {
    endpoint: Endpoint.PureUpdate
    method: Method.Post
    file: string
  }): Promise<Response>
  public async request(config: {
    endpoint: Endpoint.File
    method: Method.Post
    file: string
  }): Promise<Response>
  public async request(config: RequestConfig): Promise<Response<any>>
  public async request(config: RequestConfig): Promise<Response<any>> {
    if (config.endpoint === Endpoint.File) {
      return this.fileRequest(config)
    } else if (config.endpoint === Endpoint.PureUpdate) {
      return this.pureUpdateRequest(config)
    } else {
      return new Promise((resolve) => {
        if (!this.#port || !this.#isPolling) {
          resolve({ status: ResponseStatus.ConnectionError })
        } else {
          const uuid = getNewUUID()

          const listener = async (event: any) => {
            const response = await parseData(event)

            if (response.uuid === String(uuid)) {
              this.#eventEmitter.off(PortEventName.DataReceived, listener)
              resolve(response)
            }
          }

          this.#eventEmitter.on(PortEventName.DataReceived, listener)

          const request = createValidRequest({ ...config, uuid })
          this.#port.write(request)
        }
      })
    }
  }

  public on(eventName: PortEventName, listener: () => void): void {
    this.#eventEmitter.on(eventName, listener)
  }

  public off(eventName: PortEventName, listener: () => void): void {
    this.#eventEmitter.off(eventName, listener)
  }

  private async fileRequest({ file }: RequestConfig): Promise<Response<any>> {
    return new Promise((resolve) => {
      if (!this.#port || !this.#isPolling || !file) {
        resolve({ status: ResponseStatus.ConnectionError })
      } else {
        this.#isPolling = false
        const uuid = getNewUUID()

        const listener = async (event: any) => {
          const response = await parseData(event)

          if (response.uuid === String(uuid)) {
            if (response.body.status === ResponseStatus.InternalServerError) {
              this.#eventEmitter.off(PortEventName.DataReceived, listener)
              this.#isPolling = true
              resolve(response)
            } else if (response.body.status === FileResponseStatus.Ok) {
              const readStream = fs.createReadStream(file, {
                highWaterMark: 16384,
              })

              readStream.on("data", (data) => {
                if (this.#port) {
                  this.#port.write(data)
                  this.#port.drain()
                }
              })

              readStream.on("end", () => {
                this.#isPolling = true
              })
            }
          } else if (
            response.endpoint === Endpoint.FilesystemUpload &&
            response.status === ResponseStatus.Accepted
          ) {
            this.#eventEmitter.off(PortEventName.DataReceived, listener)
            resolve(response)
          }
        }

        this.#eventEmitter.on(PortEventName.DataReceived, listener)

        const fileName = path.basename(file)
        const fileSize = fs.lstatSync(file).size

        const config = {
          uuid,
          endpoint: Endpoint.FilesystemUpload,
          method: Method.Post,
          body: {
            fileName,
            fileSize,
            command: BodyCommand.Download,
          },
        }

        const request = createValidRequest(config)
        this.#port.write(request)
      }
    })
  }

  private pureUpdateRequest({ file }: RequestConfig): Promise<Response<any>> {
    return new Promise((resolve) => {
      if (!this.#port || !this.#isPolling || !file) {
        resolve({ status: ResponseStatus.ConnectionError })
      } else {
        this.#isPolling = false
        const uuid = getNewUUID()

        const listener = async (event: any) => {
          const response = await parseData(event)

          if (response.endpoint === Endpoint.Update) {
            if (response.body.status === UpdateResponseStatus.Ok) {
              this.#eventEmitter.off(PortEventName.DataReceived, listener)
              resolve({ status: ResponseStatus.Ok })
            }
          }
        }

        this.#eventEmitter.on(PortEventName.DataReceived, listener)

        const fileName = path.basename(file)
        const config = {
          uuid,
          endpoint: Endpoint.Update,
          method: Method.Post,
          body: {
            fileName,
          },
        }

        const request = createValidRequest(config)
        this.#port.write(request)
      }
    })
  }
}

export type CreatePhonePort = (path: string) => PhonePort

export const createPhonePort: CreatePhonePort = (path: string) =>
  new PhonePort(path)

export default PhonePort
