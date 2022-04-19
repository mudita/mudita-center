/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ObjectResult, UsbDeviceService } from "./usb-device.service"
import { EndpointCode } from "./usb-device.facade.class"
import { UsbDecoder } from "./usb-decoder"

export class McUsbDeviceService {
  constructor(private usbDeviceService: UsbDeviceService) {}

  async getObjectHandles(): Promise<ObjectResult<string[]>> {
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
  }

  async openSession(): Promise<ObjectResult> {
    return this.usbDeviceService.openSession()
  }

  async closeSession(): Promise<ObjectResult> {
    return this.usbDeviceService.closeSession()
  }
}
