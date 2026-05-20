/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { PortInfo } from "@serialport/bindings-interface"
import { MacosUsbPortDeviceParserV1 } from "./macos-usb-port-device-parser-v1"
import { MacosUsbPortDeviceParserV2 } from "./macos-usb-port-device-parser-v2"

export class MacosUSBPortDeviceParser {
  static async listUsbDevices(): Promise<PortInfo[]> {
    const major = this.getMacosMajorVersion()

    if (major !== undefined && major >= 26) {
      return MacosUsbPortDeviceParserV2.listUsbDevices()
    }

    // macOS < 26 or the system version couldn't be determined
    return MacosUsbPortDeviceParserV1.listUsbDevices()
  }

  private static getMacosMajorVersion(): number | undefined {
    const version = process.getSystemVersion?.()
    if (!version) return

    const match = version.trim().match(/^(\d+)/)
    if (!match) return

    const major = Number.parseInt(match[1], 10)
    return Number.isFinite(major) ? major : undefined
  }
}
