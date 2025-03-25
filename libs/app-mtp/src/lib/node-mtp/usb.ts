/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { WebUSB } from "usb"

export const usb = new WebUSB({
  // Bypass checking for authorised devices
  allowAllDevices: true,
})
