/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  EndpointCode,
  USBDataType,
  UsbDeviceFacadeClass,
  WriteOption,
} from "./usb-device.facade.class"

export interface ConfigRequest {
  code: EndpointCode
  payload: any[]
}

export interface ObjectResult<DataType = undefined> {
  success: boolean
  data?: DataType
}

export interface SuccessObjectResult<DataType> extends ObjectResult<DataType> {
  success: true
  data: DataType
}

let id = 0

export class UsbDeviceService {
  constructor(private usbDeviceFacade: UsbDeviceFacadeClass) {}

  public async request<DataType = unknown>(
    config: ConfigRequest
  ): Promise<ObjectResult<DataType>> {
    const option: WriteOption = {
      type: USBDataType.CommandBlock,
      id: ++id,
      ...config,
    }
    const writeResponse = await this.usbDeviceFacade.write(option)

    if (writeResponse === undefined) {
      return {
        success: false,
      }
    }

    const readResponse = await this.usbDeviceFacade.readData()

    if (readResponse === undefined) {
      return {
        success: false,
      }
    }

    return {
      success: true,
    }
  }
}
