/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Observer } from "Core/core/types"
import { ipcMain } from "electron-better-ipc"
import { ApiSerialPortToRendererEvents } from "device/models"
import { SerialPortDeviceAdapterEvent } from "Core/device/modules/mudita-os/adapters"
import { DeviceProtocol } from "../services"

const intervalTime = 3000

export class UsbDeviceDetectionObserver implements Observer {
  private previousAttachedDevicePaths = new Set<string>()
  constructor(private deviceProtocol: DeviceProtocol) {}

  public observe(): void {
    void this.watchAttachedDevices()
    this.mountListeners()
  }

  private async watchAttachedDevices(): Promise<void> {
    await this.detectDeviceStateChange()

    return new Promise<void>((resolve) => {
      setTimeout(() => {
        void (async () => {
          resolve(await this.watchAttachedDevices())
        })()
      }, intervalTime)
    })
  }

  private mountListeners() {
    ipcMain.on(ApiSerialPortToRendererEvents.Closed, () => {
      void this.detectDeviceStateChange()
    })
    ipcMain.on(SerialPortDeviceAdapterEvent.Closed, () => {
      void this.detectDeviceStateChange()
    })
  }

  private async detectDeviceStateChange(): Promise<void> {
    const attachedDevices = await this.deviceProtocol.getAttachedDevices()
    const detachedDevicePaths = Array.from(
      this.previousAttachedDevicePaths
    ).filter(
      (previousAttachedDevicePath) =>
        !attachedDevices
          .map(({ path }) => path)
          .includes(previousAttachedDevicePath)
    )

    detachedDevicePaths.forEach((detachedDevicePath) => {
      void this.deviceProtocol.removeDevice(detachedDevicePath)
    })

    attachedDevices.forEach((attachedDevice) => {
      if (!this.previousAttachedDevicePaths.has(attachedDevice.path)) {
        void this.deviceProtocol.addDevice(attachedDevice)
      }
    })

    this.previousAttachedDevicePaths = new Set(
      attachedDevices.map(({ path }) => path)
    )
  }
}
