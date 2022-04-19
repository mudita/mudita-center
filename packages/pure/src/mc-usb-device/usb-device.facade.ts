/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { usb } from "webusb"
import {
  UsbResponse,
  UsbDeviceFacadeClass,
  WriteOption,
  USBDataType,
  EndpointCode,
} from "./usb-device.facade.class"
import { UsbParser } from "./usb-parser"

export class UsbDeviceFacade implements UsbDeviceFacadeClass {
  private packetSize = 1024

  constructor(private device: USBDevice) {}

  async openSession(id: WriteOption["id"]): Promise<boolean> {
    try {
      if (this.device.opened) {
        console.log("Already open")
        await this.device.close()
      }
      await this.device.open()
      console.log(`Opened: ${this.device.opened}`)

      if (this.device.configuration === null) {
        console.log("selectConfiguration")
        await this.device.selectConfiguration(1)
      }
      await this.device.claimInterface(0)
      this.setPacketSize()

      const writeResult = await this.write({
        id,
        type: USBDataType.CommandBlock,
        code: EndpointCode.OpenSession,
        payload: [1], // session ID
      })

      console.log(`WriteResult: ${JSON.stringify(writeResult)}`)

      const readResult = await this.read()

      console.log(`ReadResult: ${readResult}`)

      return readResult !== undefined
    } catch (error) {
      console.log(`Error during MTP setup: ${error}`)

      return false
    }
  }

  async closeSession(id: WriteOption["id"]): Promise<boolean> {
    try {
      console.log("Closing session..")
      await this.write({
        id,
        type: USBDataType.CommandBlock,
        code: EndpointCode.CloseSession,
        payload: [1], // session ID
      })

      await this.device.releaseInterface(0)
      await this.device.close()
      console.log("Closed device")
      return true
    } catch (err) {
      console.log(`Error: ${err}`)
      return false
    }
  }

  async write(option: WriteOption): Promise<any | undefined> {
    const buffer = UsbParser.buildContainerPacket(option)
    return await this.device.transferOut(0x02, buffer)
  }

  async readData(): Promise<UsbResponse | undefined> {
    let type = null
    let result = undefined

    console.log("type: ", type)
    console.log("USBDataType.DataBlock: ", USBDataType.DataBlock)
    console.log(
      "type !== USBDataType.DataBlock: ",
      type !== USBDataType.DataBlock
    )

    while (type !== USBDataType.DataBlock) {
      result = await this.read()
      console.log("readData:read: ", result, Boolean(result))

      if (result) {
        type = result.type
      } else {
        throw new Error("No data returned")
      }
    }

    return result
  }

  private async read(): Promise<UsbResponse | undefined> {
    try {
      let result = await this.device.transferIn(0x01, this.packetSize)
      console.log("this.packetSize: ", this.packetSize)

      if (
        result &&
        result.data &&
        result.data.byteLength &&
        result.data.byteLength > 0
      ) {
        let raw = new Uint8Array(result.data.buffer)
        const bytes = new DataView(result.data.buffer)
        const containerLength = bytes.getUint32(0, true)

        console.log(`Container Length: ${containerLength}`)
        console.log(`Length: ${raw.byteLength}`)

        while (raw.byteLength !== containerLength) {
          result = await this.device.transferIn(0x01, this.packetSize)
          if (result.data !== undefined) {
            const byteLength = result.data.byteLength

            console.log(`Adding ${byteLength} bytes`)

            const uint8array = raw.slice()

            raw = new Uint8Array(uint8array.byteLength + byteLength)
            raw.set(uint8array)
            raw.set(new Uint8Array(result.data.buffer), uint8array.byteLength)
          } else {
            throw Error("transferIn returns undefined")
          }
        }

        return UsbParser.parseContainerPacket(raw.buffer)
      }

      console.log(`result: ${result}`)
      return undefined
    } catch (error) {
      if (error.message.indexOf("LIBUSB_TRANSFER_NO_DEVICE")) {
        console.log("Device disconnected")
      } else {
        console.log(`Error reading data: ${error}`)
      }

      return undefined
    }
  }

  private setPacketSize() {
    try {
      this.packetSize =
        this.device.configuration!.interfaces[0].alternate.endpoints[0]
          .packetSize * 2
    } catch {
      console.log("No packet size found, setting to 1024 bytes")
    }
  }

  static async getUsbDevice(
    filter: USBDeviceFilter
  ): Promise<USBDevice | undefined> {
    const devices = await usb.getDevices()

    let device = devices.find(
      ({ serialNumber }) => serialNumber === filter.serialNumber
    )

    if (device === undefined) {
      device = await usb.requestDevice({
        filters: [filter],
      })
    }
    return device
  }
}
