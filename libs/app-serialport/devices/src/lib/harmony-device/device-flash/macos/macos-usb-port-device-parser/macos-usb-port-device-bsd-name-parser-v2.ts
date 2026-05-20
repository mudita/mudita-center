/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { execPromise } from "app-utils/main"
import isMatch from "lodash/isMatch"
import { MacosUSBPortDeviceParser } from "../../../../usb-port-device-parser"
import {
  USBPortDevice,
  USBPortDeviceFilters,
} from "./macos-usb-port-device-bsd-name-parser.interface"

export class MacosUsbPortDeviceBsdNameParserV2 {
  static async getUSBPortDevices(
    filters?: USBPortDeviceFilters
  ): Promise<USBPortDevice[]> {
    const usbDevices = await MacosUSBPortDeviceParser.listUsbDevices()
    const filteredDevices = filters
      ? usbDevices.filter((device) => isMatch(device, filters))
      : usbDevices

    return await this.enrichWithBsdNames(filteredDevices)
  }

  private static async enrichWithBsdNames(
    devices: USBPortDevice[]
  ): Promise<USBPortDevice[]> {
    return await Promise.all(
      devices.map(async (device) => ({
        ...device,
        bsdName: device.locationId
          ? await this.tryGetBsdNameFromLocationIdHex(device.locationId)
          : undefined,
      }))
    )
  }

  private static async tryGetBsdNameFromLocationIdHex(
    locationIdHex: string
  ): Promise<string | undefined> {
    const usbProductName =
      await this.resolveUsbProductNameByLocationId(locationIdHex)
    if (!usbProductName) return

    return this.resolveBsdNameByIoServiceName(usbProductName)
  }

  /**
   * Resolve USB Product Name from IOUSB plane using locationID (hex string).
   */
  private static async resolveUsbProductNameByLocationId(
    locationIdHex: string
  ): Promise<string | undefined> {
    const hex = locationIdHex.trim().replace(/^0x/i, "")

    if (!/^[0-9a-f]+$/i.test(hex)) {
      return
    }

    const locationIdDec = parseInt(hex, 16)

    const awkProgram = [
      '/^$/ { if (loc_match && name!="") { print name; exit } loc=""; name=""; loc_match=0; next }',
      '/"USB Product Name" =/ {',
      '  name=$0; sub(/.*= "/,"",name); sub(/".*/,"",name);',
      "}",
      '/"locationID" =/ {',
      '  loc=$0; sub(/.*= /,"",loc); loc_match=(loc+0==target);',
      "}",
      '(loc_match && name!="") { print name; exit }',
    ].join(" ")

    const command = [
      "ioreg -p IOUSB -r -c IOUSBHostDevice -l -w0 |",
      `awk -v target=${locationIdDec} '${awkProgram}'`,
    ].join(" ")

    const output = String((await execPromise(command)) ?? "").trim()

    return output || undefined
  }

  /**
   * Resolve whole-disk BSD name (e.g. disk4) from IOService plane.
   */
  private static async resolveBsdNameByIoServiceName(
    usbProductName: string
  ): Promise<string | undefined> {
    const escapedName = usbProductName
      .replace(/\\/g, "\\\\")
      .replace(/"/g, '\\"')

    const command = [
      `ioreg -p IOService -n "${escapedName}" -r -t -l |`,
      `awk -F\\" '`,
      `  /"Whole" = Yes/ {whole=1}`,
      `  /"BSD Name"/ && whole {print $4; exit}`,
      `'`,
    ].join(" ")

    const output = String((await execPromise(command)) ?? "").trim()
    return output || undefined
  }
}
