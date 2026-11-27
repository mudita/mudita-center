/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  SerialPortDeviceInfo,
  SerialPortDeviceType,
} from "app-serialport/models"
import { AppSerialPortService } from "./app-serial-port-service"
import { AppSerialportDeviceScanner } from "./app-serialport-device-scanner"
import { SerialPortDevice } from "./serial-port-device"
import { usb } from "usb"

jest.mock("usb", () => ({
  usb: {
    on: jest.fn(),
    off: jest.fn(),
  },
}))

jest.mock("./app-serialport-device-scanner", () => ({
  AppSerialportDeviceScanner: {
    scan: jest.fn(),
  },
}))

jest.mock("./serial-port-device", () => ({
  __esModule: true,
  SerialPortDeviceStatus: {
    DeviceInitializing: "DeviceInitializing",
    DeviceConnected: "DeviceConnected",
    DeviceActive: "DeviceActive",
    DeviceFrozen: "DeviceFrozen",
    DeviceDisconnected: "DeviceDisconnected",
  },
  SerialPortDevice: jest.fn(),
}))

interface DeviceOptions {
  onConnect?: VoidFunction
  onDisconnect?: VoidFunction
  onOpenRetriesExhausted?: (error: Error) => void
}

interface MockDevice {
  info: SerialPortDeviceInfo
  status: string
  attachPort: jest.Mock
  destroy: jest.Mock
  unfreeze: jest.Mock
  isFrozen: jest.Mock
  activate: jest.Mock
}

describe("AppSerialPortService", () => {
  const mockDeviceInfo: SerialPortDeviceInfo = {
    id: "device-123",
    path: "/dev/ttyUSB0",
    vendorId: "1234",
    productId: "5678",
    deviceType: "APIDevice" as SerialPortDeviceType,
    manufacturer: "Test Manufacturer",
    serialNumber: "SN12345",
    pnpId: "USB\\VID_1234&PID_5678\\SN12345",
    locationId: "1-1",
  }

  const scanMock = AppSerialportDeviceScanner.scan as jest.Mock
  const deviceMock = SerialPortDevice as unknown as jest.Mock

  let deviceOptions: DeviceOptions
  let devices: MockDevice[] = []

  beforeEach(() => {
    jest.clearAllMocks()
    jest.useFakeTimers()

    devices = []
    scanMock.mockResolvedValue([mockDeviceInfo])
    deviceMock.mockImplementation(
      (info: SerialPortDeviceInfo, options: DeviceOptions) => {
        deviceOptions = options
        const device: MockDevice = {
          info,
          status: "DeviceInitializing",
          attachPort: jest.fn(),
          destroy: jest.fn(),
          unfreeze: jest.fn(),
          isFrozen: jest.fn().mockReturnValue(false),
          // The real device transitions on activation, and the service reads
          // the status again afterwards to decide what belongs in `all`.
          activate: jest.fn(() => {
            device.status = "DeviceActive"
          }),
        }
        devices.push(device)
        return device
      }
    )
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  const createService = async () => {
    const service = new AppSerialPortService()
    // Let the scan started by the constructor resolve and register the device.
    await jest.advanceTimersByTimeAsync(0)
    return service
  }

  describe("device change notifications", () => {
    const notifyDevicesChanged = async () => {
      deviceOptions.onConnect?.()
      await jest.advanceTimersByTimeAsync(1_000)
    }

    const triggerUsbAttach = async () => {
      const attach = (usb.on as jest.Mock).mock.calls.find(
        ([event]) => event === "attach"
      )
      attach?.[1]()
      await jest.advanceTimersByTimeAsync(0)
    }

    it("activates a connected device and reports it in the list", async () => {
      const service = await createService()
      const changed = jest.fn()
      service.onDevicesChanged(changed)

      devices[0].status = "DeviceConnected"
      await notifyDevicesChanged()

      expect(devices[0].activate).toHaveBeenCalledTimes(1)
      expect(changed).toHaveBeenCalledWith({
        all: [mockDeviceInfo],
        // Nothing was plugged in - this is what was already there at
        // startup, and announcing it as new pops the device drawer open.
        added: [],
        removed: [],
      })
    })

    it("reports a device as added once the first scan is behind it", async () => {
      const service = await createService()
      const changed = jest.fn()
      service.onDevicesChanged(changed)

      await triggerUsbAttach()

      devices[0].status = "DeviceConnected"
      await notifyDevicesChanged()

      expect(changed).toHaveBeenCalledWith({
        all: [mockDeviceInfo],
        added: [mockDeviceInfo],
        removed: [],
      })
    })

    it("destroys a disconnected device and forgets it", async () => {
      const service = await createService()
      const changed = jest.fn()
      service.onDevicesChanged(changed)

      devices[0].status = "DeviceDisconnected"
      await notifyDevicesChanged()

      expect(devices[0].destroy).toHaveBeenCalledTimes(1)
      expect(changed).toHaveBeenCalledWith({
        all: [],
        added: [],
        removed: [mockDeviceInfo],
      })
      expect(service.getCurrentDevices()).toEqual([])
    })

    it("leaves a frozen device in the list", async () => {
      const service = await createService()
      const changed = jest.fn()
      service.onDevicesChanged(changed)

      // A frozen device is one the app is waiting on, not one that left.
      devices[0].status = "DeviceFrozen"
      await notifyDevicesChanged()

      expect(devices[0].destroy).not.toHaveBeenCalled()
      expect(changed).toHaveBeenCalledWith({
        all: [mockDeviceInfo],
        added: [],
        removed: [],
      })
    })
  })

  describe("device visibility", () => {
    it("keeps the devices the renderer has no business seeing out of the list", async () => {
      const service = await createService()

      // Straight out of the scan: the port is not open yet, so the device
      // cannot answer anything and does not belong in the UI.
      expect(service.getVisibleDevices()).toEqual([])
      expect(service.getCurrentDevices()).toHaveLength(1)

      devices[0].status = "DeviceActive"
      expect(service.getVisibleDevices()).toEqual([mockDeviceInfo])

      devices[0].status = "DeviceDisconnected"
      expect(service.getVisibleDevices()).toEqual([])
    })

    it("says it does not know a device it never held", async () => {
      const service = await createService()

      // Not `false`: answering "not frozen" for a device that is gone is
      // what leaves a caller waiting for a freeze that can never arrive.
      expect(service.isFrozen("no-such-device")).toBeUndefined()
    })

    it("passes on the answer of a device it does hold", async () => {
      const service = await createService()

      devices[0].isFrozen.mockReturnValue(true)
      expect(service.isFrozen(mockDeviceInfo.id)).toBe(true)

      devices[0].isFrozen.mockReturnValue(false)
      expect(service.isFrozen(mockDeviceInfo.id)).toBe(false)
    })
  })

  describe("rescan scheduling", () => {
    it("schedules a rescan when a device disconnects", async () => {
      await createService()
      const scansBefore = scanMock.mock.calls.length

      deviceOptions.onDisconnect?.()
      await jest.advanceTimersByTimeAsync(1_500)

      expect(scanMock.mock.calls.length).toBe(scansBefore + 1)
    })

    it("schedules only one rescan when a device exhausts its open retries", async () => {
      await createService()
      const scansBefore = scanMock.mock.calls.length

      // `SerialPortDevice.handleError` fires both of these, in this order, when it
      // runs out of open attempts. Only one of them may own rescan scheduling: a
      // second scheduler clears the first timer and advances the backoff twice.
      deviceOptions.onOpenRetriesExhausted?.(new Error("open failed"))
      deviceOptions.onDisconnect?.()

      await jest.advanceTimersByTimeAsync(1_500)

      expect(scanMock.mock.calls.length).toBe(scansBefore + 1)
    })

    it("backs off exponentially across repeated disconnects", async () => {
      await createService()

      deviceOptions.onDisconnect?.()
      await jest.advanceTimersByTimeAsync(1_500)
      const scansAfterFirst = scanMock.mock.calls.length

      deviceOptions.onDisconnect?.()
      await jest.advanceTimersByTimeAsync(1_500)
      expect(scanMock.mock.calls.length).toBe(scansAfterFirst)

      await jest.advanceTimersByTimeAsync(1_500)
      expect(scanMock.mock.calls.length).toBe(scansAfterFirst + 1)
    })

    it("resets the backoff once a device connects", async () => {
      await createService()

      deviceOptions.onDisconnect?.()
      await jest.advanceTimersByTimeAsync(1_500)

      deviceOptions.onConnect?.()

      deviceOptions.onDisconnect?.()
      const scansBefore = scanMock.mock.calls.length
      await jest.advanceTimersByTimeAsync(1_500)

      expect(scanMock.mock.calls.length).toBe(scansBefore + 1)
    })
  })
})
