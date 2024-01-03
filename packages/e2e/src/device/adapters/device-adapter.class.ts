/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { PortInfo } from "serialport"
import { DeviceIdentity } from "../types"

export interface DeviceAdapterClass {
  getDeviceByDescription(props: DeviceIdentity): Promise<PortInfo>
}
