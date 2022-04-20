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

export interface ObjectResultError {
  message: string
}

export interface ObjectResult<DataType = undefined> {
  success: boolean
  data?: DataType
  error?: ObjectResultError
}

export interface SuccessObjectResult<DataType> extends ObjectResult<DataType> {
  success: true
  data: DataType
}

let id = 0

export class UsbDeviceService {
  constructor(private usbDeviceFacade: UsbDeviceFacadeClass) {}

  public async openSession(): Promise<ObjectResult> {
    const opened = await this.usbDeviceFacade.openSession(++id)
    return {
      success: Boolean(opened),
    }
  }

  public async closeSession(): Promise<ObjectResult> {
    const closed = await this.usbDeviceFacade.closeSession(++id)
    return {
      success: Boolean(closed),
    }
  }

  public async request(
    config: ConfigRequest
  ): Promise<ObjectResult<ArrayBuffer>> {
    const option: WriteOption = {
      type: USBDataType.CommandBlock,
      id: ++id,
      ...config,
    }
    try {
      await this.usbDeviceFacade.write(option)

      const readResponse = await this.usbDeviceFacade.readData()

      return {
        success: true,
        data: readResponse!.payload,
      }
    } catch (error) {
      return {
        success: false,
        error,
      }
    }
  }
}
