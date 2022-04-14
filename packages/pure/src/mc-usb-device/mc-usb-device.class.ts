/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { McUsbFile } from "./mc-usb-file.interface"
import { ObjectResult } from "./usb-device.service"

export interface McUsbDeviceClass {
  getFiles(): Promise<ObjectResult<McUsbFile[]>>
}
