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
        const { vendorId, productId } = portInfo
        if (!instance || !vendorId || !productId) {
          return null
        }
        const serialNumber =
          portInfo.serialNumber && !/^0+$/m.test(portInfo.serialNumber)
            ? portInfo.serialNumber
            : undefined
        const productsGroups = instance.getProductsGroups()
        const productGroup = productsGroups.find((group) => {
          return (
            group.vendorIds.includes(vendorId) &&
            group.productIds.includes(productId)
          )
        })
        const otherProductIds = productGroup
          ? productGroup.productIds.filter((id) => id !== portInfo.productId)
          : []
        const otherVendorIds = productGroup
          ? productGroup.vendorIds.filter((id) => id !== portInfo.vendorId)
          : []
        const internalDeviceInfo: SerialPortDeviceInfo = {
          ...portInfo,
          id:
            process.platform === "darwin" && portInfo.locationId
              ? portInfo.locationId
              : portInfo.path,
          productId,
          vendorId,
          otherProductIds,
          otherVendorIds,
          serialNumber,
          deviceType: instance.deviceType,
          deviceSubtype: (instance as typeof SerialPortDevice).getSubtype(
            vendorId,
            productId
          ),
        }
        return internalDeviceInfo
      })
      .filter((device) => device !== null)
  }
}
