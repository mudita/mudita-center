/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import SerialPort, { PortInfo } from "serialport"
import { EventEmitter } from "events"
import PQueue from "p-queue"
import { log, LogConfig } from "App/core/decorators/log.decorator"
import { Result, ResultObject } from "App/core/builder"
import { AppError } from "App/core/errors"
import { CONNECTION_TIME_OUT_MS } from "App/device/constants"
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

export class SerialPortDeviceAdapter extends BaseAdapter {
  protected parser = new SerialPortParser()

  constructor(public path: string) {
    super(path)
    this.serialPort = new SerialPort(path, (error) => {
      console.log("BaseAdapter error", error)
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
      console.log("serialPort on event", event)
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
      this.emitCloseEvent(Result.success(`Device ${path} disconnected`))
    })
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
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
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

      void this.requestsQueue.add(async () => {
        const response = await this.deviceRequest(port, payload)
        if (config.endpoint === 1) {
          console.log("writeRequest response", response)
        }
        resolve(response)
      })
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

      this.portWrite(port, payload)
    })
  }

  @log("==== serial port: create valid request ====", LogConfig.Args)
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  protected mapPayloadToRequest(payload: RequestPayload<any>): string {
    return this.parser.createRequest(payload)
  }

  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  protected portWrite(port: SerialPort, payload: RequestPayload<any>): void {
    const request = this.mapPayloadToRequest(payload)
    //#000000037{"endpoint":1,"method":1,"uuid":9995}
    //?000000058000000000{"endpoint":1,"method”:1,"offset”:0,"limit":1,"uuid":5092}{}
    // if (payload.endpoint === 1) {
    //   console.log("portWrite request", request)
    // }
    port.write(request)
  }
}
