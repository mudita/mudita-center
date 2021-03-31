/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import SerialPort from "serialport"
import { EventEmitter } from "events"
import path from "path"
import * as fs from "fs"
import {
  ApiRequestConfig,
  BodyCommand,
  DeviceEventName,
  Endpoint,
  FileResponseStatus,
  Method,
  PureDevice,
  RequestConfig,
  Response,
  ResponseStatus,
  UpdateResponseStatus,
} from "./device.types"
import { createValidRequest, getNewUUID, parseData } from "../parser"
import { isApiRequestConfig } from "./device-helper"
import PQueue from "p-queue"

class BaseDevice implements PureDevice {
  #port: SerialPort | undefined
  #eventEmitter = new EventEmitter()
  #portBlocked = true
  #requestsQueue = new PQueue({ concurrency: 1, interval: 1 })

  constructor(private path: string) {}

  public connect(): Promise<Response> {
    return new Promise((resolve) => {
      this.#port = new SerialPort(this.path, (error) => {
        if (error) {
          resolve({ status: ResponseStatus.ConnectionError })
        } else {
          resolve({ status: ResponseStatus.Ok })
        }
      })

      this.#port.on("data", (event) => {
        this.#eventEmitter.emit(DeviceEventName.DataReceived, event)
      })

      this.#port.on("close", () => {
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
            resolve({ status: ResponseStatus.ConnectionError })
          } else {
            resolve({ status: ResponseStatus.Ok })
          }
        })
      }
    })
  }

  public request(
    config: ApiRequestConfig
  ): Promise<Response<{ version: number }>>
  public request(config: RequestConfig): Promise<Response<any>>
  public async request(config: RequestConfig): Promise<Response<any>> {
    const handleRequest = () => {
      if (config.endpoint === Endpoint.FileUpload) {
        return this.fileUploadRequest(config)
      } else if (config.endpoint === Endpoint.DeviceUpdate) {
        return this.deviceUpdateRequest(config)
      } else if (isApiRequestConfig(config)) {
        return this.apiRequest(config)
      } else {
        return this.deviceRequest(config)
      }
    }

    return new Promise<Response>((resolve, reject) => {
      this.#requestsQueue.add(async () => {
        try {
          const { status, ...rest } = await handleRequest()
          if (status >= 300) {
            reject({
              status,
              ...rest,
            } as Response)
          } else {
            resolve({
              status,
              ...rest,
            })
          }
        } catch (error) {
          reject({
            status: ResponseStatus.InternalServerError,
            error: error?.message || "Unknown error",
          } as Response)
        }
      })
    })
  }

  public on(eventName: DeviceEventName, listener: () => void): void {
    this.#eventEmitter.on(eventName, listener)
  }

  public off(eventName: DeviceEventName, listener: () => void): void {
    this.#eventEmitter.off(eventName, listener)
  }

  private fileUploadRequest({
    filePath,
  }: RequestConfig): Promise<Response<any>> {
    return new Promise((resolve) => {
      if (!this.#port || !this.#portBlocked || !filePath) {
        resolve({ status: ResponseStatus.ConnectionError })
      } else {
        this.#portBlocked = false
        const uuid = getNewUUID()

        const listener = async (event: any) => {
          const response = await parseData(event)

          if (response.uuid === uuid) {
            if (response.body.status === FileResponseStatus.Ok) {
              const readStream = fs.createReadStream(filePath, {
                highWaterMark: 16384,
              })

              readStream.on("data", (data) => {
                if (this.#port) {
                  this.#port.write(data)
                  this.#port.drain()

                  // This is a hack for Windows. Writing and draining was too frequent
                  // so the serialport couldn't handle that.
                  readStream.pause()
                  setTimeout(() => {
                    readStream.resume()
                  }, 10)
                }
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

        const config = {
          uuid,
          endpoint: Endpoint.FileSystemUpload,
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

  private deviceUpdateRequest({
    filePath,
  }: RequestConfig): Promise<Response<any>> {
    return new Promise((resolve) => {
      if (!this.#port || !this.#portBlocked || !filePath) {
        resolve({ status: ResponseStatus.ConnectionError })
      } else {
        this.#portBlocked = false
        const uuid = getNewUUID()

        const listener = async (event: any) => {
          const response = await parseData(event)

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

  private async apiRequest(
    config: ApiRequestConfig
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
    config: RequestConfig
  ): Promise<Response<{ version: number }>> {
    return new Promise((resolve) => {
      if (!this.#port || !this.#portBlocked) {
        resolve({ status: ResponseStatus.ConnectionError })
      } else {
        const uuid = getNewUUID()

        const listener = async (event: any) => {
          const response = await parseData(event)

          if (response.uuid === uuid) {
            this.#eventEmitter.off(DeviceEventName.DataReceived, listener)
            resolve(response)
          }
        }

        this.#eventEmitter.on(DeviceEventName.DataReceived, listener)

        const request = createValidRequest({ ...config, uuid })
        this.#port.write(request)
      }
    })
  }
}

export default BaseDevice
