/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { SerialPortDeviceType } from "app-serialport/models"
import { SerialPortDeviceOptions } from "../serial-port-device"
import { SerialPortDeviceMock } from "../serial-port-device-mock"
import {
  HarmonyMscEndpointNamed,
  HarmonyMscMethodNamed,
  HarmonyMscRequest,
} from "devices/harmony-msc/models"
import { styleText } from "util"

export class SerialPortHarmonyMscDevice extends SerialPortDeviceMock {
  static readonly matchingVendorIds = ["3310"]
  static readonly matchingProductIds = ["0103"]
  static readonly deviceType = SerialPortDeviceType.HarmonyMsc

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
      void this.flashHarmony(data)
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
    // TODO: Perform a real flash request
    const calculateProgress = () => {
      return new Promise<number>((resolve) => {
        setTimeout(() => resolve(50), 1000)
      })
    }
    const progress = await calculateProgress()

    this.emitData(data.id, progress)
  }
}
