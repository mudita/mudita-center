/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { SerialPortDevice, SerialPortDeviceStatus } from "./serial-port-device"
import {
  SerialPortDeviceInfo,
  SerialPortDeviceType,
} from "app-serialport/models"
import { AppSerialportDeviceScanner } from "./app-serialport-device-scanner"
import {
  SerialPortHandler,
  SerialPortHandlerMock,
} from "app-serialport/devices"
import { waitFor } from "@testing-library/dom"
import { TimeoutError } from "p-queue"

Object.assign(window, {
  electron: {
    ipcRenderer: {
      invoke: jest.fn(),
    },
  },
})

const mockSerialPortHandler = jest.fn().mockImplementation((options) => {
  return new SerialPortHandlerMock(options)
})

jest.mock("./app-serialport-device-scanner", () => ({
  AppSerialportDeviceScanner: {
    getMatchingInstance: jest.fn(),
  },
}))

describe("SerialPortDevice", () => {
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

  beforeEach(() => {
    jest.clearAllMocks()
    jest.useFakeTimers()
    ;(
      AppSerialportDeviceScanner.getMatchingInstance as jest.Mock
    ).mockReturnValue(mockSerialPortHandler)
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  describe("constructor", () => {
    it("creates device with DeviceInitializing status", () => {
      const device = new SerialPortDevice(mockDeviceInfo)
      expect(device.status).toBe(SerialPortDeviceStatus.DeviceInitializing)
    })

    it("stores device info correctly", () => {
      const device = new SerialPortDevice(mockDeviceInfo)
      expect(device.info).toBe(mockDeviceInfo)
    })

    it("initializes requests queue", () => {
      const device = new SerialPortDevice(mockDeviceInfo)
      expect(device["requestsQueue"]).toBeDefined()
    })
  })

  describe("status transitions", () => {
    it("starts with DeviceInitializing status", () => {
      const device = new SerialPortDevice(mockDeviceInfo)
      expect(device.status).toBe(SerialPortDeviceStatus.DeviceInitializing)
    })

    it("transitions to DeviceConnected after initialization", async () => {
      const device = new SerialPortDevice(mockDeviceInfo)
      device.attachPort()

      await waitFor(() => {
        expect(device.status).toBe(SerialPortDeviceStatus.DeviceConnected)
      })
    })

    it("transitions to DeviceDisconnected when serial port closes", async () => {
      const device = new SerialPortDevice(mockDeviceInfo)
      device.attachPort()

      device["serialPort"]?.emit("close")

      await waitFor(() => {
        expect(device.status).toBe(SerialPortDeviceStatus.DeviceDisconnected)
      })
    })

    it("transitions to DeviceFrozen when serial port closes and device is freezable", async () => {
      const device = new SerialPortDevice(mockDeviceInfo)
      device.attachPort()
      device.prepareToFreeze(5000)

      device["serialPort"]?.emit("close")

      await waitFor(() => {
        expect(device.status).toBe(SerialPortDeviceStatus.DeviceFrozen)
        expect(device.isFrozen()).toBe(true)
      })
    })

    it("transitions to DeviceDisconnected when freeze timeout expires", async () => {
      const device = new SerialPortDevice(mockDeviceInfo)
      device.attachPort()
      device.prepareToFreeze(5000)

      device["serialPort"]?.emit("close")

      expect(device.status).toBe(SerialPortDeviceStatus.DeviceFrozen)
      expect(device.isFrozen()).toBe(true)

      jest.advanceTimersByTime(5000)

      await waitFor(() => {
        expect(device.status).toBe(SerialPortDeviceStatus.DeviceDisconnected)
      })
    })

    it("transitions from DeviceConnected to DeviceActive when activate is called", async () => {
      const device = new SerialPortDevice(mockDeviceInfo)
      device.attachPort()

      await waitFor(() => {
        expect(device.status).toBe(SerialPortDeviceStatus.DeviceConnected)
      })

      device.activate()

      await waitFor(() => {
        expect(device.status).toBe(SerialPortDeviceStatus.DeviceActive)
      })
    })

    it("does not transition to DeviceActive when activate is called while device is not connected", async () => {
      const device = new SerialPortDevice(mockDeviceInfo)
      device.activate()

      await waitFor(() => {
        expect(device.status).not.toBe(SerialPortDeviceStatus.DeviceActive)
      })
    })
  })

  describe("listeners", () => {
    it("calls onConnect callback after initialization", async () => {
      const onConnect = jest.fn()
      const device = new SerialPortDevice(mockDeviceInfo, { onConnect })
      device.attachPort()

      await waitFor(() => {
        expect(onConnect).toHaveBeenCalledTimes(1)
      })
    })

    it("does not call onConnect callback during reinitialization", async () => {
      const onConnect = jest.fn()
      const device = new SerialPortDevice(mockDeviceInfo, { onConnect })
      device.attachPort()

      await waitFor(() => {
        expect(onConnect).toHaveBeenCalledTimes(1)
      })

      device.attachPort()

      await waitFor(() => {
        expect(onConnect).toHaveBeenCalledTimes(1)
      })
    })

    it("does not call onConnect again when port is reattached after freeze", async () => {
      const onConnect = jest.fn()
      const device = new SerialPortDevice(mockDeviceInfo, { onConnect })

      device.attachPort()

      await waitFor(() => {
        expect(onConnect).toHaveBeenCalledTimes(1)
      })

      device.prepareToFreeze(5000)
      device["serialPort"]?.emit("close")

      expect(device.status).toBe(SerialPortDeviceStatus.DeviceFrozen)
      expect(device.isFrozen()).toBe(true)

      device.attachPort({ ...mockDeviceInfo, path: "/dev/ttyUSB1" })

      await waitFor(() => {
        expect(onConnect).toHaveBeenCalledTimes(1)
      })
    })

    it("calls onDisconnect callback when serial port closes and device is not freezable", async () => {
      const onDisconnect = jest.fn()
      const device = new SerialPortDevice(mockDeviceInfo, { onDisconnect })
      device.attachPort()

      device["serialPort"]?.emit("close")

      await waitFor(() => {
        expect(onDisconnect).toHaveBeenCalledTimes(1)
      })
    })

    it("calls onDisconnect callback when freeze timeout expires", async () => {
      const onDisconnect = jest.fn()
      const device = new SerialPortDevice(mockDeviceInfo, { onDisconnect })
      device.attachPort()
      device.prepareToFreeze(5000)

      device["serialPort"]?.emit("close")

      expect(device.status).toBe(SerialPortDeviceStatus.DeviceFrozen)
      expect(device.isFrozen()).toBe(true)

      jest.advanceTimersByTime(5000)

      await waitFor(() => {
        expect(onDisconnect).toHaveBeenCalledTimes(1)
      })
    })
  })

  describe("port handling", () => {
    it("replaces serial port instance on attachPort with new path", () => {
      const device = new SerialPortDevice(mockDeviceInfo)
      device.attachPort()

      const oldPort = device["serialPort"]

      const newInfo = { ...mockDeviceInfo, path: "/dev/ttyUSB1" }
      device.attachPort(newInfo)

      expect(device["serialPort"]).not.toBe(oldPort)
      expect(device.info.path).toBe("/dev/ttyUSB1")
    })

    it("ignores events from detached serial port", async () => {
      const device = new SerialPortDevice(mockDeviceInfo)
      device.attachPort()

      const oldPort = device["serialPort"]

      device.attachPort({ ...mockDeviceInfo, path: "/dev/ttyUSB1" })

      oldPort?.emit("close")

      await waitFor(() => {
        expect(device.status).not.toBe(
          SerialPortDeviceStatus.DeviceDisconnected
        )
      })
    })

    it("calls onDisconnect only once", async () => {
      const onDisconnect = jest.fn()
      const device = new SerialPortDevice(mockDeviceInfo, { onDisconnect })
      device.attachPort()

      device["serialPort"]?.emit("close")
      device["serialPort"]?.emit("close")

      await waitFor(() => {
        expect(onDisconnect).toHaveBeenCalledTimes(1)
      })
    })

    it("does not disconnect immediately on open error if retries remain", () => {
      const device = new SerialPortDevice(mockDeviceInfo)
      device.attachPort(undefined, 1)

      device["serialPort"]?.emit("error", new Error("open failed"))

      expect(device.status).not.toBe(SerialPortDeviceStatus.DeviceDisconnected)
    })

    it("disconnects device on open error when no retries remain", async () => {
      const onDisconnect = jest.fn()
      const device = new SerialPortDevice(mockDeviceInfo, { onDisconnect })
      device.attachPort(undefined, 0)

      device["serialPort"]?.emit("error", new Error("open failed"))

      await waitFor(() => {
        expect(onDisconnect).toHaveBeenCalledTimes(1)
      })
    })

    it("flushes the serial port after opening", async () => {
      const device = new SerialPortDevice(mockDeviceInfo)
      device.attachPort()

      await waitFor(() => {
        expect(device["serialPort"]).toBeDefined()
      })

      const mockFlush = jest.spyOn(
        device["serialPort"] as SerialPortHandler,
        "flush"
      )

      await waitFor(() => {
        expect(mockFlush).toHaveBeenCalled()
      })
    })

    it("destroy closes the serial port and cleans up resources", async () => {
      const device = new SerialPortDevice(mockDeviceInfo)
      device.attachPort()

      const detachSpy = jest.fn()
      device["detachPort"] = detachSpy

      const clearQueueSpy = jest.spyOn(device["requestsQueue"], "clear")
      const freezeHandlerCleanupSpy = jest.spyOn(device["freezeHandler"], "off")

      device.destroy()

      await waitFor(() => {
        expect(clearQueueSpy).toHaveBeenCalled()
        expect(device.status).toBe(SerialPortDeviceStatus.DeviceDisconnected)
        expect(freezeHandlerCleanupSpy).toHaveBeenCalledWith()
        expect(detachSpy).toHaveBeenCalled()
        expect(device.status).toBe(SerialPortDeviceStatus.DeviceDisconnected)
      })
    })
  })

  describe("queue handling", () => {
    it("queues requests properly", () => {
      const device = new SerialPortDevice(mockDeviceInfo)

      device.request({ endpoint: 1 })
      device.request({ endpoint: 2 })
      device.request({ endpoint: 3 })

      expect(device["requestsQueue"].add).toHaveBeenCalledTimes(3)
    })

    it("starts the queue when serial port is initialized", async () => {
      const device = new SerialPortDevice(mockDeviceInfo)
      device.attachPort()

      await waitFor(() => {
        expect(device["requestsQueue"].start).toHaveBeenCalled()
      })
    })

    it("does not start the queue before serial port is initialized", async () => {
      const device = new SerialPortDevice(mockDeviceInfo)

      await waitFor(() => {
        expect(device["requestsQueue"].start).not.toHaveBeenCalled()
      })
    })

    it("pauses the queue when device is frozen", async () => {
      const device = new SerialPortDevice(mockDeviceInfo)
      device.attachPort()
      device.prepareToFreeze(5000)
      device["serialPort"]?.emit("close")

      await waitFor(() => {
        expect(device["requestsQueue"].pause).toHaveBeenCalled()
      })
    })

    it("clears the queue when device is disconnected", async () => {
      const device = new SerialPortDevice(mockDeviceInfo)
      device.attachPort()
      device["serialPort"]?.emit("close")

      await waitFor(() => {
        expect(device["requestsQueue"].clear).toHaveBeenCalled()
      })
    })

    it("clears the queue when device is destroyed", async () => {
      const device = new SerialPortDevice(mockDeviceInfo)
      device.destroy()

      await waitFor(() => {
        expect(device["requestsQueue"].clear).toHaveBeenCalled()
      })
    })

    it("aborts current request when device is destroyed", async () => {
      const device = new SerialPortDevice(mockDeviceInfo)
      device.attachPort()

      const abortSpy = jest.spyOn(
        device["requestsQueueAbortController"],
        "abort"
      )

      void device.request({ endpoint: 1 })
      device.destroy()

      await waitFor(() => {
        expect(abortSpy).toHaveBeenCalled()
      })
    })
  })

  describe("error handling", () => {
    it("throws error when instance is not found", () => {
      ;(
        AppSerialportDeviceScanner.getMatchingInstance as jest.Mock
      ).mockReturnValue(undefined)

      expect(() => new SerialPortDevice(mockDeviceInfo)).toThrow(
        "No matching instance found for device at path /dev/ttyUSB0."
      )
    })

    it("adds failed request back to the queue with higher priority if it failed due to device being frozen", async () => {
      const device = new SerialPortDevice(mockDeviceInfo)
      device.attachPort()
      device.prepareToFreeze(5000)
      device["serialPort"]?.emit("close")

      jest.spyOn(device["requestsQueue"], "add").mockImplementationOnce(() => {
        throw new Error("Device is frozen")
      })

      void device.request({ endpoint: 1 })

      await waitFor(() => {
        expect(device["requestsQueue"].add).toHaveBeenCalledTimes(2)
        expect(device["requestsQueue"].add).toHaveBeenNthCalledWith(
          2,
          expect.any(Function),
          { priority: 2, signal: expect.any(AbortSignal) }
        )
      })
    })

    it("reattaches port and retries request once when timeout occurs and retries are exhausted", async () => {
      const device = new SerialPortDevice(mockDeviceInfo)
      const attachPortSpy = jest.spyOn(device, "attachPort")

      device.attachPort()
      await waitFor(() => {
        expect(device.status).toBe(SerialPortDeviceStatus.DeviceConnected)
      })

      jest
        .spyOn(device["requestsQueue"], "add")
        .mockRejectedValueOnce(new TimeoutError("Request timed out"))
        .mockResolvedValueOnce({ ok: true })

      const requestPromise = device.request({ endpoint: 1 })

      await jest.advanceTimersByTimeAsync(1000)

      await expect(requestPromise).resolves.toEqual({ ok: true })
      expect(attachPortSpy).toHaveBeenCalledTimes(2)
      expect(device["requestsQueue"].add).toHaveBeenCalledTimes(2)
      expect(device["requestsQueue"].add).toHaveBeenNthCalledWith(
        2,
        expect.any(Function),
        { priority: 2, signal: expect.any(AbortSignal) }
      )
    })

    it("throws error when request still fails after reattach attempt", async () => {
      const device = new SerialPortDevice(mockDeviceInfo)
      const attachPortSpy = jest.spyOn(device, "attachPort")

      device.attachPort()
      await waitFor(() => {
        expect(device.status).toBe(SerialPortDeviceStatus.DeviceConnected)
      })

      jest
        .spyOn(device["requestsQueue"], "add")
        .mockRejectedValueOnce(new TimeoutError("Initial timeout"))
        .mockRejectedValueOnce(new TimeoutError("Still timed out after reattach"))

      const requestPromise = device.request({ endpoint: 1 })
      const requestExpectation = expect(requestPromise).rejects.toThrow(
        "Still timed out after reattach"
      )

      await jest.advanceTimersByTimeAsync(1000)

      await requestExpectation
      expect(attachPortSpy).toHaveBeenCalledTimes(2)
      expect(device["requestsQueue"].add).toHaveBeenCalledTimes(2)
    })

    it("throws error when request fails from reason other than device being frozen", async () => {
      const device = new SerialPortDevice(mockDeviceInfo)
      device.attachPort()

      jest.useRealTimers()
      jest
        .spyOn(device["requestsQueue"], "add")
        .mockRejectedValueOnce(new Error("Some other error"))

      await expect(device.request({ endpoint: 1 })).rejects.toThrow(
        "Some other error"
      )
    }, 10_000)
  })
})
