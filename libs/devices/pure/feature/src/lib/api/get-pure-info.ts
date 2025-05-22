/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Pure, PureEndpointNamed, PureMethodNamed } from "devices/pure/models"
import { PureSerialPort } from "devices/pure/adapters"

export const getPureInfo = async (device: Pure) => {
  return await PureSerialPort.request(device, {
    endpoint: PureEndpointNamed.DeviceInfo,
    method: PureMethodNamed.Get,
    options: {
      timeout: 2000,
      retries: 3,
    },
  })
}
