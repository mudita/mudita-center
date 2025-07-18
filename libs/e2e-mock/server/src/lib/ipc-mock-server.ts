/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import ipc from "node-ipc"
import { E2eMockIpcEvents } from "e2e-mock/models"

ipc.config.id = "MC"
ipc.config.retry = 15

export class IpcMockServer {
  public serverEnabled = process.env.MOCK_SERVER_ENABLED === "1"

  start(): void {
    if (!this.serverEnabled) {
      return
    }

    ipc.serve(() => {
      ipc.server.on(E2eMockIpcEvents.shutdownServer, () => this.stop())
    })
    ipc.server.start()
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  on(eventKey: string, callback: (...args: any[]) => void): void {
    if (!this.serverEnabled) {
      return
    }
    ipc.server.on(eventKey, callback)
  }

  stop(): void {
    if (!this.serverEnabled) {
      return
    }
    ipc.server.stop()
  }
}

export const mockServer = new IpcMockServer()
