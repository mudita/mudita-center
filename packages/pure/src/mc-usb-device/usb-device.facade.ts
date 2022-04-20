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
import { LogConfig, LoggerFactory } from "../logger"
import log from "../logger/log-decorator"

const logger = LoggerFactory.getInstance()

export class UsbDeviceFacade implements UsbDeviceFacadeClass {
  private sessionId = 1
  private packetSize = 1024

  constructor(private device: USBDevice) {}

  async openSession(id: WriteOption["id"]): Promise<boolean> {
    if (this.device.opened) {
      await this.device.close()
    }

    await this.device.open()

    if (this.device.configuration === null) {
      await this.device.selectConfiguration(1)
    }
    await this.device.claimInterface(0)
    this.setPacketSize()

    await this.write({
      id,
      type: USBDataType.CommandBlock,
      code: EndpointCode.OpenSession,
      payload: [this.sessionId],
    })

    const readResult = await this.read()

    return readResult !== undefined
  }

  async closeSession(id: WriteOption["id"]): Promise<boolean> {
    await this.write({
      id,
      type: USBDataType.CommandBlock,
      code: EndpointCode.CloseSession,
      payload: [this.sessionId],
    })

    await this.device.releaseInterface(0)
    await this.device.close()
    return true
  }

  @log("==== usb: write:args ====", LogConfig.Args)
  async write(option: WriteOption): Promise<any | undefined> {
    const buffer = UsbParser.buildContainerPacket(option)
    return await this.device.transferOut(0x02, buffer)
  }

  @log("==== usb: readData ====")
  async readData(): Promise<UsbResponse> {
    let type = null
    let result = undefined

    while (type !== USBDataType.DataBlock) {
      result = await this.read()

      if (result) {
        type = result.type
      } else {
        throw new Error("readData: No data returned")
      }
    }

    return result as UsbResponse
  }

  private async read(): Promise<UsbResponse> {
    let result = await this.device.transferIn(0x01, this.packetSize)

    if (
      result &&
      result.data &&
      result.data.byteLength &&
      result.data.byteLength > 0
    ) {
      let raw = new Uint8Array(result.data.buffer)
      const bytes = new DataView(result.data.buffer)
      const containerLength = bytes.getUint32(0, true)

      logger.info(`==== usb: read:Container Length: ${containerLength} ====`)
      logger.info(`==== usb: read:Length: ${raw.byteLength} ====`)

      while (raw.byteLength !== containerLength) {
        result = await this.device.transferIn(0x01, this.packetSize)
        if (result.data !== undefined) {
          const byteLength = result.data.byteLength

          logger.info(`==== usb: read:Adding ${byteLength} bytes ====`)

          const uint8array = raw.slice()

          raw = new Uint8Array(uint8array.byteLength + byteLength)
          raw.set(uint8array)
          raw.set(new Uint8Array(result.data.buffer), uint8array.byteLength)
        } else {
          throw Error("read:transferIn returns undefined")
        }
      }

      return UsbParser.parseContainerPacket(raw.buffer)
    } else {
      throw Error("read:result is undefined")
    }
  }

  private setPacketSize() {
    try {
      this.packetSize =
        this.device.configuration!.interfaces[0].alternate.endpoints[0]
          .packetSize * 2
    } catch {
      // setPacketSize: No packet size found, setting to 1024 bytes
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
