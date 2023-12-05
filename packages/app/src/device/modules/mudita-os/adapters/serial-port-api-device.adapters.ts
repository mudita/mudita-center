/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import SerialPort from "serialport"
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

export class SerialPortDeviceAPIAdapter extends BaseAdapter<ApiResponse<any>> {
  protected parser = new SerialPortParser()

  constructor(public path: string) {
    super(path)

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

  protected writeRequest(
    port: SerialPort,
    config: APIRequestData
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ) {
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return new Promise<ResultObject<ApiResponse<any>>>((resolve) => {
      const rid = this.getNewUUID()
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

  protected writeRequestUntyped(
    port: SerialPort,
    config: any
  ): Promise<unknown> {
    return new Promise<unknown>((resolve) => {
      const rid = this.getNewUUID()
      const payload: APIRequestData = { ...config, rid }

      void this.requestsQueue.add(async () => {
        const response = await this.deviceRequest(port, payload)
        resolve(response)
      })
    })
  }

  protected deviceRequest(
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
  protected mapPayloadToRequest(payload: APIRequestData): string {
    return this.parser.createRequest(payload)
  }

  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  protected portWrite(port: SerialPort, payload: APIRequestData): void {
    const request = this.mapPayloadToRequest(payload)
    port.write(request)
  }
}
