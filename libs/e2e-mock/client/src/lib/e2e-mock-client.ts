/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import clientEmiter from "./ipc-client/ipc-client"

export const E2EMockClient = {
  checkConnection: () => {
    return !!clientEmiter
  },
  addDevice: () => {
    clientEmiter?.("mock.add.device", {
      path: "hello",
      serialNumber: "world",
    })
  },
}
