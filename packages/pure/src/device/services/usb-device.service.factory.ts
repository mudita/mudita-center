/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import UsbDeviceService from "./usb-device.service"
import { MuditaPureDescriptor, MuditaHarmonyDescriptor } from "../descriptors"

class UsbDeviceServiceFactory {
  static create(
    descriptor: typeof MuditaPureDescriptor | typeof MuditaHarmonyDescriptor
  ): UsbDeviceService {
    return new UsbDeviceService()
  }
}

export default UsbDeviceServiceFactory
