/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { MainProcessIpc } from "electron-better-ipc"
import { Initializer } from "App/core/types"
import { DeviceManager } from "App/device-manager/services"

export class ConnectedDeviceInitializer implements Initializer {
  constructor(
    private deviceManager: DeviceManager,
    private ipc: MainProcessIpc
  ) {}

  public async initialize(): Promise<void> {
    const devices = await this.deviceManager.getConnectedDevices()

    devices.forEach((device) => {
      void this.deviceManager.addDevice(device)
    })
  }
}
