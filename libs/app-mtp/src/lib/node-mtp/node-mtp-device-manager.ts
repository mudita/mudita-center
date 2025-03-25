/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { NodeMtpDevice } from "./node-mtp-device"

export class NodeMtpDeviceManager {
  getDevice(): NodeMtpDevice {
    // mock implementation
    return new NodeMtpDevice()
  }
}
