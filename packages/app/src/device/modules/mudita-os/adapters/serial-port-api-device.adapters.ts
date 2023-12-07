/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { log, LogConfig } from "App/core/decorators/log.decorator"
import { Result, ResultObject } from "App/core/builder"
import { AppError } from "App/core/errors"
import { CONNECTION_TIME_OUT_MS, Endpoint } from "App/device/constants"
import { DeviceCommunicationEvent, ResponseStatus } from "App/device/constants"
import { DeviceError } from "App/device/modules/mudita-os/constants"
import { SerialPortParser } from "App/device/modules/mudita-os/parsers"
import {
  RequestConfig,
  Response,
  RequestPayload,
  ApiResponse,
} from "App/device/types/mudita-os"
import { timeout } from "App/device/modules/mudita-os/helpers"
import { BaseAdapter } from "App/device/modules/base.adapter"
import { APIRequestData } from "App/api-main/api-request.model"
import SerialPort, { PortInfo } from "serialport"
import { EventEmitter } from "events"
import PQueue from "p-queue"
import { SerialPortParserBase } from "../parsers/serial-port-base.parser"

// extends BaseAdapter<ApiResponse<any>>

const generateRequestID = () => {
  return Math.floor(Math.random() * 10000)
}

export class SerialPortDeviceAPIAdapter {
  private serialPort: SerialPort
  private eventEmitter = new EventEmitter()

  private requestsQueue = new PQueue({ concurrency: 1, interval: 1 })

  private parser: SerialPortParserBase = new SerialPortParser()

  constructor(public path: string) {
    this.serialPort = new SerialPort(path, (error) => {
      if (error) {
        const appError = new AppError(DeviceError.Initialization, error.message)
        this.emitInitializationFailedEvent(Result.failed(appError))

        // workaround to trigger a device (USB) restart side effect after an initialization error
        void this.getSerialPortList()
      } else {
        this.emitConnectionEvent(Result.success(`Device ${path} connected`))
      }
    })

    this.serialPort.on("data", (event) => {
      try {
        console.log(event)
        const data = this.parser.parse(event)
        console.log(data)
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
      this.emitCloseEvent(Result.success(`Device ${path} disconnected`))
    })
  }

  @log("==== serial port: connect event ====", LogConfig.Args)
  private emitConnectionEvent(data: ResultObject<string>): void {
    this.eventEmitter.emit(DeviceCommunicationEvent.Connected, data)
  }

  @log("==== serial port: connection failed event ====", LogConfig.Args)
  private emitInitializationFailedEvent(data: ResultObject<AppError>): void {
    this.eventEmitter.emit(DeviceCommunicationEvent.InitializationFailed, data)
  }

  @log("==== serial port: data received ====", LogConfig.Args)
  private emitDataReceivedEvent<ResponseType = unknown>(
    data: Response<ResponseType> | AppError
  ): void {
    this.eventEmitter.emit(DeviceCommunicationEvent.DataReceived, data)
  }

  @log("==== serial port: connection closed ====", LogConfig.Args)
  private emitCloseEvent(data: ResultObject<string>): void {
    this.eventEmitter.emit(DeviceCommunicationEvent.Disconnected, data)
  }

  @log("==== serial port: list ====")
  private getSerialPortList(): Promise<PortInfo[]> {
    return SerialPort.list()
  }

  public async request(
    config: APIRequestData
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ) {
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
  public async requestUntyped(
    config: any
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ): Promise<unknown> {
    if (this.serialPort === undefined) {
      return Result.failed(
        new AppError(
          DeviceError.ConnectionDoesntEstablished,
          "Serial port is undefined"
        ),
        { status: ResponseStatus.ConnectionError }
      )
    } else {
      return this.writeRequestUntyped(this.serialPort, config)
    }
  }

  private writeRequest(
    port: SerialPort,
    config: APIRequestData
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ) {
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return new Promise<ResultObject<ApiResponse<any>>>((resolve) => {
      const rid = generateRequestID()
      const payload: APIRequestData = { ...config, rid }

      void this.requestsQueue.add(
        async () => {
          const response = await this.deviceRequest(port, payload)
          resolve(response)
        },
        {
          // priority: payload.endpoint === Endpoint.Security ? 1 : 0,
          priority: 0,
        }
      )
    })
  }

  private writeRequestUntyped(port: SerialPort, config: any): Promise<unknown> {
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
  Promise<ResultObject<ApiResponse<any>>> {
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
          console.log(response)
          this.eventEmitter.off(DeviceCommunicationEvent.DataReceived, listener)
          cancel()
          resolve(Result.success(response))
        }
      }

      this.eventEmitter.on(DeviceCommunicationEvent.DataReceived, listener)
      void promise.then(() => {
        this.eventEmitter.off(DeviceCommunicationEvent.DataReceived, listener)
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

  @log("==== serial port: create valid request ====", LogConfig.Args)
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
}
