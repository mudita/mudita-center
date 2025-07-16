/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import ipc from "node-ipc"

type ClientEmitter = (event: string, data?: unknown) => void

const SERVER_ID = "MC"
const DEFAULT_TIMEOUT = 5000

ipc.config.id = "E2E"
ipc.config.retry = 1000

export class IpcClient {
  private clientEmitter?: ClientEmitter
  private isConnecting = false
  private isConnected = false

  public async connect(): Promise<void> {
    if (this.isConnected) return
    if (this.isConnecting) throw new Error("Already connecting")

    this.isConnecting = true
    await new Promise<void>((resolve, reject) => {
      ipc.connectTo(SERVER_ID, () => {
        const client = ipc.of[SERVER_ID]

        const cleanup = () => {
          clearTimeout(timer)
          client.off("connect", onConnect)
          client.off("error", onError)
          this.isConnecting = false
        }

        const timer = setTimeout(() => {
          cleanup()
          reject(new Error("IPC connect timed out"))
        }, DEFAULT_TIMEOUT)

        const onConnect = () => {
          cleanup()
          this.clientEmitter = client.emit.bind(client)
          this.isConnected = true
          resolve()
        }

        const onError = (err: Error) => {
          cleanup()
          reject(err)
        }

        const onDisconnect = () => {
          this.clientEmitter = undefined
          this.isConnected = false
        }

        client.on("connect", onConnect)
        client.on("error", onError)
        client.on("disconnect", onDisconnect)
      })
    })
  }

  public async disconnect(): Promise<void> {
    if (!this.isConnected) return

    await new Promise<void>((resolve, reject) => {
      const client = ipc.of[SERVER_ID]
      if (!client) {
        this.isConnected = false
        resolve()
        return
      }

      const timer = setTimeout(() => {
        client.off("disconnect", onDisconnect)
        this.clientEmitter = undefined
        this.isConnected = false
        reject(new Error("IPC disconnect timed out"))
      }, DEFAULT_TIMEOUT)

      const onDisconnect = () => {
        clearTimeout(timer)
        client.off("disconnect", onDisconnect)
        this.clientEmitter = undefined
        this.isConnected = false
        resolve()
      }

      client.on("disconnect", onDisconnect)

      try {
        ipc.disconnect(SERVER_ID)
      } catch (err) {
        clearTimeout(timer)
        client.off("disconnect", onDisconnect)
        this.clientEmitter = undefined
        this.isConnected = false
        reject(err)
      }
    })
  }

  public emit(event: string, data?: unknown): void {
    this.clientEmitter?.(event, data)
  }
}
