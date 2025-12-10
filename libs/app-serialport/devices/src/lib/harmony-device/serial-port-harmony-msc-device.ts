/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import path from "path"
import { app } from "electron"
import { SerialPortDeviceType } from "app-serialport/models"
import { styleText } from "util"
import {
  HarmonyMscEndpointNamed,
  HarmonyMscErrorType,
  HarmonyMscMethodNamed,
  HarmonyMscRequest,
} from "devices/harmony-msc/models"
import {
  MSC_HARMONY_SCOPE,
  MSC_HARMONY_SCOPE_CATALOG_DIR,
} from "app-utils/models"
import { SerialPortDeviceOptions } from "../serial-port-device"
import { SerialPortDeviceMock } from "../serial-port-device-mock"
import DeviceFlashFactory from "./device-flash/device-flash.factory"

const getDeviceName = () => {
  return process.platform === "win32" ? "MUDITA HARMONY MSC" : "HARMONY"
}

export class SerialPortHarmonyMscDevice extends SerialPortDeviceMock {
  static readonly matchingVendorIds = ["3310"]
  static readonly matchingProductIds = ["0103"]
  static readonly deviceType = SerialPortDeviceType.HarmonyMsc
  private deviceFlash = DeviceFlashFactory.createDeviceFlashService()
  private mscHarmonyAbsoluteDir = path.join(
    app.getPath(MSC_HARMONY_SCOPE),
    MSC_HARMONY_SCOPE_CATALOG_DIR
  )

  constructor({ baudRate = 9600, ...options }: SerialPortDeviceOptions) {
    super({ baudRate, ...options })
  }

  write(data: HarmonyMscRequest & { id: number }): boolean {
    if (process.env.SERIALPORT_LOGS_ENABLED === "1") {
      console.log(
        styleText(["bold", "bgCyan"], "SerialPort write"),
        styleText(["bgCyan"], this.path),
        styleText(["cyan"], `${JSON.stringify(data)}`)
      )
    }
    if (
      data.endpoint === HarmonyMscEndpointNamed.Flash &&
      data.method === HarmonyMscMethodNamed.Post
    ) {
      void this.flashHarmony(
        data as unknown as HarmonyMscRequest<
          HarmonyMscEndpointNamed.Flash,
          HarmonyMscMethodNamed.Post
        > & { id: number }
      )
    } else if (
      data.endpoint === HarmonyMscEndpointNamed.Flash &&
      data.method === HarmonyMscMethodNamed.Get
    ) {
      void this.getFlashHarmonyStatus(
        data as unknown as HarmonyMscRequest<
          HarmonyMscEndpointNamed.Flash,
          HarmonyMscMethodNamed.Get
        > & { id: number }
      )
    }
    return true
  }

  private async flashHarmony(
    data: HarmonyMscRequest<
      HarmonyMscEndpointNamed.Flash,
      HarmonyMscMethodNamed.Post
    > & {
      id: number
    }
  ) {
    try {
      const { imagePath, scriptPath } = data.body

      const deviceName = getDeviceName()
      const device = await this.deviceFlash.findDeviceByDeviceName(deviceName)

      await this.deviceFlash.execute(
        device,
        imagePath,
        scriptPath,
        this.mscHarmonyAbsoluteDir
      )

      super.emitData(data.id, { status: 200, endpoint: data.endpoint })
    } catch {
      super.emitData(data.id, {
        status: HarmonyMscErrorType.DeviceInternalError,
        endpoint: data.endpoint,
      })
    }
  }

  private async getFlashHarmonyStatus(
    data: HarmonyMscRequest<
      HarmonyMscEndpointNamed.Flash,
      HarmonyMscMethodNamed.Get
    > & {
      id: number
    }
  ) {
    try {
      const flashStatus = await this.deviceFlash.getFlashStatus?.(
        this.mscHarmonyAbsoluteDir
      )
      if (!flashStatus) {
        super.emitData(data.id, {
          status: HarmonyMscErrorType.DeviceInternalError,
          endpoint: data.endpoint,
        })
      }
      super.emitData(data.id, {
        status: 200,
        endpoint: data.endpoint,
        body: flashStatus,
      })
    } catch {
      super.emitData(data.id, {
        status: HarmonyMscErrorType.DeviceInternalError,
        endpoint: data.endpoint,
      })
    }
  }
}
