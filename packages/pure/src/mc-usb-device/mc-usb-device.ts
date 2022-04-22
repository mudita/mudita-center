/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { McUsbDeviceClass } from "./mc-usb-device.class"
import { McUsbFile, McUsbFileType } from "./mc-usb-file.interface"
import { McUsbDeviceService } from "./mc-usb-device.service"
import { ObjectResult } from "./usb-device.service"

export class McUsbDevice implements McUsbDeviceClass {
  constructor(private mcUsbDeviceService: McUsbDeviceService) {}
  async getFiles(): Promise<ObjectResult<McUsbFile[]>> {
    const openSessionResult = await this.mcUsbDeviceService.openSession()
    if (!openSessionResult.success) {
      return {
        success: false,
      }
    }

    const getObjectHandlesResult =
      await this.mcUsbDeviceService.getObjectHandles()
    const ids = getObjectHandlesResult.data

    if (!getObjectHandlesResult.success || ids === undefined) {
      return {
        success: false,
      }
    }

    const files: McUsbFile[] = []

    try {
      for await (const id of ids) {
        const fileInformation = await this.getFileInformation(id)
        files.push(fileInformation)
      }
    } catch (error) {
      await this.mcUsbDeviceService.closeSession()
      return {
        success: false,
        error,
      }
    }
    await this.mcUsbDeviceService.closeSession()

    return {
      success: true,
      data: files,
    }
  }

  private async getFileInformation(id: McUsbFile["id"]): Promise<McUsbFile> {
    const getFileNameResult = await this.mcUsbDeviceService.getFileName(id)

    const name = getFileNameResult.data
    if (!getFileNameResult.success || name === undefined) {
      throw new Error(`getFileNameResult: ${id}`)
    }

    const getFileSizeResult = await this.mcUsbDeviceService.getFileSize(id)

    const size = getFileSizeResult.data
    if (!getFileSizeResult.success || size === undefined) {
      throw new Error(`getFileSizeResult: ${id}`)
    }

    const getFileFormatResult = await this.mcUsbDeviceService.getFileFormat(id)

    const format = getFileFormatResult.data
    if (!getFileFormatResult.success || format === undefined) {
      throw new Error(`getFileFormatResult: ${id}`)
    }

    return {
      id,
      name,
      size,
      type: format,
    }
  }
}
