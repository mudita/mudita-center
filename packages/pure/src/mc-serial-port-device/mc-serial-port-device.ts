/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import SerialPort from "serialport"
import { EventEmitter } from "events"
import PQueue from "p-queue"
import { DeviceEventName } from "../device/mudita-device"
import { DeviceType } from "../device/constants"
import { createValidRequest, getNewUUID, parseData } from "../parser"
import log, { LogConfig } from "../logger/log-decorator"
import { timeout } from "../timeout"
import { McSerialPortDeviceClass } from "./mc-serial-port-device.class"
import {
  ApiRequestPayload,
  RequestConfig,
  RequestPayload,
  Response,
  ResponseStatus,
} from "./types"
import { isApiRequestPayload } from "./helpers"

export const timeoutMs = 30000

class McSerialPortDevice implements McSerialPortDeviceClass {
  #port: SerialPort | undefined
  #eventEmitter = new EventEmitter()
  #requestsQueue = new PQueue({ concurrency: 1, interval: 1 })

  constructor(public path: string, public deviceType: DeviceType) {}

  @log("==== serial port: connect ====")
  public connect(): Promise<Response> {
    return new Promise((resolve) => {
      this.#port = new SerialPort(this.path, (error) => {
        if (error) {
          resolve({
            status: ResponseStatus.ConnectionError,
            error: { message: error.message },
          })
        } else {
          resolve({ status: ResponseStatus.Ok })
        }
      })

      this.#port.on("data", (event) => {
        void (async () => {
          try {
            const data = await parseData(event)
            this.emitDataReceivedEvent(data)
          } catch (error) {
            this.emitDataReceivedEvent({
              status: ResponseStatus.ParserError,
            })
          }
        })()
      })

      this.#port.on("close", (event) => {
        this.emitCloseEvent(event)
      })
    })
  }

  @log("==== serial port: disconnect ====")
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

  public request(config: RequestConfig): Promise<Response<{ version: number }>>
  public request(config: RequestConfig): Promise<Response<any>>
  public async request(config: RequestConfig): Promise<Response<any>> {
    if (this.#port === undefined) {
      return { status: ResponseStatus.ConnectionError }
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
        if (isApiRequestPayload(payload)) {
          resolve(await this.apiRequest(payload))
        } else {
          resolve(await this.deviceRequest(port, payload))
        }
      })
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
  ): Promise<Response<any>> {
    return new Promise((resolve) => {
      const [promise, cancel] = timeout(timeoutMs)
      promise.then(() => {
        resolve(this.returnTimeoutResponse(payload))
      })

      const listener = (response: any) => {
        if (
          response.uuid === payload.uuid ||
          response.status === ResponseStatus.ParserError
        ) {
          this.#eventEmitter.off(DeviceEventName.DataReceived, listener)
          cancel()
          resolve(response)
        }
      }

      this.#eventEmitter.on(DeviceEventName.DataReceived, listener)

      this.portWrite(port, payload)
    })
  }

  private portWrite(port: SerialPort, payload: RequestPayload<any>): void {
    port.write(this.mapPayloadToRequest(payload))
  }

  @log("==== serial port: create valid request ====", LogConfig.Args)
  private mapPayloadToRequest(payload: RequestPayload<any>): string {
    return createValidRequest(payload)
  }

  @log("==== serial port: close event ====", LogConfig.Args)
  private emitCloseEvent(event: unknown): void {
    this.#eventEmitter.emit(DeviceEventName.Disconnected, event)
  }

  @log("==== serial port: data received ====", LogConfig.Args)
  private emitDataReceivedEvent(event: unknown): void {
    this.#eventEmitter.emit(DeviceEventName.DataReceived, event)
  }

  @log("==== serial port: request timeout ====")
  private returnTimeoutResponse(payload: RequestPayload): Response<unknown> {
    return {
      status: ResponseStatus.Timeout,
      ...payload,
    }
  }
}

export default McSerialPortDevice
