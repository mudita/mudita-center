/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { UsbDeviceService } from "./usb-device.service"
import { MuditaPureDescriptor, MuditaHarmonyDescriptor } from "../device"

export class UsbDeviceServiceFactory {
  static create(
    descriptor: typeof MuditaPureDescriptor | typeof MuditaHarmonyDescriptor
  ): UsbDeviceService {
    console.log("descriptor: ", descriptor)
    return new UsbDeviceService()
  }
}
