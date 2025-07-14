/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { IpcClient } from "./ipc-client"

const SERVER_ID = "MC"
const CLIENT_ID = "E2E"
const RETRY = 1000

const ipcClient = new IpcClient(SERVER_ID, CLIENT_ID, RETRY)

export const E2EMockClient = {
  connect: () => ipcClient.connect(),
  disconnect: () => ipcClient.disconnect(),

  // TODO: Implement mechanism to handle bellow methods
  shutdownMockServer: (): void => {
    ipcClient.emit("e2eMock.shutdown")
  },
  setMockingEnabled: (enabled: boolean): void => {
    ipcClient.emit("e2eMock.setMockingEnabled", enabled)
  },
}
