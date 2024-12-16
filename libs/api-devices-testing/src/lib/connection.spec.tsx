/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

// import { APIModule } from "device/feature"
// import { SystemUtilsModule } from "system-utils/feature"
// import { createSettingsService } from "Core/settings/containers"
import {
  DeviceProtocol,
  DeviceResolverService,
  SerialPortService,
} from "device-protocol/feature"
import { EventEmitter } from "events"
// import { Module } from "Core/core/types"
// import { callRenderer } from "shared/utils"

// import { getUsbDevices } from "Core/device-manager/services/usb-devices/usb-devices.helper"

jest.mock("shared/utils", () => {
  return { callRenderer: () => {} }
})
jest.mock("Core/device-manager/services/usb-devices/usb-devices.helper", () => {
  return { getUsbDevices: () => {} }
})

// import { render } from "@testing-library/react"

// import ApiDevicesTesting from "./api-devices-testing"

// createSettingsService()

// const apiModule = new APIModule(
//   deviceProtocol,
//   systemUtilsModule,
//   createSettingsService()
// )

// const initModule = (module: Module): void => {
//   const instance = new module(
//     this.index,
//     this.deviceProtocol,
//     this.keyStorage,
//     this.logger,
//     this.ipc,
//     this.eventEmitter,
//     this.fileSystem,
//     this.mainApplicationWindow
//   )

//   this.dataStorageInitializer.initialize(instance.models)
//   this.initializeInitializer.initialize(instance.initializers)
//   this.observerInitializer.initialize(instance.observers)
//   this.controllerInitializer.initialize(instance.controllers)
// }

describe("Connection", () => {
  it.each([{ vendorId: "0e8d", productId: "200a" }])(
    "should connect successfully",
    async ({ vendorId, productId }) => {
      // const detachedDevicePaths = Array.from(
      //   this.previousAttachedDevicePaths
      // ).filter(
      //   (previousAttachedDevicePath) =>
      //     !attachedDevices
      //       .map(({ path }) => path)
      //       .includes(previousAttachedDevicePath)
      // )

      const eventEmitter = new EventEmitter()

      const deviceProtocol = new DeviceProtocol(
        new SerialPortService(),
        new DeviceResolverService(),
        eventEmitter
      )
      expect(deviceProtocol.devices).toHaveLength(0)
      const attachedDevice = (await deviceProtocol.getAttachedDevices()).find(
        (port) => {
          return port.vendorId === vendorId && port.productId === productId
        }
      )

      expect(attachedDevice).toBeTruthy()
      if (attachedDevice === undefined) {
        return
      }

      await deviceProtocol.addDevice(attachedDevice)

      // console.log(attachedDevice)
      // console.log("deviceProtocol.activeDevice")
      // console.log(deviceProtocol.devices)
      expect(deviceProtocol.devices).toHaveLength(1)
    }
  )
})
