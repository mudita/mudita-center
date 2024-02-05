/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import SerialPort from "serialport"
import { ipcMain } from "electron-better-ipc"
import { log, LogConfig } from "Core/core/decorators/log.decorator"
import { Result, ResultObject } from "Core/core/builder"
import { AppError } from "Core/core/errors"
import { CONNECTION_TIME_OUT_MS, Endpoint } from "Core/device/constants"
import { DeviceCommunicationEvent, ResponseStatus } from "Core/device/constants"
import { DeviceError } from "Core/device/modules/mudita-os/constants"
import { SerialPortParser } from "Core/device/modules/mudita-os/parsers"
import {
  RequestConfig,
  Response,
  RequestPayload,
} from "Core/device/types/mudita-os"
import { timeout } from "Core/device/modules/mudita-os/helpers"
import { BaseAdapter } from "Core/device/modules/base.adapter"

export enum SerialPortDeviceAdapterEvent {
  Closed = "serial-port-closed",
}

export class SerialPortDeviceAdapter extends BaseAdapter {
  protected parser = new SerialPortParser()

  constructor(public path: string) {
    super(path)
  }

  public async connect(): Promise<ResultObject<undefined>> {
    const result = await super.connect()
    if (result.ok) {
      this.mountListeners()
    }
    return result
  }

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
      return this.writeRequest(this.serialPort, config)
    }
  }

  protected writeRequest(
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

      void this.requestsQueue.add(
        async () => {
          const response = await this.deviceRequest(port, payload)
          resolve(response)
        },
        {
          priority: payload.endpoint === Endpoint.Security ? 1 : 0,
        }
      )
    })
  }

  protected deviceRequest(
    port: SerialPort,
    { options = {}, ...payload }: RequestPayload
  ): // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Promise<ResultObject<Response<any>>> {
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
          response.uuid === payload.uuid ||
          // AUTO DISABLED - fix me if you like :)
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          response.status === ResponseStatus.ParserError
        ) {
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

  //@log("==== serial port: create valid request ====", LogConfig.Args)
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  protected mapPayloadToRequest(payload: RequestPayload<any>): string {
    return this.parser.createRequest(payload)
  }

  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  protected portWrite(port: SerialPort, payload: RequestPayload<any>): void {
    const request = this.mapPayloadToRequest(payload)
    port.write(request)
  }

  private mountListeners() {
    if (this.serialPort === undefined) {
      return
    }

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
      ipcMain.emit(SerialPortDeviceAdapterEvent.Closed, this.path)
    })
  }
}
