/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { UsbDeviceFacadeClass } from "./usb-device.facade.class"

export class UsbDeviceMockFacade implements UsbDeviceFacadeClass {
  async readData(): Promise<undefined> {
    return undefined
  }

  async write(): Promise<undefined> {
    return undefined
  }

  async openSession(): Promise<undefined> {
    return undefined
  }

  async closeSession(): Promise<undefined> {
    return undefined
  }
}
