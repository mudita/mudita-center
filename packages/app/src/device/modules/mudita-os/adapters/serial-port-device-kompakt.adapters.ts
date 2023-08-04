/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import SerialPort from "serialport"
import { log, LogConfig } from "App/core/decorators/log.decorator"
import { Result, ResultObject } from "App/core/builder"
import { AppError } from "App/core/errors"
import { CONNECTION_TIME_OUT_MS } from "App/device/constants"
import { DeviceCommunicationEvent, ResponseStatus } from "App/device/constants"
import { DeviceError } from "App/device/modules/mudita-os/constants"
import { SerialPortParserKompakt } from "App/device/modules/mudita-os/parsers"
import {
  RequestConfig,
  Response,
  RequestPayload,
} from "App/device/types/mudita-os"
import { timeout } from "App/device/modules/mudita-os/helpers"
import { BaseAdapter } from "App/device/modules/base.adapter"
import { KompaktBody } from "App/device/modules/mudita-os/parsers/serial-port-kompakt.parser"

export class SerialPortDeviceKompaktAdapter extends BaseAdapter {
  protected parser = new SerialPortParserKompakt()

  constructor(public path: string) {
    super(path)

    this.serialPort.on("data", (event) => {
      try {
        const data = this.parser.parse(event)

        console.log("SerialPortDeviceKompaktAdapter constructor data", data)

        if (data !== undefined) {
          this.emitDataReceivedEvent<KompaktBody>(data)
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
  ): Promise<ResultObject<Response<KompaktBody>>> {
    //console.log("SerialPortDeviceKompaktAdapter request")
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
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ): Promise<ResultObject<Response<KompaktBody>>> {
    //console.log("SerialPortDeviceKompaktAdapter writeRequest")
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return new Promise<ResultObject<Response<KompaktBody>>>((resolve) => {
      //console.log("SerialPortDeviceKompaktAdapter writeRequest2")
      const uuid = this.getNewUUID()
      const payload: RequestPayload = { ...config, uuid }

      void this.requestsQueue.add(async () => {
        const response = await this.deviceRequest(port, payload)
        console.log("writeRequest response", response)
        resolve(response)
      })
    })
  }

  protected deviceRequest(
    port: SerialPort,
    { options = {}, ...payload }: RequestPayload
  ): // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Promise<ResultObject<Response<KompaktBody>>> {
    //console.log("SerialPortDeviceKompaktAdapter deviceRequest port", port)
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
      // const listener = (response: any) => {
      //   console.log("deviceRequest listener response", response)
      //   if (
      //     // AUTO DISABLED - fix me if you like :)
      //     // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      //     response.uuid === payload.uuid ||
      //     // AUTO DISABLED - fix me if you like :)
      //     // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      //     response.status === ResponseStatus.ParserError
      //   ) {
      //     this.eventEmitter.off(DeviceCommunicationEvent.DataReceived, listener)
      //     cancel()
      //     resolve(Result.success(response))
      //   }
      // }

      const listener = async (response: Response<KompaktBody>) => {
        //const response = await parseData(event)
        console.log("listener response", response)

        //if (response.uuid === String(uuid)) {
        this.eventEmitter.off(DeviceCommunicationEvent.DataReceived, listener)
        resolve({
          data: response,
          error: undefined,
          ok: true,
        } as ResultObject<Response<KompaktBody>>)
        //}
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
    const temp = this.mapPayloadToRequest(payload)
    console.log("portWrite temp", temp)
    const request =
      '?000000058000000000{"endpoint":1,"method":1,"offset":0,"limit":1,"uuid":5092}' //this.mapPayloadToRequest(payload)
    console.log("portWrite request", request)
    port.write(request)
  }
}
