/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { SerialPort } from "serialport"
import { getUsbDevices } from "./usb-devices/get-usb-devices"
import { SerialPortDeviceInfo } from "app-serialport/models"
import { devices, SerialPortDevice } from "app-serialport/devices"
import { PortInfo } from "@serialport/bindings-interface"

export class AppSerialportDeviceScanner {
  private static readonly supportedDevices = devices

  /**
   * Finds a supported device instance matching the given vendorId and productId.
   * @param vendorId
   * @param productId
   */
  static getMatchingInstance({
    vendorId,
    productId,
  }: Pick<SerialPortDeviceInfo | PortInfo, "vendorId" | "productId">) {
    if (!vendorId || !productId) {
      return undefined
    }
    return this.supportedDevices.find((device) => {
      return (
        device.matchingVendorIds.includes(vendorId) &&
        device.matchingProductIds.includes(productId)
      )
    })
  }

  /**
   * Scans for connected serial port and usb devices and returns a list of recognized devices.
   */
  static async scan() {
    const serialportDevices = await SerialPort.list()
    const usbDevices = await getUsbDevices()

    return [
      ...serialportDevices.filter((portInfo) => {
        return this.getMatchingInstance(portInfo) !== undefined
      }),
      ...usbDevices.filter((portInfo) => {
        const instance = this.getMatchingInstance(portInfo)
        return instance && instance.nonSerialPortDevice
      }),
    ]
      .map((portInfo) => {
        const instance = this.getMatchingInstance(portInfo)
        if (!instance || !portInfo.vendorId || !portInfo.productId) {
          return null
        }
        const serialNumber =
          portInfo.serialNumber && !/^0+$/m.test(portInfo.serialNumber)
            ? portInfo.serialNumber
            : undefined
        const internalDeviceInfo: SerialPortDeviceInfo = {
          ...portInfo,
          id:
            process.platform === "darwin" && portInfo.locationId
              ? portInfo.locationId
              : portInfo.path,
          productId: portInfo.productId,
          vendorId: portInfo.vendorId,
          serialNumber,
          deviceType: instance.deviceType,
          deviceSubtype: (instance as typeof SerialPortDevice).getSubtype(
            portInfo.vendorId,
            portInfo.productId
          ),
        }
        return internalDeviceInfo
      })
      .filter((device) => device !== null)
  }
}
