/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Device } from "usb"

export interface SerialPortAdapterClass {
  request(device: Device, payload: any): Promise<string>
}
