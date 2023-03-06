/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcMain } from "electron-better-ipc"
import { EventEmitter } from "events"
import { Result } from "App/core/builder"
import { AppError } from "App/core/errors"
import { ProductID, VendorID, DeviceType } from "App/device/constants"
import { DeviceFactory } from "App/device/factories"
import { PureStrategy } from "App/device/strategies"
import { SerialPortDeviceAdapter } from "App/device/modules/mudita-os/adapters/serial-port-device.adapters"
import { DeviceManagerError } from "App/device-manager/constants"
import { DeviceManager } from "App/device-manager/services/device-manager.service"
import { DeviceResolverService } from "App/device-manager/services/device-resolver.service"

jest.spyOn(global, "setTimeout").mockImplementation(
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (callback: (args: void) => void, _ms?: number | undefined): any => {
    callback()
  }
)

const eventEmitter = new EventEmitter()
const deviceMockOne = DeviceFactory.create(
  "/dev/123",
  DeviceType.MuditaPure,
  class Adapter {
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    on() {}
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    off() {}
  } as unknown as typeof SerialPortDeviceAdapter,
  class Strategy {
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    on() {}
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    off() {}
  } as unknown as typeof PureStrategy,
  ipcMain,
  eventEmitter
)
const deviceMockTwo = DeviceFactory.create(
  "/dev/321",
  DeviceType.MuditaHarmony,
  class Adapter {
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    on() {}
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    off() {}
  } as unknown as typeof SerialPortDeviceAdapter,
  class Strategy {
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    on() {}
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    off() {}
  } as unknown as typeof PureStrategy,
  ipcMain,
  eventEmitter
)
const deviceResolver = {
  resolve: jest.fn().mockReturnValue(deviceMockOne),
} as unknown as DeviceResolverService

describe("Method: addDevice", () => {
  test("Adding new device to device map and setup current device if port info is valid", async () => {
    jest
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .spyOn(DeviceManager.prototype as any, "getSerialPortList")
      .mockReturnValueOnce([
        {
          productId: ProductID.MuditaPure,
          vendorId: VendorID.MuditaPure,
        },
      ])

    const subject = new DeviceManager(deviceResolver, ipcMain)

    expect(() => subject.device).toThrow(
      new AppError(
        DeviceManagerError.NoCurrentDevice,
        "Current device is undefined"
      )
    )
    expect(subject.devices).toEqual([])

    await subject.addDevice({
      vendorId: "3310",
      productId: "0100",
    })

    expect(subject.device).toEqual(deviceMockOne)
    expect(subject.devices).toEqual([deviceMockOne])
  })

  test("Don't set current device is port info is referred to unknown device", () => {
    jest
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .spyOn(DeviceManager.prototype as any, "getSerialPortList")
      .mockReturnValueOnce([
        {
          productId: ProductID.MuditaPure,
          vendorId: VendorID.MuditaPure,
        },
      ])

    const subject = new DeviceManager(deviceResolver, ipcMain)

    expect(() => subject.device).toThrow(
      new AppError(
        DeviceManagerError.NoCurrentDevice,
        "Current device is undefined"
      )
    )
    expect(subject.devices).toEqual([])
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    expect(
      async () =>
        await subject.addDevice({
          vendorId: "0000",
          productId: "0000",
        })
    ).rejects.toThrow(
      new AppError(
        DeviceManagerError.CannotInitializeDeviceObject,
        "Cannot initialize device object for 0000"
      )
    )

    expect(() => subject.device).toThrow(
      new AppError(
        DeviceManagerError.NoCurrentDevice,
        "Current device is undefined"
      )
    )
    expect(subject.devices).toEqual([])
  })
})

describe("Method: removeDevice", () => {
  test("Executing method removes device from device map and current device", () => {
    const subject = new DeviceManager(deviceResolver, ipcMain)
    subject.devicesMap.set(deviceMockOne.path, deviceMockOne)
    subject.currentDevice = deviceMockOne

    expect(subject.device).toEqual(deviceMockOne)
    expect(subject.devices).toEqual([deviceMockOne])

    subject.removeDevice(deviceMockOne.path)

    expect(() => subject.device).toThrow(
      new AppError(
        DeviceManagerError.NoCurrentDevice,
        "Current device is undefined"
      )
    )
    expect(subject.devices).toEqual([])
  })

  test("Executing method removes device from device map and set current device next current device if available", () => {
    const subject = new DeviceManager(deviceResolver, ipcMain)
    subject.devicesMap.set(deviceMockOne.path, deviceMockOne)
    subject.devicesMap.set(deviceMockTwo.path, deviceMockTwo)
    subject.currentDevice = deviceMockOne

    expect(subject.device).toEqual(deviceMockOne)
    expect(subject.devices).toEqual([deviceMockOne, deviceMockTwo])

    subject.removeDevice(deviceMockOne.path)

    expect(subject.device).toEqual(deviceMockTwo)
    expect(subject.devices).toEqual([deviceMockTwo])
  })
})

describe("Method: setCurrentDevice", () => {
  test("Changing current device to new one by provided path", () => {
    const subject = new DeviceManager(deviceResolver, ipcMain)
    subject.devicesMap.set(deviceMockOne.path, deviceMockOne)
    subject.devicesMap.set(deviceMockTwo.path, deviceMockTwo)
    subject.currentDevice = deviceMockOne

    expect(subject.device).toEqual(deviceMockOne)
    expect(subject.setCurrentDevice(deviceMockTwo.path)).toEqual(
      Result.success(true)
    )
    expect(subject.device).toEqual(deviceMockTwo)
  })

  test("Return Result.failed if provided path doesn't exist", () => {
    const subject = new DeviceManager(deviceResolver, ipcMain)
    subject.devicesMap.set(deviceMockOne.path, deviceMockOne)
    subject.devicesMap.set(deviceMockTwo.path, deviceMockTwo)
    subject.currentDevice = deviceMockOne

    expect(subject.device).toEqual(deviceMockOne)
    expect(subject.setCurrentDevice("/dev/0000")).toEqual(
      Result.failed(
        new AppError(
          DeviceManagerError.CannotFindDevice,
          "Device /dev/0000 can't be found"
        )
      )
    )
  })
})
