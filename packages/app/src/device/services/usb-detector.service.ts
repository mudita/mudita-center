/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import usb from "usb"
import { EventEmitter } from "events"
import { PortInfo } from "serialport"
// import log, { LogConfig } from "./logger/log-decorator"

type UsbDetectorPortInfo = Omit<PortInfo, "path">

enum UsbDetectorEventName {
  Attach = "Attach",
}

export class UsbDetector {
  private eventEmitter = new EventEmitter()

  constructor() {
    this.registerAttachDeviceEmitter()
  }

  public onAttachDevice(
    listener: (event: UsbDetectorPortInfo) => Promise<void> | void
  ): void {
    this.eventEmitter.on(UsbDetectorEventName.Attach, (event) => {
      void listener(event)
    })
  }

  public offAttachDevice(listener: (event: UsbDetectorPortInfo) => void): void {
    this.eventEmitter.off(UsbDetectorEventName.Attach, listener)
  }

  private registerAttachDeviceEmitter() {
    usb.on("attach", (device) => {
      const { idVendor, idProduct } = device.deviceDescriptor

      const portInfo = {
        vendorId: idVendor.toString(16).padStart(4, "0"),
        productId: idProduct.toString(16).padStart(4, "0"),
      }

      this.emitAttachedDeviceEvent(portInfo)
    })
  }

  // @log("==== usb detector: attached device ====", LogConfig.Args)
  private emitAttachedDeviceEvent(event: UsbDetectorPortInfo) {
    this.eventEmitter.emit(UsbDetectorEventName.Attach, event)
  }
}
