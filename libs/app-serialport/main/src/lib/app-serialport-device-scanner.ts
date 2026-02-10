/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { SerialPort } from "serialport"
import { getUsbDevices } from "./usb-devices/get-usb-devices"
import {
  SerialPortDeviceInfo,
  SerialPortDeviceSubtype,
} from "app-serialport/models"
import { PortInfo } from "@serialport/bindings-interface"
import { execPromise } from "app-utils/main"
// eslint-disable-next-line @nx/enforce-module-boundaries
import { SerialPortHandler } from "../../../devices/src/lib/serial-port-handler"
// eslint-disable-next-line @nx/enforce-module-boundaries
import { devices } from "../../../devices/src/lib/devices"

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

  static async getSerialNumberOnWindows(deviceInfo: SerialPortDeviceInfo) {
    try {
      const stdout = await execPromise(
        `Get-PnpDevice -InstanceId '${deviceInfo.pnpId}' | Get-PnpDeviceProperty -KeyName 'DEVPKEY_Device_Parent' | Select-Object -ExpandProperty Data`,
        "powershell.exe"
      )
      if (!stdout) {
        return
      }

      const serialNumber = stdout.trim().split("\\").pop() || ""

      if (!/[a-z0-9]+/i.test(serialNumber)) {
        return
      }
      return serialNumber
    } catch {
      return
    }
  }

  /**
   * Scans for connected serial port and usb devices and returns a list of recognized devices.
   */
  static async scan() {
    const serialportDevices = await SerialPort.list()
    const usbDevices = await getUsbDevices()

    const devices = [
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
          deviceSubtype: (instance as typeof SerialPortHandler).getSubtype(
            vendorId,
            productId
          ),
        }
        return internalDeviceInfo
      })
      .filter((device): device is SerialPortDeviceInfo => device !== null)

    if (process.platform === "win32") {
      for (const device of devices) {
        if (device.deviceSubtype === SerialPortDeviceSubtype.Kompakt) {
          const serialNumber = await this.getSerialNumberOnWindows(device)
          if (serialNumber) {
            device.id = serialNumber
            device.serialNumber = serialNumber
          }
        }
      }
    }

    return devices
  }
}
