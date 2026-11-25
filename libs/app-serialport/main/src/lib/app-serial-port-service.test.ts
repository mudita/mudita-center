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

  beforeEach(() => {
    jest.clearAllMocks()
    jest.useFakeTimers()

    scanMock.mockResolvedValue([mockDeviceInfo])
    deviceMock.mockImplementation(
      (info: SerialPortDeviceInfo, options: DeviceOptions) => {
        deviceOptions = options
        return {
          info,
          status: "DeviceInitializing",
          attachPort: jest.fn(),
          destroy: jest.fn(),
          unfreeze: jest.fn(),
          isFrozen: jest.fn().mockReturnValue(false),
        }
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
