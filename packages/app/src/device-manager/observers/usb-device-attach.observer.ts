/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import usb from "usb"
import { Observer } from "App/core/types"
import { PortInfoValidator } from "App/device-manager/validators"
import { DeviceManager } from "App/device-manager/services"

export class UsbDeviceAttachObserver implements Observer {
  constructor(private deviceManager: DeviceManager) {}

  public observe(): void {
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    usb.on("attach", async (device) => {
      const { idVendor, idProduct } = device.deviceDescriptor

      const portInfo = {
        vendorId: idVendor.toString(16).padStart(4, "0"),
        productId: idProduct.toString(16).padStart(4, "0"),
      }

      if (PortInfoValidator.isVendorIdValid(portInfo)) {
        await this.deviceManager.addDevice(portInfo)
      }
    })
  }
}
