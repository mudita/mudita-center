/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { AddKompakt, AddKompaktResponse, MockHttpResponse, UpdateState } from "e2e-mock-server"
import { connect, disconnect, getClientEmiter } from "./ipc-client/ipc-client"

export const E2EMockClient = {
  checkConnection: () => {
    return !!getClientEmiter()
  },
  addDevice: (kompaktPortInfo?: AddKompakt) => {
    getClientEmiter()?.(
      "mock.add.device",
      kompaktPortInfo ?? {
        path: "hello",
        serialNumber: "world",
      }
    )
  },
  removeDevice: (path: string) => {
    getClientEmiter()?.("mock.remove.device", path)
  },
  mockResponse: (param: AddKompaktResponse) => {
    getClientEmiter()?.("mock.response.every", param)
  },
  mockResponseOnce: (param: AddKompaktResponse) => {
    getClientEmiter()?.("mock.response.once", param)
  },
  connect: () => {
    connect()
  },
  stopServer: () => {
    getClientEmiter()?.("server.stop", undefined)
  },
  disconnect,
  setMockUpdateState: (param: UpdateState) => {
    getClientEmiter()?.("set.mock.update.state", param)
  },
  mockHttpResponse: (param: MockHttpResponse) => {
    getClientEmiter()?.("mock.http.response", param)
  },
}
