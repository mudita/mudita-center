/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Observer } from "Core/core/types"
import { DeviceManager } from "Core/device-manager/services"
import { PortInfoValidator } from "Core/device-manager/validators"
const intervalTime = 3000

export class UsbDeviceAttachObserver implements Observer {
  constructor(private deviceManager: DeviceManager) {}

  public observe(): void {
    void this.watchConnectedDevices()
  }

  private async watchConnectedDevices(): Promise<void> {
    const devices = await this.deviceManager.getConnectedDevices()

    devices.forEach((device) => {
      const portInfo = {
        vendorId: device.vendorId,
        productId: device.productId,
      }
      if (PortInfoValidator.isVendorIdValid(portInfo)) {
        void this.deviceManager.addDevice(device)
      }
    })

    return new Promise((resolve) => {
      setTimeout(() => {
        void (async () => {
          resolve(await this.watchConnectedDevices())
        })()
      }, intervalTime)
    })
  }
}
