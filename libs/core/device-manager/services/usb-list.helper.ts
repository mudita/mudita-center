/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

// import { getDeviceList } from "usb"

/* eslint-disable @typescript-eslint/no-explicit-any */

import { mockServiceEnabled } from "e2e-mock-server"
import logger from "Core/__deprecated__/main/utils/logger"
import usb from "usb"

interface USBDeviceDescriptor {
  bLength: number
  bDescriptorType: number
  bcdUSB: number
  bDeviceClass: number
  bDeviceSubClass: number
  bDeviceProtocol: number
  bMaxPacketSize0: number
  idVendor: number
  idProduct: number
  bcdDevice: number
  iManufacturer: number
  iProduct: number
  iSerialNumber: number
  bNumConfigurations: number
}

interface USBDevice {
  busNumber: number
  deviceAddress: number
  deviceDescriptor: USBDeviceDescriptor
  portNumbers: number[]
  open: () => void
  close: () => void
  getStringDescriptor: (
    index: number,
    callback: (error: USBException | null, data: string) => void
  ) => void
}

interface USBException {
  errno: number
  error: string
}

interface USBDeviceInfo {
  vendorId: number
  productId: number
  manufacturer: string | null
  serialNumber: string | null
  product: string | null
}

const getStringDescriptor = (
  device: USBDevice,
  index: number
): Promise<string> => {
  return new Promise((resolve, reject) => {
    device.getStringDescriptor(
      index,
      (error: USBException | null, data: string) => {
        if (error) {
          reject(error)
        } else {
          resolve(data)
        }
      }
    )
  })
}

const getUSBDeviceInfo = async (device: USBDevice): Promise<USBDeviceInfo> => {
  const { idVendor, idProduct, iManufacturer, iSerialNumber, iProduct } =
    device.deviceDescriptor

  const info = {
    vendorId: idVendor,
    productId: idProduct,
    manufacturer: "",
    serialNumber: "",
    product: "",
  }

  device.open()

  try {
    if (iManufacturer) {
      info.manufacturer = await getStringDescriptor(device, iManufacturer)
    }
    if (iSerialNumber) {
      info.serialNumber = await getStringDescriptor(device, iSerialNumber)
    }
    if (iProduct) {
      info.product = await getStringDescriptor(device, iProduct)
    }
  } catch (error) {
    device.close()
    throw error
  }

  device.close()
  return info
}

export async function getUsbList(): Promise<USBDeviceInfo[]> {
  const deviceList = mockServiceEnabled ? [] : usb.getDeviceList()

  const deviceInfoPromises = deviceList.map(async (device: USBDevice) => {
    try {
      return await getUSBDeviceInfo(device)
    } catch (error) {
      console.error("Error fetching device information:", error)
      return null
    }
  })

  const deviceInfos = await Promise.all(deviceInfoPromises)
  const harmonyMSCDevice = deviceInfos.find((device: USBDeviceInfo) =>
    device.product!.includes("MSC mode")
  )
  logger.info("Found Device with: ", harmonyMSCDevice.product)
  return deviceInfos.filter((info): info is USBDeviceInfo => info !== null)
}
