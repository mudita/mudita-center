/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ObjectResult, UsbDeviceService } from "./usb-device.service"
import { EndpointCode, ObjectPropValue } from "./usb-device.facade.class"
import { UsbDecoder } from "./usb-decoder"
import { McUsbFileType } from "./mc-usb-file.interface"
import log from "../logger/log-decorator"
import { toErrorWithMessage } from "../to-error"

export class McUsbDeviceService {
  constructor(private usbDeviceService: UsbDeviceService) {}

  @log("==== mc usb: open session ====")
  async openSession(): Promise<ObjectResult> {
    try {
      return await this.usbDeviceService.openSession()
    } catch (error) {
      return {
        success: false,
        error: toErrorWithMessage(error),
      }
    }
  }

  @log("==== mc usb: close session ====")
  async closeSession(): Promise<ObjectResult> {
    try {
      return await this.usbDeviceService.closeSession()
    } catch (error) {
      return {
        success: false,
        error: toErrorWithMessage(error),
      }
    }
  }

  @log("==== mc usb: get object handles ====")
  async getObjectHandles(): Promise<ObjectResult<string[]>> {
    try {
      const result = await this.usbDeviceService.request({
        code: EndpointCode.GetObjectHandles,
        payload: [0xffffffff, 0, 0xffffffff], // get all
      })

      if (!result.success || result.data === undefined) {
        return {
          success: false,
        }
      }

      return {
        success: true,
        data: UsbDecoder.getParameters(result.data),
      }
    } catch (error) {
      return {
        success: false,
        error: toErrorWithMessage(error),
      }
    }
  }

  @log("==== mc usb: get file name ====")
  async getFileName(id: string): Promise<ObjectResult<string>> {
    try {
      const result = await this.usbDeviceService.request({
        code: EndpointCode.GetObjectPropValue,
        payload: [Number(id), ObjectPropValue.Name],
      })

      if (!result.success || result.data === undefined) {
        return {
          success: false,
        }
      }

      return {
        success: true,
        data: UsbDecoder.getString(result.data),
      }
    } catch (error) {
      return {
        success: false,
        error: toErrorWithMessage(error),
      }
    }
  }

  @log("==== mc usb: get file size ====")
  async getFileSize(id: string): Promise<ObjectResult<number>> {
    try {
      const result = await this.usbDeviceService.request({
        code: EndpointCode.GetObjectPropValue,
        payload: [Number(id), ObjectPropValue.Size],
      })

      if (!result.success || result.data === undefined) {
        return {
          success: false,
        }
      }

      return {
        success: true,
        data: UsbDecoder.getNumberFromUint64(result.data),
      }
    } catch (error) {
      return {
        success: false,
        error: toErrorWithMessage(error),
      }
    }
  }

  @log("==== mc usb: get file format ====")
  async getFileFormat(id: string): Promise<ObjectResult<McUsbFileType>> {
    try {
      const result = await this.usbDeviceService.request({
        code: EndpointCode.GetObjectPropValue,
        payload: [Number(id), ObjectPropValue.Format],
      })

      if (!result.success || result.data === undefined) {
        return {
          success: false,
        }
      }

      return {
        success: true,
        data: UsbDecoder.getUsbFileType(result.data),
      }
    } catch (error) {
      return {
        success: false,
        error: toErrorWithMessage(error),
      }
    }
  }
}
