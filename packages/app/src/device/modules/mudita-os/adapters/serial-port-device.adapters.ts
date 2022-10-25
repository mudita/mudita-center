/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import SerialPort from "serialport"
import { EventEmitter } from "events"
import PQueue from "p-queue"
import { Result, ResultObject } from "App/core/builder"
import { AppError } from "App/core/errors"
import { DeviceCommunicationEvent, ResponseStatus } from "App/device/constants"
import { DeviceError } from "App/device/modules/mudita-os/constants"
import { SerialPortParser } from "App/device/modules/mudita-os/parsers"
import {
  RequestConfig,
  Response,
  RequestPayload,
} from "App/device/types/mudita-os"
import { timeout } from "App/device/modules/mudita-os/helpers"
import { BaseAdapter } from "App/device/modules/base.adapter"

export const timeoutMs = 30000

export class SerialPortDeviceAdapter extends BaseAdapter {
  private serialPort: SerialPort
  private eventEmitter = new EventEmitter()
  private parser = new SerialPortParser()
  private requestsQueue = new PQueue({ concurrency: 1, interval: 1 })

  constructor(public path: string) {
    super(path)

    this.serialPort = new SerialPort(path, (error) => {
      if (error) {
        this.eventEmitter.emit(
          DeviceCommunicationEvent.InitializationFailed,
          Result.failed(new AppError(DeviceError.Initialization, error.message))
        )
      }

      this.eventEmitter.emit(
        DeviceCommunicationEvent.Connected,
        Result.success(true)
      )
    })

    this.serialPort.on("data", (event) => {
      try {
        const data = this.parser.parse(event)

        if (data !== undefined) {
          this.eventEmitter.emit(
            DeviceCommunicationEvent.DataReceived,
            Result.success(data)
          )
        }
      } catch (error) {
        this.eventEmitter.emit(
          DeviceCommunicationEvent.DataReceived,
          Result.failed(
            new AppError(
              DeviceError.DataReceiving,
              (error as Error).message || "Data receiving failed"
            )
          )
        )
      }
    })

    this.serialPort.on("close", (event) => {
      this.eventEmitter.emit(
        DeviceCommunicationEvent.Disconnected,
        Result.success(event)
      )
    })
  }

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

  public async request(
    config: RequestConfig
  ): // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  Promise<ResultObject<Response<any>>>
  public async request(
    config: RequestConfig
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ): Promise<ResultObject<Response<any>>> {
    if (this.serialPort === undefined) {
      return Result.failed(
        new AppError(
          DeviceError.ConnectionDoesntEstablished,
          "Serial port is undefined"
        ),
        { status: ResponseStatus.ConnectionError }
      )
    } else {
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return this.writeRequest(this.serialPort, config)
    }
  }

  public on(eventName: DeviceCommunicationEvent, listener: () => void): void {
    this.eventEmitter.on(eventName, listener)
  }

  public off(eventName: DeviceCommunicationEvent, listener: () => void): void {
    this.eventEmitter.off(eventName, listener)
  }

  private writeRequest(
    port: SerialPort,
    config: RequestConfig
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ): Promise<ResultObject<Response<any>>> {
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return new Promise<ResultObject<Response<any>>>((resolve) => {
      const uuid = this.getNewUUID()
      const payload: RequestPayload = { ...config, uuid }

      void this.requestsQueue.add(async () => {
        resolve(await this.deviceRequest(port, payload))
      })
    })
  }

  private deviceRequest(
    port: SerialPort,
    payload: RequestPayload
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ): Promise<ResultObject<Response<any>>> {
    return new Promise((resolve) => {
      const [promise, cancel] = timeout(timeoutMs)
      void promise.then(() => {
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

      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const listener = (response: ResultObject<any>) => {
        if (
          // AUTO DISABLED - fix me if you like :)
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          response.data.uuid === payload.uuid ||
          // AUTO DISABLED - fix me if you like :)
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          response.data.status === ResponseStatus.ParserError
        ) {
          this.eventEmitter.off(DeviceCommunicationEvent.DataReceived, listener)
          cancel()
          resolve(response)
        }
      }

      this.eventEmitter.on(DeviceCommunicationEvent.DataReceived, listener)

      this.portWrite(port, payload)
    })
  }

  private getNewUUID(): number {
    return Math.floor(Math.random() * 10000)
  }

  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private portWrite(port: SerialPort, payload: RequestPayload<any>): void {
    port.write(SerialPortParser.createValidRequest(payload))
  }
}
