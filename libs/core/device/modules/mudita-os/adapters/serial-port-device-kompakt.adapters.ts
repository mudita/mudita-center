/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import SerialPort from "serialport"
import { log, LogConfig } from "Core/core/decorators/log.decorator"
import { Result, ResultObject } from "Core/core/builder"
import { AppError } from "Core/core/errors"
import { CONNECTION_TIME_OUT_MS } from "Core/device/constants"
import { DeviceCommunicationEvent, ResponseStatus } from "Core/device/constants"
import { DeviceError } from "Core/device/modules/mudita-os/constants"
import { SerialPortParserKompakt } from "Core/device/modules/mudita-os/parsers"
import {
  RequestConfig,
  Response,
  RequestPayload,
} from "Core/device/types/mudita-os"
import { timeout } from "Core/device/modules/mudita-os/helpers"
import { BaseAdapter } from "Core/device/modules/base.adapter"
import { BodyKompakt } from "Core/device/types/kompakt/body-kompakt.type"

export class SerialPortDeviceKompaktAdapter extends BaseAdapter {
  protected parser = new SerialPortParserKompakt()

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
  ): Promise<ResultObject<Response<BodyKompakt>>> {
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
      const result = this.writeRequest(this.serialPort, config)
      return result
    }
  }

  protected writeRequest(
    port: SerialPort,
    config: RequestConfig
  ): Promise<ResultObject<Response<BodyKompakt>>> {
    return new Promise<ResultObject<Response<BodyKompakt>>>((resolve) => {
      const uuid = this.getNewUUID()
      const payload: RequestPayload = { ...config, uuid }

      void this.requestsQueue.add(async () => {
        const response = await this.deviceRequest(port, payload)
        resolve(response)
      })
    })
  }

  protected deviceRequest(
    port: SerialPort,
    { options = {}, ...payload }: RequestPayload
  ): Promise<ResultObject<Response<BodyKompakt>>> {
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

      const listener = (response: Response<BodyKompakt>) => {
        if (response.uuid === payload.uuid) {
          this.eventEmitter.off(DeviceCommunicationEvent.DataReceived, listener)
          cancel()
          const result = response.error
            ? Result.failed(
                new AppError(DeviceError.RequestFailed, response.error.message)
              )
            : Result.success(response)
          resolve(result)
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
    port.write(request)
  }

  private mountListeners() {
    if (this.serialPort === undefined) {
      return
    }

    this.serialPort.on("data", (buffer: Buffer) => {
      try {
        const data = this.parser.parse(buffer)

        if (data !== undefined) {
          this.emitDataReceivedEvent<BodyKompakt>(data)
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
  }
}