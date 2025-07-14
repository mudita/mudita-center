/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import ipc from "node-ipc"
import { Socket } from "net"

interface SocketConfig {
  address?: string | undefined
  port?: number | undefined
}

const SERVER_ID = "MC"
const DEFAULT_RETRY = 15

type DomainHandler = (payload: unknown, socket: string | number) => void

export class IpcMockServer {
  public readonly mockServiceEnabled: boolean

  private handlers = new Map<string, DomainHandler>()

  constructor(retry: number = DEFAULT_RETRY, serverId: string = SERVER_ID) {
    ipc.config.id = serverId
    ipc.config.retry = retry
    this.mockServiceEnabled = process.env.MOCK_SERVICE_ENABLED === "true"
    console.log(`[IpcMockServer] mockServiceEnabled=${this.mockServiceEnabled}`)
  }

  public start(): void {
    ipc.serve(() => {
      ipc.server.on("message", (data, socket) => {
        if (!this.mockServiceEnabled) return
        const { event, payload } = data
        const handler = this.handlers.get(event)
        if (handler) handler(payload, socket)
      })

      ipc.server.on("shutdownMockServer", () => {
        this.stop()
      })
    })
    ipc.server.start()
  }

  public on(eventKey: string, handler: DomainHandler): void {
    this.handlers.set(eventKey, handler)
  }

  public emitResponse(
    socket: Socket | SocketConfig,
    event: string,
    payload?: unknown
  ): void {
    ipc.server.emit(socket, event, payload)
  }

  public stop(): void {
    this.handlers.clear()
    ipc.server.stop()
  }
}
