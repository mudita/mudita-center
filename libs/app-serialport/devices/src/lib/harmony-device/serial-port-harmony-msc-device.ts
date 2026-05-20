/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import path from "path"
import { app } from "electron"
import { SerialPortDeviceType, SerialPortRequest } from "app-serialport/models"
import {
  HarmonyMscEndpointNamed,
  HarmonyMscErrorType,
  HarmonyMscMethodNamed,
  HarmonyMscRequest,
  MSC_HARMONY_SCOPE,
  MSC_HARMONY_SCOPE_CATALOG_DIR,
} from "devices/harmony-msc/models"
import { SerialPortHandlerMock } from "../serial-port-handler-mock"
import DeviceFlashFactory from "./device-flash/device-flash.factory"

const getDeviceName = () => {
  return process.platform === "win32" ? "MUDITA HARMONY MSC" : "HARMONY"
}

export class SerialPortHarmonyMscDevice extends SerialPortHandlerMock {
  static readonly matchingVendorIds = ["3310", "13072"]
  static readonly matchingProductIds = ["0103", "259", "768"]
  static readonly deviceType = SerialPortDeviceType.HarmonyMsc
  private deviceFlash = DeviceFlashFactory.createDeviceFlashService()
  private mscHarmonyAbsoluteDir = path.join(
    app.getPath(MSC_HARMONY_SCOPE),
    MSC_HARMONY_SCOPE_CATALOG_DIR
  )

  async request(data: SerialPortRequest): Promise<Record<string, unknown>> {
    const { endpoint, method } = data as unknown as HarmonyMscRequest<
      HarmonyMscEndpointNamed,
      HarmonyMscMethodNamed
    >
    if (
      endpoint === HarmonyMscEndpointNamed.Flash &&
      method === HarmonyMscMethodNamed.Post
    ) {
      return this.flashHarmony(
        data as unknown as HarmonyMscRequest<
          HarmonyMscEndpointNamed.Flash,
          HarmonyMscMethodNamed.Post
        >
      )
    } else if (
      endpoint === HarmonyMscEndpointNamed.Flash &&
      method === HarmonyMscMethodNamed.Get
    ) {
      return this.getFlashHarmonyStatus()
    }
    return {
      status: HarmonyMscErrorType.DeviceInternalError,
      endpoint,
    }
  }

  private async flashHarmony(
    data: HarmonyMscRequest<
      HarmonyMscEndpointNamed.Flash,
      HarmonyMscMethodNamed.Post
    >
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

      return { status: 200, endpoint: data.endpoint }
    } catch {
      return {
        status: HarmonyMscErrorType.DeviceInternalError,
        endpoint: data.endpoint,
      }
    }
  }

  async getFlashHarmonyStatus() {
    try {
      const flashStatus = await this.deviceFlash.getFlashStatus?.(
        this.mscHarmonyAbsoluteDir
      )
      if (!flashStatus) {
        return {
          status: HarmonyMscErrorType.DeviceInternalError,
        }
      }
      return {
        status: 200,
        body: flashStatus,
      }
    } catch {
      return {
        status: HarmonyMscErrorType.DeviceInternalError,
      }
    }
  }
}
