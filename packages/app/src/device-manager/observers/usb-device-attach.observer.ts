/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Observer } from "App/core/types"
import { DeviceManager } from "App/device-manager/services"
import { PortInfoValidator } from "App/device-manager/validators"
const intervalTime = 3000

export class UsbDeviceAttachObserver implements Observer {
  private attachedDevicePaths = new Set<string>()
  constructor(private deviceManager: DeviceManager) {}

  public observe(): void {
    void this.watchConnectedDevices()
  }

  private async watchConnectedDevices(): Promise<void> {
    const devices = await this.deviceManager.getConnectedDevices()

    const detachedDevicePaths = Array.from(this.attachedDevicePaths).filter(
      (attachedDevicePath) =>
        !devices.map(({ path }) => path).includes(attachedDevicePath)
    )

    detachedDevicePaths.forEach((attachedDevicePath) => {
      void this.deviceManager.removeDevice(attachedDevicePath)
    })

    const attachedDevices = devices.filter((device) =>
      PortInfoValidator.isVendorIdValid({
        vendorId: device.vendorId,
        productId: device.productId,
      })
    )

    attachedDevices.forEach((attachedDevice) => {
      if (!this.attachedDevicePaths.has(attachedDevice.path)) {
        void this.deviceManager.addDevice(attachedDevice)
      }
    })

    this.attachedDevicePaths = new Set(attachedDevices.map(({ path }) => path))

    return new Promise((resolve) => {
      setTimeout(() => {
        void (async () => {
          resolve(await this.watchConnectedDevices())
        })()
      }, intervalTime)
    })
  }
}
