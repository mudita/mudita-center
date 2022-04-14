/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ObjectResult, UsbDeviceService } from "./usb-device.service"
import { EndpointCode } from "./usb-device.facade.class"

export class McUsbDeviceService {
  constructor(private usbDeviceService: UsbDeviceService) {}

  async getObjectHandles(): Promise<ObjectResult<string[]>> {
    return {
      success: true,
      data: ["1", "2"],
    }
  }
  async openSession<DataType>(): Promise<ObjectResult<DataType>> {
    const config = {
      code: EndpointCode.OpenSession,
      payload: [],
    }

    return this.usbDeviceService.request(config)
  }
}
