/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Pure, PureEndpointNamed, PureMethodNamed } from "devices/pure/models"
import { PureSerialPort } from "devices/pure/adapters"

export const getPureLockStatus = async (device: Pure) => {
  const response = await PureSerialPort.request(device, {
    endpoint: PureEndpointNamed.Security,
    method: PureMethodNamed.Get,
    body: {
      category: "phoneLockStatus",
    },
    options: {
      timeout: 1000,
    },
  })
  return {
    ...response,
    ok: response.ok || response.status < 300,
  }
}
