/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  USBPortDevice,
  USBPortDeviceFilters,
} from "./macos-usb-port-device-bsd-name-parser.interface"
import { MacosUsbPortDeviceBsdNameParserV1 } from "./macos-usb-port-device-bsd-name-parser-v1"
import { MacosUsbPortDeviceBsdNameParserV2 } from "./macos-usb-port-device-bsd-name-parser-v2"

export class MacosUsbPortDeviceBsdNameParser {
  static async getUSBPortDevices(
    filters?: USBPortDeviceFilters
  ): Promise<USBPortDevice[]> {
    const major = this.getMacosMajorVersion()

    if (major !== undefined && major >= 26) {
      return MacosUsbPortDeviceBsdNameParserV2.getUSBPortDevices()
    }

    // macOS < 26 or the system version couldn't be determined
    return MacosUsbPortDeviceBsdNameParserV1.getUSBPortDevices(filters)
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
