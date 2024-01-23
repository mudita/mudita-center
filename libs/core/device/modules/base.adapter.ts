/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import SerialPort, { PortInfo } from "serialport"
import { EventEmitter } from "events"
import PQueue from "p-queue"
import { log, LogConfig } from "Core/core/decorators/log.decorator"
import { Result, ResultObject } from "Core/core/builder"
import { AppError } from "Core/core/errors"
import { DeviceCommunicationEvent } from "Core/device/constants"
import { DeviceError } from "Core/device/modules/mudita-os/constants"
import {
  RequestConfig,
  Response,
  RequestPayload,
} from "Core/device/types/mudita-os"
import { APIRequestData } from "Libs/device/models/src"
import { ApiResponse } from "Core/device/types/mudita-os"

export abstract class BaseAdapter<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  RequestResponse extends Response<any> | ApiResponse<any> = Response<any>
> {
  protected serialPort: SerialPort | undefined
  protected eventEmitter = new EventEmitter()

  protected requestsQueue = new PQueue({ concurrency: 1, interval: 1 })

  protected constructor(public path: string) {}

  public connect(): Promise<ResultObject<undefined>> {
    return new Promise((resolve) => {
      this.serialPort = new SerialPort(this.path, (error) => {
        if (error) {
          resolve(
            Result.failed(
              new AppError(DeviceError.Initialization, error.message)
            )
          )
        } else {
          resolve(Result.success(undefined))
        }
      })
    })
  }

  @log("==== serial port: disconnect ====")
  public disconnect(): Promise<ResultObject<boolean>> {
    return new Promise((resolve) => {
      if (this.serialPort === undefined) {
        resolve(Result.success(true))
      } else {
        this.serialPort.close((error) => {
          if (error) {
            resolve(
              Result.failed(
                new AppError(DeviceError.Disconnection, error.message)
              )
            )
          } else {
            resolve(Result.success(true))
          }
        })
      }
    })
  }

  public abstract request(
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    config: RequestConfig<any> | APIRequestData
  ): // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Promise<ResultObject<RequestResponse>>

  @log("==== serial port: data received ====", LogConfig.Args)
  protected emitDataReceivedEvent<ResponseType = unknown>(
    data: Response<ResponseType> | AppError
  ): void {
    this.eventEmitter.emit(DeviceCommunicationEvent.DataReceived, data)
  }

  @log("==== serial port: list ====")
  protected getSerialPortList(): Promise<PortInfo[]> {
    return SerialPort.list()
  }

  public on(eventName: DeviceCommunicationEvent, listener: () => void): void {
    this.eventEmitter.on(eventName, listener)
  }

  public off(eventName: DeviceCommunicationEvent, listener: () => void): void {
    this.eventEmitter.off(eventName, listener)
  }

  protected abstract writeRequest(
    port: SerialPort,
    config: RequestConfig | APIRequestData
  ): // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Promise<ResultObject<RequestResponse>>

  protected abstract deviceRequest(
    port: SerialPort,
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line
    { options, ...payload }: RequestPayload | APIRequestData
  ): // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Promise<ResultObject<RequestResponse>>

  protected getNewUUID(): number {
    return Math.floor(Math.random() * 10000)
  }

  protected abstract mapPayloadToRequest(payload: unknown): string

  protected abstract portWrite(
    port: SerialPort,
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    payload: RequestPayload<any> | APIRequestData
  ): void
}
