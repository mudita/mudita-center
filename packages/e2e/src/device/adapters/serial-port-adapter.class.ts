/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Device } from "usb"
import { Response } from "../../pure/types"

export interface SerialPortAdapterClass {
  request<Body>(device: Device, payload: any): Promise<Response<Body>>
  requests<Body>(device: Device, payload: any[]): Promise<Response<Body>[]>
}
