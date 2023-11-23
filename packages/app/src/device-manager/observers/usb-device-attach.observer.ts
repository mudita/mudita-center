/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Observer } from "App/core/types"
import { DeviceManager } from "App/device-manager/services"

const intervalTime = 3000

export class UsbDeviceAttachObserver implements Observer {
  private previousAttachedDevicePaths = new Set<string>()
  constructor(private deviceManager: DeviceManager) {}

  public observe(): void {
    void this.watchAttachedDevices()
  }

  private async watchAttachedDevices(): Promise<void> {
    const attachedDevices = await this.deviceManager.getAttachedDevices()

    const detachedDevicePaths = Array.from(this.previousAttachedDevicePaths).filter(
      (previousAttachedDevicePath) =>
        !attachedDevices.map(({ path }) => path).includes(previousAttachedDevicePath)
    )

    detachedDevicePaths.forEach((detachedDevicePath) => {
      void this.deviceManager.removeActiveDevice(detachedDevicePath)
    })

    attachedDevices.forEach((attachedDevice) => {
      if (!this.previousAttachedDevicePaths.has(attachedDevice.path)) {
        void this.deviceManager.initializeActiveDevice(attachedDevice)
      }
    })

    this.previousAttachedDevicePaths = new Set(attachedDevices.map(({ path }) => path))

    return new Promise((resolve) => {
      setTimeout(() => {
        void (async () => {
          resolve(await this.watchAttachedDevices())
        })()
      }, intervalTime)
    })
  }
}
