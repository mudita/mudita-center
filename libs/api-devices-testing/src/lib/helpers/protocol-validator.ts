/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { DeviceProtocol } from "device-protocol/feature"
import { expect } from '@jest/globals'

export function setActiveDevice(deviceProtocol: DeviceProtocol | undefined): DeviceProtocol {
    expect(deviceProtocol).toBeDefined()
    expect(deviceProtocol?.devices).toHaveLength(1)
  
    expect(() => {
      deviceProtocol?.setActiveDevice(deviceProtocol.devices[0].id);
    }).not.toThrow()

    return deviceProtocol!
  }
  