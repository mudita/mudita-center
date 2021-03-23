/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import SerialPort from "serialport"
import { EventEmitter } from "events"
import path from "path"
import * as fs from "fs"
import {
  ApiRequestPayload,
  BodyCommand,
  DeviceEventName,
  DeviceUpdateRequestPayload,
  Endpoint,
  FileResponseStatus,
  FileUploadRequestPayload,
  Method,
  PureDevice,
  RequestConfig,
  RequestPayload,
  Response,
  ResponseStatus,
  UpdateResponseStatus,
} from "./device.types"
import { createValidRequest, getNewUUID, parseData } from "../parser"
import {
  isApiRequestPayload,
  isDeviceUpdateRequestPayload,
  isFileUploadPayload,
} from "./device-helper"
import Queue from "queue-promise"
import Logger from "../logger"

class BaseDevice implements PureDevice {
  #port: SerialPort | undefined
  #eventEmitter = new EventEmitter()
  #portBlocked = true
  #requestsQueue = new Queue({ concurrent: 1, interval: 1 })

  constructor(private path: string, private logger: Logger) {}

  public connect(): Promise<Response> {
    return new Promise((resolve) => {
      this.#port = new SerialPort(this.path, (error) => {
        if (error) {
          this.logger.log("==== serial port: failure connected ====")
          resolve({ status: ResponseStatus.ConnectionError })
        } else {
          this.logger.log("==== serial port: success connected ====")
          resolve({ status: ResponseStatus.Ok })
        }
      })

      this.#port.on("data", (event) => {
        void (async () => {
          try {
            const data: unknown = await parseData(event)
            this.logger.log("==== serial port: data received ====")
            this.logger.log(JSON.stringify(data, null, 2))
            this.#eventEmitter.emit(DeviceEventName.DataReceived, data)
          } catch (error) {
            this.logger.log(
              "==== serial port error: data impossible to parse ===="
            )
            this.logger.log(JSON.stringify(error, null, 2))
            this.#eventEmitter.emit(DeviceEventName.DataReceived, {
              status: ResponseStatus.ParserError,
            })
          }
        })()
      })

      this.#port.on("close", () => {
        this.logger.log("==== serial port: close event ====")
        this.#eventEmitter.emit(DeviceEventName.Disconnected)
      })
    })
  }

  public disconnect(): Promise<Response> {
    return new Promise((resolve) => {
      if (this.#port === undefined) {
        resolve({ status: ResponseStatus.Ok })
      } else {
        this.#port.close((error) => {
          if (error) {
            this.logger.log("==== serial port: failure connected ====")
            resolve({ status: ResponseStatus.ConnectionError })
          } else {
            this.logger.log("==== serial port: success disconnect ====")
            resolve({ status: ResponseStatus.Ok })
          }
        })
      }
    })
  }

  public request(config: RequestConfig): Promise<Response<{ version: number }>>
  public request(config: RequestConfig): Promise<Response<any>>
  public async request(config: RequestConfig): Promise<Response<any>> {
    if (this.#port === undefined || !this.#portBlocked) {
      const response = { status: ResponseStatus.ConnectionError }
      this.logger.log("==== serial port: device request ====")
      this.logger.log(JSON.stringify(response, null, 2))
      return response
    } else {
      return this.writeRequest(this.#port, config)
    }
  }

  public on(eventName: DeviceEventName, listener: () => void): void {
    this.#eventEmitter.on(eventName, listener)
  }

  public off(eventName: DeviceEventName, listener: () => void): void {
    this.#eventEmitter.off(eventName, listener)
  }

  private writeRequest(
    port: SerialPort,
    config: RequestConfig
  ): Promise<Response<any>> {
    return new Promise<Response<any>>((resolve) => {
      const uuid = getNewUUID()
      const payload: RequestPayload = { ...config, uuid }

      this.#requestsQueue.add(async () => {
        if (isFileUploadPayload(payload)) {
          resolve(await this.fileUploadRequest(port, payload))
        } else if (isDeviceUpdateRequestPayload(payload)) {
          resolve(await this.deviceUpdateRequest(port, payload))
        } else if (isApiRequestPayload(payload)) {
          resolve(await this.apiRequest(payload))
        } else {
          resolve(await this.deviceRequest(port, payload))
        }
      })
    })
  }

  private fileUploadRequest(
    port: SerialPort,
    { filePath, uuid }: FileUploadRequestPayload
  ): Promise<Response<any>> {
    return new Promise((resolve) => {
      this.#portBlocked = false

      const listener = (response: any) => {
        if (response.status === ResponseStatus.ParserError) {
          this.#eventEmitter.off(DeviceEventName.DataReceived, listener)
          resolve(response)
        }

        if (response.uuid === uuid) {
          if (response.body.status === FileResponseStatus.Ok) {
            const readStream = fs.createReadStream(filePath, {
              highWaterMark: 16384,
            })

            readStream.on("data", (data) => {
              port.write(data)
              port.drain()

              // This is a hack for Windows. Writing and draining was too frequent
              // so the serialport couldn't handle that.
              readStream.pause()
              setTimeout(() => {
                readStream.resume()
              }, 10)
            })

            readStream.on("end", () => {
              this.#portBlocked = true
            })
          } else {
            this.#eventEmitter.off(DeviceEventName.DataReceived, listener)
            this.#portBlocked = true
            resolve(response)
          }
        } else if (
          response.endpoint === Endpoint.FileSystemUpload &&
          response.status === ResponseStatus.Accepted
        ) {
          this.#eventEmitter.off(DeviceEventName.DataReceived, listener)
          resolve(response)
        }
      }

      this.#eventEmitter.on(DeviceEventName.DataReceived, listener)

      const fileName = path.basename(filePath)
      const fileSize = fs.lstatSync(filePath).size

      const payload = {
        uuid,
        endpoint: Endpoint.FileSystemUpload,
        method: Method.Post,
        body: {
          fileName,
          fileSize,
          command: BodyCommand.Download,
        },
      }

      this.portWrite(port, payload)
    })
  }

  private deviceUpdateRequest(
    port: SerialPort,
    { filePath, uuid }: DeviceUpdateRequestPayload
  ): Promise<Response<any>> {
    return new Promise((resolve) => {
      this.#portBlocked = false

      const listener = (response: any) => {
        if (response.status === ResponseStatus.ParserError) {
          this.#eventEmitter.off(DeviceEventName.DataReceived, listener)
          resolve(response)
        }

        if (response.endpoint === Endpoint.Update) {
          if (response.status === ResponseStatus.InternalServerError) {
            resolve({
              status: ResponseStatus.Ok,
              error: {
                code: response.body.errorCode,
                message: response.body.status,
              },
            })
          }

          if (response.body.status === UpdateResponseStatus.Ok) {
            this.#eventEmitter.off(DeviceEventName.DataReceived, listener)
            resolve({ status: ResponseStatus.Ok })
          }
        }
      }

      this.#eventEmitter.on(DeviceEventName.DataReceived, listener)

      const fileName = path.basename(filePath)
      const payload = {
        uuid,
        endpoint: Endpoint.Update,
        method: Method.Post,
        body: {
          fileName,
        },
      }

      this.portWrite(port, payload)
    })
  }

  private async apiRequest(
    config: ApiRequestPayload
  ): Promise<Response<{ version: number }>> {
    // mocked response until the backend implements versioning API
    return {
      status: ResponseStatus.Ok,
      body: {
        version: 1,
      },
    }
  }

  private deviceRequest(
    port: SerialPort,
    payload: RequestPayload
  ): Promise<Response<{ version: number }>> {
    return new Promise((resolve) => {
      const listener = (response: any) => {
        if (
          response.uuid === payload.uuid ||
          response.status === ResponseStatus.ParserError
        ) {
          this.#eventEmitter.off(DeviceEventName.DataReceived, listener)
          resolve(response)
        }
      }

      this.#eventEmitter.on(DeviceEventName.DataReceived, listener)

      this.portWrite(port, payload)
    })
  }

  private portWrite(port: SerialPort, payload: RequestPayload): void {
    this.logger.log("==== serial port: device request ====")
    this.logger.log(JSON.stringify(payload, null, 2))
    port.write(createValidRequest(payload))
  }
}

export default BaseDevice
