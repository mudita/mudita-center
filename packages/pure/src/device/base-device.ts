/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import SerialPort from "serialport"
import { EventEmitter } from "events"
import {
  ApiRequestPayload,
  DeviceEventName,
  MuditaDevice,
  RequestConfig,
  RequestPayload,
  Response,
  ResponseStatus,
} from "./device.types.js"
import { DeviceType } from "./constants/index.js"
import { SerialPortParser } from "./serial-port-parser/serial-port-parser.js"
import { isApiRequestPayload } from "./device-helper.js"
// NOTE: this fixes missing "main": "dist/index.js" in p-queue/package.json
// import { PQueue } from "../../node_modules/p-queue/dist/index.js"
// Why does ts-jest/jest not now about "exports"?
// This also introduces SyntaxError: Cannot use import statement outside a module
// even though p-queue/package.json has "type": "module", and I added
// "transformIgnorePatterns": [ "node_modules/(?!p-queue)" ], to jest.config.json
import PQueue from "p-queue"
import log, { LogConfig } from "../logger/log-decorator.js"
import { timeout } from "../timeout.js"
export const timeoutMs = 30000

class BaseDevice implements MuditaDevice {
  #port: SerialPort | undefined
  #eventEmitter = new EventEmitter()
  #requestsQueue = new PQueue({ concurrency: 1, interval: 1 })

  constructor(
    public path: string,
    public deviceType: DeviceType,
    private parser: SerialPortParser
  ) {}

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
        try {
          const data = this.parser.parseData(event)
          if (data !== undefined) {
            this.emitDataReceivedEvent(data)
          }
        } catch (error) {
          this.emitDataReceivedEvent({
            status: ResponseStatus.ParserError,
          })
        }
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
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public request(config: RequestConfig): Promise<Response<any>>
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public async request(config: RequestConfig): Promise<Response<any>> {
    if (this.#port === undefined) {
      return { status: ResponseStatus.ConnectionError }
    } else {
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
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
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ): Promise<Response<any>> {
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return new Promise<Response<any>>((resolve) => {
      const uuid = SerialPortParser.getNewUUID()
      const payload: RequestPayload = { ...config, uuid }

      void this.#requestsQueue.add(async () => {
        if (isApiRequestPayload(payload)) {
          resolve(await this.apiRequest(payload))
        } else {
          resolve(await this.deviceRequest(port, payload))
        }
      })
    })
  }

  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/require-await
  private async apiRequest(
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ): Promise<Response<any>> {
    return new Promise((resolve) => {
      const [promise, cancel] = timeout(timeoutMs)
      void promise.then(() => {
        resolve(this.returnTimeoutResponse(payload))
      })

      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const listener = (response: any) => {
        if (
          // AUTO DISABLED - fix me if you like :)
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          response.uuid === payload.uuid ||
          // AUTO DISABLED - fix me if you like :)
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
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

  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private portWrite(port: SerialPort, payload: RequestPayload<any>): void {
    port.write(this.mapPayloadToRequest(payload))
  }

  @log("==== serial port: create valid request ====", LogConfig.Args)
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private mapPayloadToRequest(payload: RequestPayload<any>): string {
    return SerialPortParser.createValidRequest(payload)
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

export default BaseDevice
