/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { AddKompakt, AddKompaktResponse } from "e2e-mock-server"
import clientEmiter from "./ipc-client/ipc-client"

export const E2EMockClient = {
  checkConnection: () => {
    return !!clientEmiter
  },
  addDevice: (kompaktPortInfo?: AddKompakt) => {
    clientEmiter?.(
      "mock.add.device",
      kompaktPortInfo ?? {
        path: "hello",
        serialNumber: "world",
      }
    )
  },
  removeDevice: (path: string) => {
    clientEmiter?.("mock.remove.device", path)
  },
  mockResponse: (param: AddKompaktResponse) => {
    clientEmiter?.("mock.response.every", param)
  },
  mockResponseOnce: (param: AddKompaktResponse) => {
    clientEmiter?.("mock.response.once", param)
  },
}
