/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { log, LogConfig } from "Core/core/decorators/log.decorator"
import { Result, ResultObject } from "Core/core/builder"
import { AppError } from "Core/core/errors"
import { CONNECTION_TIME_OUT_MS, ResponseStatus } from "Core/device/constants"
import { DeviceError } from "Core/device/modules/mudita-os/constants"
import { ApiResponse, Response } from "Core/device/types/mudita-os"
import { timeout } from "Core/device/modules/mudita-os/helpers"
import SerialPort from "serialport"
import { EventEmitter } from "events"
import PQueue from "p-queue"
import { SerialPortParserBase } from "Core/device/modules/mudita-os/parsers/serial-port-base.parser"
import {
  APIMethodsType,
  APIRequestData,
  ApiSerialPortEvents,
} from "device/models"
import { callRenderer } from "./call-renderer.helper"

const generateRequestID = () => {
  return Math.floor(Math.random() * 10000)
}

const getRequestPriority = (method: APIMethodsType) => {
  return 0
}

export class SerialPortDeviceAPIAdapter {
  private serialPort: SerialPort
  private eventEmitter = new EventEmitter()

  private requestsQueue = new PQueue({ concurrency: 1, interval: 1 })

  constructor(public path: string, private parser: SerialPortParserBase) {
    this.serialPort = new SerialPort(path, (error) => {
      if (error) {
        const appError = new AppError(DeviceError.Initialization, error.message)
        callRenderer(
          "api-serial-port-connection-failed",
          Result.failed(appError)
        )
      }

      callRenderer(
        "api-serial-port-connected",
        Result.success(`Device ${path} connected`)
      )
    })

    this.serialPort.on("data", (event) => {
      try {
        const data = this.parser.parse(event)
        if (data !== undefined) {
          this.emitDataReceivedEvent(data)
        }
      } catch (error) {
        this.emitDataReceivedEvent(
          new AppError(
            DeviceError.DataReceiving,
            (error as Error).message || "Data receiving failed"
          )
        )
      }
    })

    this.serialPort.on("close", () => {
      callRenderer(
        "api-serial-port-closed",
        Result.success(`Device ${path} disconnected`)
      )
    })
  }

  public async request(config: APIRequestData) {
    if (this.serialPort === undefined) {
      return Result.failed(
        new AppError(
          DeviceError.ConnectionDoesntEstablished,
          "Serial port is undefined"
        ),
        { status: ResponseStatus.ConnectionError }
      )
    } else {
      return this.writeRequest(this.serialPort, config)
    }
  }

  // to remove
  public async requestUntyped(config: unknown): Promise<unknown> {
    if (this.serialPort === undefined) {
      return Result.failed(
        new AppError(
          DeviceError.ConnectionDoesntEstablished,
          "Serial port is undefined"
        ),
        { status: ResponseStatus.ConnectionError }
      )
    } else {
      // @ts-ignore
      return this.writeRequestUntyped(this.serialPort, config)
    }
  }

  private writeRequest(port: SerialPort, config: APIRequestData) {
    return new Promise<ResultObject<ApiResponse<unknown>>>((resolve) => {
      const rid = generateRequestID()
      const payload: APIRequestData = { ...config, rid }

      void this.requestsQueue.add(
        async () => {
          const response = await this.deviceRequest(port, payload)
          resolve(response)
        },
        {
          priority: getRequestPriority(config.method),
        }
      )
    })
  }

  private writeRequestUntyped(
    port: SerialPort,
    config: APIRequestData
  ): Promise<unknown> {
    return new Promise<unknown>((resolve) => {
      const rid = generateRequestID()
      const payload: APIRequestData = { ...config, rid }

      void this.requestsQueue.add(async () => {
        const response = await this.deviceRequest(port, payload)
        resolve(response)
      })
    })
  }

  private deviceRequest(
    port: SerialPort,
    { options = {}, ...payload }: APIRequestData
  ): // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Promise<ResultObject<ApiResponse<unknown>>> {
    const connectionTimeOut =
      options?.connectionTimeOut ?? CONNECTION_TIME_OUT_MS
    return new Promise((resolve) => {
      const [promise, cancel] = timeout(connectionTimeOut)

      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const listener = (response: any) => {
        if (
          // AUTO DISABLED - fix me if you like :)
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          response.rid === payload.rid ||
          // AUTO DISABLED - fix me if you like :)
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          response.status === ResponseStatus.ParserError
        ) {
          this.eventEmitter.off(ApiSerialPortEvents.DataReceived, listener)
          cancel()
          resolve(Result.success(response))
        }
      }

      this.eventEmitter.on(ApiSerialPortEvents.DataReceived, listener)
      void promise.then(() => {
        this.eventEmitter.off(ApiSerialPortEvents.DataReceived, listener)
        resolve(
          Result.failed(
            new AppError(
              DeviceError.TimeOut,
              `Cannot receive response from ${this.path}`
            ),
            {
              status: ResponseStatus.Timeout,
              ...payload,
            }
          )
        )
      })

      this.portWrite(port, payload)
    })
  }

  @log(
    "==== serial port - api device: create valid request ====",
    LogConfig.Args
  )
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private mapPayloadToRequest(payload: APIRequestData): string {
    return this.parser.createRequest(payload)
  }

  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private portWrite(port: SerialPort, payload: APIRequestData): void {
    const request = this.mapPayloadToRequest(payload)
    port.write(request)
  }

  @log("==== serial port - api device: data received ====", LogConfig.Args)
  private emitDataReceivedEvent<ResponseType = unknown>(
    data: Response<ResponseType> | AppError
  ): void {
    this.eventEmitter.emit(ApiSerialPortEvents.DataReceived, data)
  }
}