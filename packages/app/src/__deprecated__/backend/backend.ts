/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import "reflect-metadata"
import Adapters from "App/__deprecated__/backend/adapters/adapters.interface"
import { ipcMain } from "electron-better-ipc"
import {
  backendAdaptersChannel,
  EndpointRemover,
} from "App/__deprecated__/backend/backend.types"

class Backend {
  private usingFakeAdapters = false
  private endpointsRemovers: EndpointRemover[] = []

  constructor(
    private adapters: Adapters,
    private fakeAdapters: Adapters,
    private requests: Array<(adapters: Adapters) => EndpointRemover>
  ) {}

  private registerEndpoints() {
    this.requests.forEach((register) => {
      const unregister = register(
        this.usingFakeAdapters ? this.fakeAdapters : this.adapters
      )
      this.endpointsRemovers.push(unregister)
    })
  }

  private unregisterEndpoints() {
    this.endpointsRemovers.forEach((remove) => remove())
    this.endpointsRemovers = []
  }

  private toggleAdapters() {
    this.usingFakeAdapters = !this.usingFakeAdapters
    this.unregisterEndpoints()
    this.registerEndpoints()
  }

  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  public init() {
    ipcMain.answerRenderer<boolean>(backendAdaptersChannel, () => {
      this.toggleAdapters()
    })
    this.registerEndpoints()
  }
}

export default Backend
