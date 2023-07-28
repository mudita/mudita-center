/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Observer } from "App/core/types"
import { DeviceManager } from "App/device-manager/services"
import logger from "App/__deprecated__/main/utils/logger"
import { PortInfoValidator } from "App/device-manager/validators"
const outboxTime = 20000

export class UsbDeviceAttachObserver implements Observer {
  constructor(private deviceManager: DeviceManager) {}

  public observe(): void {
    void this.watchConnectedDevices()
  }

  private async watchConnectedDevices(): Promise<void> {
    logger.info("UsbDeviceAttachObserver watchConnectedDevices")
    const devices = await this.deviceManager.getConnectedDevices()
    logger.info(
      `UsbDeviceAttachObserver watchConnectedDevices devices.length: ${devices.length}`
    )

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
      }, outboxTime)
    })
  }
}
