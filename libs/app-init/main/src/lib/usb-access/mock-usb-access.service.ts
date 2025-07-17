/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { AppResult, AppResultFactory } from "app-utils/models"
import { delay } from "app-utils/common"
import { IpcMockServer } from "e2e-mock/server"
import { E2eMockIpcEvents } from "e2e-mock/models"
import { SetUsbAccessPayload } from "app-init/models"

export class MockUsbAccessService {
  private serialPortAccess = true
  private grantAccessToSerialPortResult = true

  constructor(private mockServer: IpcMockServer) {
    this.registerListeners()
  }

  async hasSerialPortAccess(): Promise<AppResult<boolean>> {
    // if (!this.isLinux()) {
    //   return AppResultFactory.success(true)
    // }
    await delay(1000)
    return AppResultFactory.success(this.serialPortAccess)
  }

  async grantAccessToSerialPort(): Promise<AppResult> {
    if (this.grantAccessToSerialPortResult) {
      return AppResultFactory.success()
    } else {
      return AppResultFactory.failed(
        new Error("Failed to grant access to serial port")
      )
    }
  }

  private isLinux(): boolean {
    return process.platform === "linux"
  }

  private registerListeners(): void {
    this.mockServer.on(E2eMockIpcEvents.setUsbAccess, this.handleSetUsbAccess)
  }

  private handleSetUsbAccess = ({
    serialPortAccess = this.serialPortAccess,
    grantAccessToSerialPortResult = this.grantAccessToSerialPortResult,
  }: SetUsbAccessPayload) => {
    this.serialPortAccess = serialPortAccess
    this.grantAccessToSerialPortResult = grantAccessToSerialPortResult
  }
}
