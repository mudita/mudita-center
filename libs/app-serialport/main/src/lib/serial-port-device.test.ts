/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { SerialPortDevice, SerialPortDeviceStatus } from "./serial-port-device"
import {
  SerialPortDeviceInfo,
  SerialPortDeviceType,
  SerialPortErrorType,
} from "app-serialport/models"
import { SerialPortError } from "app-serialport/utils"
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

jest.mock("usb", () => {
  return {
    usb: {
      on: jest.fn(),
      off: jest.fn(),
    },
  }
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
    it("replaces serial port instance on attachPort with new path", async () => {
      const device = new SerialPortDevice(mockDeviceInfo)
      device.attachPort()

      const oldPort = device["serialPort"]

      const newInfo = { ...mockDeviceInfo, path: "/dev/ttyUSB1" }
      device.attachPort(newInfo)

      // The old handle is released first, so the new port only appears once
      // that close has settled.
      await waitFor(() => {
        expect(device["serialPort"]?.path).toBe("/dev/ttyUSB1")
      })
      expect(device["serialPort"]).not.toBe(oldPort)
      expect(device.info.path).toBe("/dev/ttyUSB1")
    })

    const holdPortOpen = (port: SerialPortHandler) => {
      jest.spyOn(port, "isOpen", "get").mockReturnValue(true)
      return jest.spyOn(port, "close").mockImplementation(() => undefined)
    }

    it("does not open the new port while the old one is still closing", async () => {
      const device = new SerialPortDevice(mockDeviceInfo)
      device.attachPort()

      const close = holdPortOpen(device["serialPort"] as SerialPortHandler)

      device.attachPort({ ...mockDeviceInfo, path: "/dev/ttyUSB1" })
      await jest.advanceTimersByTimeAsync(0)

      // Opening the path while the previous handle still holds it is what
      // Windows answers with "access denied" or "unknown error code 433".
      expect(close).toHaveBeenCalled()
      expect(device["serialPort"]).toBeUndefined()
    })

    it("opens the new port anyway when the old one never reports closed", async () => {
      const device = new SerialPortDevice(mockDeviceInfo)
      device.attachPort()

      const oldPort = device["serialPort"] as SerialPortHandler
      holdPortOpen(oldPort)
      const cleanup = jest.spyOn(oldPort, "cleanup")

      device.attachPort({ ...mockDeviceInfo, path: "/dev/ttyUSB1" })
      await jest.advanceTimersByTimeAsync(2000)

      // A handle that never calls its close callback must not block the path
      // for good - the wait is bounded and the device moves on.
      expect(device["serialPort"]?.path).toBe("/dev/ttyUSB1")
      expect(cleanup).toHaveBeenCalled()
    })

    it("releases a port whose close throws", async () => {
      const device = new SerialPortDevice(mockDeviceInfo)
      device.attachPort()

      const oldPort = device["serialPort"] as SerialPortHandler
      jest.spyOn(oldPort, "isOpen", "get").mockReturnValue(true)
      jest.spyOn(oldPort, "close").mockImplementation(() => {
        throw new Error("Port is not open")
      })
      const cleanup = jest.spyOn(oldPort, "cleanup")

      device.attachPort({ ...mockDeviceInfo, path: "/dev/ttyUSB1" })

      await waitFor(() => {
        expect(device["serialPort"]?.path).toBe("/dev/ttyUSB1")
      })
      expect(cleanup).toHaveBeenCalled()
    })

    it("waits for a pending close even once the port field is clear", async () => {
      const device = new SerialPortDevice(mockDeviceInfo)
      device.attachPort()

      const close = holdPortOpen(device["serialPort"] as SerialPortHandler)

      // The first reattach clears `serialPort` and leaves the close running.
      device.attachPort()
      await jest.advanceTimersByTimeAsync(0)
      expect(close).toHaveBeenCalledTimes(1)

      // A second one arriving in that window sees no port at all. Taking
      // that for "nothing holds the path" reopens it from under the handle
      // that is still closing on it - the access-denied race again.
      device.attachPort()
      await jest.advanceTimersByTimeAsync(0)

      expect(device["serialPort"]).toBeUndefined()

      await jest.advanceTimersByTimeAsync(2000)
      expect(device["serialPort"]).toBeDefined()
    })

    it("does not open a port for an attach that destroy has overtaken", async () => {
      const device = new SerialPortDevice(mockDeviceInfo)
      device.attachPort()

      holdPortOpen(device["serialPort"] as SerialPortHandler)

      device.attachPort()
      device.destroy()

      await jest.advanceTimersByTimeAsync(2000)

      // The close lands after the device is gone. Letting its continuation
      // through would open a port that nothing will ever close again.
      expect(device["serialPort"]).toBeUndefined()
      expect(device.status).toBe(SerialPortDeviceStatus.DeviceDisconnected)
    })

    it("ignores a close that lands after the device was destroyed", async () => {
      const device = new SerialPortDevice(mockDeviceInfo)
      device.attachPort()
      device["freezeHandler"].prepareToFreeze(5000)

      const port = device["serialPort"] as SerialPortHandler
      device.destroy()
      port.emit("close")

      await jest.advanceTimersByTimeAsync(2000)

      // `destroy` only unhooks the freeze handler's listeners, so a close
      // still reaching `handleClose` would freeze a device that is already
      // gone, and leave the freeze timeout running behind it.
      expect(device["freezeHandler"].isFrozen).toBe(false)
      expect(device.status).toBe(SerialPortDeviceStatus.DeviceDisconnected)
    })

    it("drops a port replacement that a newer attach superseded", async () => {
      const device = new SerialPortDevice(mockDeviceInfo)
      device.attachPort()

      device.attachPort({ ...mockDeviceInfo, path: "/dev/ttyUSB1" })
      device.attachPort({ ...mockDeviceInfo, path: "/dev/ttyUSB2" })

      await jest.advanceTimersByTimeAsync(2000)

      // The first replacement finishes closing after the second has already
      // opened its port. Carrying on would leave the device on a path that
      // nothing asked for any more.
      expect(device["serialPort"]?.path).toBe("/dev/ttyUSB2")
    })

    it("destroys a device that has no port to detach", async () => {
      const device = new SerialPortDevice(mockDeviceInfo)
      device.attachPort()

      device.destroy()
      await jest.advanceTimersByTimeAsync(2000)

      expect(() => device.destroy()).not.toThrow()
      expect(device["serialPort"]).toBeUndefined()
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

    it("reattaches with decremented attempts when open error occurs and retries remain", async () => {
      const device = new SerialPortDevice(mockDeviceInfo)
      const attachPortSpy = jest.spyOn(device, "attachPort")
      device.attachPort(undefined, 1)

      device["serialPort"]?.emit("error", new Error("open failed"))
      await jest.advanceTimersByTimeAsync(1000)

      expect(attachPortSpy).toHaveBeenCalledTimes(2)
      expect(attachPortSpy).toHaveBeenNthCalledWith(2, mockDeviceInfo, 0)
    })

    it("does not retry opening port after device is destroyed", async () => {
      const device = new SerialPortDevice(mockDeviceInfo)
      const attachPortSpy = jest.spyOn(device, "attachPort")
      device.attachPort(undefined, 1)

      device["serialPort"]?.emit("error", new Error("open failed"))
      device.destroy()
      await jest.advanceTimersByTimeAsync(1000)

      expect(attachPortSpy).toHaveBeenCalledTimes(1)
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

    it("calls onOpenRetriesExhausted when open error has no retries left", () => {
      const onOpenRetriesExhausted = jest.fn()
      const device = new SerialPortDevice(mockDeviceInfo, {
        onOpenRetriesExhausted,
      })
      device.attachPort(undefined, 0)

      device["serialPort"]?.emit("error", new Error("open failed"))

      expect(onOpenRetriesExhausted).toHaveBeenCalledTimes(1)
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

  // `jest.setup.ts` mocks p-queue away, so nothing runs a queued task on its
  // own. This stands in for the queue, signal included.
  const runQueuedTasks = (device: SerialPortDevice) =>
    jest
      .spyOn(device["requestsQueue"], "add")
      .mockImplementation((task, options) =>
        Promise.resolve(
          (task as (context: { signal?: AbortSignal }) => unknown)({
            signal: (options as { signal?: AbortSignal })?.signal,
          })
        )
      )

  describe("error handling", () => {
    it("throws error when instance is not found", () => {
      ;(
        AppSerialportDeviceScanner.getMatchingInstance as jest.Mock
      ).mockReturnValue(undefined)

      expect(() => new SerialPortDevice(mockDeviceInfo)).toThrow(
        "No matching instance found for device at path /dev/ttyUSB0."
      )
    })

    it("allows request for non-serial devices when port is closed and status is disconnected", async () => {
      ;(
        AppSerialportDeviceScanner.getMatchingInstance as jest.Mock
      ).mockReturnValue(SerialPortHandlerMock)

      const device = new SerialPortDevice(mockDeviceInfo)
      device.attachPort()

      await waitFor(() => {
        expect(device.status).toBe(SerialPortDeviceStatus.DeviceConnected)
      })

      device["serialPort"]?.emit("close")

      await waitFor(() => {
        expect(device.status).toBe(SerialPortDeviceStatus.DeviceDisconnected)
      })

      jest
        .spyOn(device["requestsQueue"], "add")
        .mockImplementation(async (task) => task({}))

      const requestSpy = jest
        .spyOn(device["serialPort"] as SerialPortHandlerMock, "request")
        .mockResolvedValueOnce({ status: 200, endpoint: 1 })

      await expect(
        device.request({
          endpoint: 1,
        })
      ).resolves.toEqual({
        status: 200,
        endpoint: 1,
      })
      expect(requestSpy).toHaveBeenCalledTimes(1)
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

    it("freezes device and retries request with higher priority when a transport error hits a freezable device", async () => {
      const device = new SerialPortDevice(mockDeviceInfo)
      device.attachPort()
      device.prepareToFreeze(5000)

      const freezeSpy = jest.spyOn(device["freezeHandler"], "freeze")
      jest
        .spyOn(device["requestsQueue"], "add")
        .mockRejectedValueOnce(new SerialPortError(SerialPortErrorType.PortClosed))
        .mockResolvedValueOnce({ ok: true })

      await expect(device.request({ endpoint: 1 })).resolves.toEqual({
        ok: true,
      })
      expect(freezeSpy).toHaveBeenCalledTimes(1)
      expect(device.status).toBe(SerialPortDeviceStatus.DeviceFrozen)
      expect(device["requestsQueue"].add).toHaveBeenCalledTimes(2)
      expect(device["requestsQueue"].add).toHaveBeenNthCalledWith(
        2,
        expect.any(Function),
        { priority: 2, signal: expect.any(AbortSignal) }
      )
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
        .mockRejectedValueOnce(
          new TimeoutError("Still timed out after reattach")
        )

      const requestPromise = device.request({ endpoint: 1 })
      const requestExpectation = expect(requestPromise).rejects.toThrow(
        "Still timed out after reattach"
      )

      await jest.advanceTimersByTimeAsync(1000)

      await requestExpectation
      expect(attachPortSpy).toHaveBeenCalledTimes(2)
      expect(device["requestsQueue"].add).toHaveBeenCalledTimes(2)
    })

    it("does not freeze a freezable device when the failure is not a transport error", async () => {
      const device = new SerialPortDevice(mockDeviceInfo)
      device.attachPort()
      device.prepareToFreeze(5000)

      const freezeSpy = jest.spyOn(device["freezeHandler"], "freeze")
      jest
        .spyOn(device["requestsQueue"], "add")
        .mockRejectedValueOnce(
          new SerialPortError(SerialPortErrorType.InvalidResponse)
        )

      // A malformed response says nothing about the port being usable, so it
      // must not take the whole device out of service.
      await expect(device.request({ endpoint: 1 })).rejects.toThrow()
      expect(freezeSpy).not.toHaveBeenCalled()
      expect(device.status).not.toBe(SerialPortDeviceStatus.DeviceFrozen)
      expect(device["requestsQueue"].add).toHaveBeenCalledTimes(1)
    })

    it("stops waiting out a freeze after the budget is spent", async () => {
      const device = new SerialPortDevice(mockDeviceInfo)
      device.attachPort()
      device.prepareToFreeze(5000)
      device["serialPort"]?.emit("close")

      await waitFor(() => {
        expect(device.status).toBe(SerialPortDeviceStatus.DeviceFrozen)
      })

      jest
        .spyOn(device["requestsQueue"], "add")
        .mockRejectedValue(new Error("Device is frozen"))

      // Two waits are allowed; the third failure ends the ladder instead of
      // re-queueing for as long as the device stays frozen.
      await expect(device.request({ endpoint: 1 })).rejects.toThrow(
        "Device is frozen"
      )
      expect(device["requestsQueue"].add).toHaveBeenCalledTimes(3)
    })

    it("bounds a timing-out request to its retries plus a single reattach", async () => {
      const device = new SerialPortDevice(mockDeviceInfo)
      const attachPortSpy = jest.spyOn(device, "attachPort")

      device.attachPort()
      await waitFor(() => {
        expect(device.status).toBe(SerialPortDeviceStatus.DeviceConnected)
      })

      jest
        .spyOn(device["requestsQueue"], "add")
        .mockRejectedValue(new TimeoutError("Request timed out"))

      const requestPromise = device.request({
        endpoint: 1,
        options: { retries: 2 },
      })
      const requestExpectation = expect(requestPromise).rejects.toThrow(
        "Request timed out"
      )

      await jest.advanceTimersByTimeAsync(1000)
      await requestExpectation

      // Two caller retries, then one reattach, then the error is let through.
      expect(device["requestsQueue"].add).toHaveBeenCalledTimes(4)
      expect(attachPortSpy).toHaveBeenCalledTimes(2)
    })

    it("gives up instead of re-queueing when the device disconnects while a reattach settles", async () => {
      const device = new SerialPortDevice(mockDeviceInfo)

      device.attachPort()
      await waitFor(() => {
        expect(device.status).toBe(SerialPortDeviceStatus.DeviceConnected)
      })

      const addSpy = jest
        .spyOn(device["requestsQueue"], "add")
        .mockRejectedValue(new TimeoutError("Request timed out"))

      // The re-open fails and takes the device down while the loop waits out
      // the settle delay.
      jest.spyOn(device, "attachPort").mockImplementation(() => {
        device["serialPort"]?.emit("close")
      })

      const requestPromise = device.request({ endpoint: 1 })
      const requestExpectation = expect(requestPromise).rejects.toThrow(
        "Request timed out"
      )

      await jest.advanceTimersByTimeAsync(1000)
      await requestExpectation

      // Without the pre-attempt reachability check the retry would be handed
      // to a paused queue whose rejector set has already been drained, and its
      // promise would never settle.
      await waitFor(() => {
        expect(device.status).toBe(SerialPortDeviceStatus.DeviceDisconnected)
      })
      expect(addSpy).toHaveBeenCalledTimes(1)
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
    })

    it("names a timed-out request so its type survives the IPC boundary", async () => {
      const device = new SerialPortDevice(mockDeviceInfo)
      device.attachPort()

      await waitFor(() => {
        expect(device.status).toBe(SerialPortDeviceStatus.DeviceConnected)
      })

      jest
        .spyOn(device["requestsQueue"], "add")
        .mockRejectedValue(new TimeoutError("Promise timed out"))

      const requestPromise = device
        .request({ endpoint: 1 })
        .catch((error) => error)
      await jest.advanceTimersByTimeAsync(1000)
      const error = await requestPromise

      // Only a SerialPortError carries its type across IPC. A bare
      // TimeoutError reaches the renderer as `Unknown`, which the UI reads as
      // a critical device fault and answers with the troubleshooting page.
      expect(error).toBeInstanceOf(SerialPortError)
      expect((error as SerialPortError).type).toBe(
        SerialPortErrorType.ResponseTimeout
      )
      // The original reason rides in front of the marker, so logs and stack
      // traces still say what actually happened.
      expect((error as Error).message).toContain("Promise timed out")
    })

    it("names a request to a disconnected device as a closed port", async () => {
      const device = new SerialPortDevice(mockDeviceInfo)
      device.attachPort()

      await waitFor(() => {
        expect(device.status).toBe(SerialPortDeviceStatus.DeviceConnected)
      })

      device["serialPort"]?.emit("close")

      await waitFor(() => {
        expect(device.status).toBe(SerialPortDeviceStatus.DeviceDisconnected)
      })

      const error = await device.request({ endpoint: 1 }).catch((e) => e)

      expect(error).toBeInstanceOf(SerialPortError)
      expect((error as SerialPortError).type).toBe(
        SerialPortErrorType.PortClosed
      )
      expect((error as Error).message).toContain("because it is disconnected")
    })

    it("names a request cancelled during teardown as aborted", async () => {
      const device = new SerialPortDevice(mockDeviceInfo)
      device.attachPort()

      jest.useRealTimers()
      // What an aborted `AbortSignal` surfaces as out of the queue.
      const abortError = new Error("The operation was aborted")
      abortError.name = "AbortError"
      jest
        .spyOn(device["requestsQueue"], "add")
        .mockRejectedValueOnce(abortError)

      const error = await device.request({ endpoint: 1 }).catch((e) => e)

      // We cancelled this one ourselves, so the UI has nothing to report.
      expect(error).toBeInstanceOf(SerialPortError)
      expect((error as SerialPortError).type).toBe(
        SerialPortErrorType.RequestAborted
      )
    })

    it("hands the cancellation signal to the handler", async () => {
      const device = new SerialPortDevice(mockDeviceInfo)
      device.attachPort()

      await waitFor(() => {
        expect(device.status).toBe(SerialPortDeviceStatus.DeviceConnected)
      })

      const handler = device["serialPort"]
      if (!handler) {
        throw new Error("Expected the device to have an attached port.")
      }
      const handlerSpy = jest
        .spyOn(handler, "request")
        .mockResolvedValue({ ok: true })
      runQueuedTasks(device)

      await device.request({ endpoint: 1 })

      // Cancelling has to reach the layer holding the port. Stopping at the
      // device would only stop us awaiting, while the request kept its
      // listeners armed and its timer running against a port the next
      // request is about to use.
      expect(handlerSpy).toHaveBeenCalledTimes(1)
      expect(handlerSpy.mock.calls[0][1]).toBeInstanceOf(AbortSignal)
    })

    it("leaves request timing to the handler instead of the queue", async () => {
      const device = new SerialPortDevice(mockDeviceInfo)
      device.attachPort()

      const addSpy = jest
        .spyOn(device["requestsQueue"], "add")
        .mockResolvedValue({ ok: true })

      await device.request({ endpoint: 1, options: { timeout: 2_000 } })

      // A timeout here cannot cancel anything: when it fired the queue freed
      // the slot and sent the next request while the handler still held the
      // port, so `concurrency: 1` stopped meaning anything. The handler's own
      // timer is the one that can both reject and release.
      const options = addSpy.mock.calls[0][1] as { timeout?: number }
      expect(options.timeout).toBeUndefined()
    })

    it("does not write a request that was cancelled before it started", async () => {
      const device = new SerialPortDevice(mockDeviceInfo)
      device.attachPort()

      await waitFor(() => {
        expect(device.status).toBe(SerialPortDeviceStatus.DeviceConnected)
      })

      const handler = device["serialPort"]
      if (!handler) {
        throw new Error("Expected the device to have an attached port.")
      }
      const writeSpy = jest.spyOn(handler, "writeAsync")

      const error = await device["makeRequest"](
        { endpoint: 1 },
        AbortSignal.abort()
      ).catch((e) => e)

      expect(writeSpy).not.toHaveBeenCalled()
      expect((error as SerialPortError).type).toBe(
        SerialPortErrorType.RequestAborted
      )
    })

    it("rejects when the device has no handler to serve the request", async () => {
      const device = new SerialPortDevice(mockDeviceInfo)
      device.attachPort()

      await waitFor(() => {
        expect(device.status).toBe(SerialPortDeviceStatus.DeviceConnected)
      })

      device["serialPort"] = undefined
      runQueuedTasks(device)

      // Falling through to `this.serialPort?.request(...)` evaluated to
      // undefined and left the promise unsettled for good - the one failure
      // a caller cannot come back from.
      const error = await device.request({ endpoint: 1 }).catch((e) => e)

      expect(error).toBeInstanceOf(SerialPortError)
      expect((error as SerialPortError).type).toBe(
        SerialPortErrorType.PortClosed
      )
      expect((error as Error).message).toContain(
        "SerialPortHandler is not initialized."
      )
    })

    it("rejects a request made while the port is closed", async () => {
      const device = new SerialPortDevice(mockDeviceInfo)
      device.attachPort()

      await waitFor(() => {
        expect(device.status).toBe(SerialPortDeviceStatus.DeviceConnected)
      })

      const handler = device["serialPort"]
      if (!handler) {
        throw new Error("Expected the device to have an attached port.")
      }
      jest.spyOn(handler, "isOpen", "get").mockReturnValue(false)
      const handlerSpy = jest.spyOn(handler, "request")
      runQueuedTasks(device)

      const error = await device.request({ endpoint: 1 }).catch((e) => e)

      expect(handlerSpy).not.toHaveBeenCalled()
      expect((error as SerialPortError).type).toBe(
        SerialPortErrorType.PortClosed
      )
      expect((error as Error).message).toContain("Serial port is not open.")
    })

    it("leaves an error it cannot name untouched", async () => {
      const device = new SerialPortDevice(mockDeviceInfo)
      device.attachPort()

      jest.useRealTimers()
      jest
        .spyOn(device["requestsQueue"], "add")
        .mockRejectedValueOnce(new Error("Some other error"))

      const error = await device.request({ endpoint: 1 }).catch((e) => e)

      // Guessing a type here would be worse than admitting we have none: the
      // renderer maps an unnamed error to `Critical`, which is the right
      // answer for a failure nobody has classified.
      expect(error).not.toBeInstanceOf(SerialPortError)
      expect((error as Error).message).toBe("Some other error")
    })
  })

  describe("port lifecycle", () => {
    it("waits for the old port to close before opening the path again", async () => {
      const device = new SerialPortDevice(mockDeviceInfo)
      device.attachPort()

      await waitFor(() => {
        expect(device.status).toBe(SerialPortDeviceStatus.DeviceConnected)
      })

      const firstPort = device["serialPort"]
      if (!firstPort) {
        throw new Error("Expected the device to have an attached port.")
      }

      // Hold the close open, so the window the old code opened in is
      // observable rather than a matter of timing.
      let finishClose: (() => void) | undefined
      jest
        .spyOn(firstPort, "close")
        .mockImplementation(((callback?: (error?: Error | null) => void) => {
          finishClose = () => callback?.(null)
        }) as never)

      const cleanupSpy = jest.spyOn(firstPort, "cleanup")

      device.attachPort()

      // Opening the path while the previous handle is still closing is what
      // Windows refuses with "access denied".
      expect(device["serialPort"]).toBeUndefined()
      // And the handler has to survive until then: cleaning it up first would
      // drop the close callback being waited on.
      expect(cleanupSpy).not.toHaveBeenCalled()

      finishClose?.()

      await waitFor(() => {
        expect(device["serialPort"]).toBeDefined()
      })
      expect(device["serialPort"]).not.toBe(firstPort)
      expect(cleanupSpy).toHaveBeenCalled()
    })
  })

  describe("state invariant", () => {
    it("resumes the requests queue when a frozen device is unfrozen manually", async () => {
      const device = new SerialPortDevice(mockDeviceInfo)
      device.attachPort()

      await waitFor(() => {
        expect(device.status).toBe(SerialPortDeviceStatus.DeviceConnected)
      })

      device.prepareToFreeze(5000)
      device["freezeHandler"].freeze()

      expect(device.status).toBe(SerialPortDeviceStatus.DeviceFrozen)
      expect(device["requestsQueue"].pause).toHaveBeenCalled()

      const startSpy = jest.spyOn(device["requestsQueue"], "start")

      device.unfreeze()

      expect(device.status).toBe(SerialPortDeviceStatus.DeviceConnected)
      expect(startSpy).toHaveBeenCalled()
    })

    it("restores DeviceActive after a manual unfreeze when the device was already activated", async () => {
      const device = new SerialPortDevice(mockDeviceInfo)
      device.attachPort()

      await waitFor(() => {
        expect(device.status).toBe(SerialPortDeviceStatus.DeviceConnected)
      })

      device.activate()
      expect(device.status).toBe(SerialPortDeviceStatus.DeviceActive)

      device.prepareToFreeze(5000)
      device["freezeHandler"].freeze()
      expect(device.status).toBe(SerialPortDeviceStatus.DeviceFrozen)

      device.unfreeze()

      expect(device.status).toBe(SerialPortDeviceStatus.DeviceActive)
    })

    it("reattaches the port when a device whose port is gone is unfrozen manually", async () => {
      const device = new SerialPortDevice(mockDeviceInfo)
      device.attachPort()

      await waitFor(() => {
        expect(device.status).toBe(SerialPortDeviceStatus.DeviceConnected)
      })

      device.prepareToFreeze(5000)
      device["freezeHandler"].freeze()
      expect(device.status).toBe(SerialPortDeviceStatus.DeviceFrozen)

      // The device froze because its port went away.
      device["serialPort"] = undefined
      const attachPortSpy = jest
        .spyOn(device, "attachPort")
        .mockImplementation(() => undefined)

      device.unfreeze()
      await jest.advanceTimersByTimeAsync(1000)

      expect(attachPortSpy).toHaveBeenCalled()
    })

    it("rejects queued requests when the device disconnects instead of dropping them", async () => {
      const device = new SerialPortDevice(mockDeviceInfo)
      device.attachPort()

      await waitFor(() => {
        expect(device.status).toBe(SerialPortDeviceStatus.DeviceConnected)
      })

      // A task the queue accepted but never ran - exactly what `PQueue.clear()`
      // discards without settling the promise `add()` returned.
      jest
        .spyOn(device["requestsQueue"], "add")
        .mockReturnValue(new Promise<never>(() => undefined))

      const pendingRequest = device.request({ endpoint: 1 })

      device["serialPort"]?.emit("close")

      await expect(pendingRequest).rejects.toThrow()
      expect(device.status).toBe(SerialPortDeviceStatus.DeviceDisconnected)
    })

    it("does not freeze a device that is already disconnected", async () => {
      const device = new SerialPortDevice(mockDeviceInfo)
      device.attachPort()

      await waitFor(() => {
        expect(device.status).toBe(SerialPortDeviceStatus.DeviceConnected)
      })

      device["serialPort"]?.emit("close")
      expect(device.status).toBe(SerialPortDeviceStatus.DeviceDisconnected)

      device.prepareToFreeze(5000)
      device["freezeHandler"].freeze()

      // Freezing a device that is already gone would resurrect it into a state
      // nothing re-attaches from.
      expect(device.status).toBe(SerialPortDeviceStatus.DeviceDisconnected)
    })

    it("skips the deferred re-attach when the port is open again", async () => {
      const device = new SerialPortDevice(mockDeviceInfo)
      device.attachPort()

      await waitFor(() => {
        expect(device.status).toBe(SerialPortDeviceStatus.DeviceConnected)
      })

      device.prepareToFreeze(5000)
      device["freezeHandler"].freeze()
      expect(device.status).toBe(SerialPortDeviceStatus.DeviceFrozen)

      const openPort = device["serialPort"]
      device["serialPort"] = undefined

      device.unfreeze()

      // The scanner re-attached the device with fresh port info before the
      // deferred re-attach fired, so it must not open a second port.
      device["serialPort"] = openPort
      const attachPortSpy = jest.spyOn(device, "attachPort")

      await jest.advanceTimersByTimeAsync(1000)

      expect(attachPortSpy).not.toHaveBeenCalled()
    })

    it("keeps serving a disconnected non-serial device instead of pausing its queue", async () => {
      // MSC/mock devices are not backed by a port, so `request()` admits them while
      // disconnected - the queue must stay usable for them.
      Object.assign(mockSerialPortHandler, { nonSerialPortDevice: true })

      try {
        const device = new SerialPortDevice(mockDeviceInfo)
        device.attachPort()

        await waitFor(() => {
          expect(device.status).toBe(SerialPortDeviceStatus.DeviceConnected)
        })

        device["serialPort"]?.emit("close")

        expect(device.status).toBe(SerialPortDeviceStatus.DeviceDisconnected)
        expect(device["requestsQueue"].pause).not.toHaveBeenCalled()
        expect(device["requestsQueue"].clear).not.toHaveBeenCalled()

        await expect(device.request({ endpoint: 1 })).resolves.toBeUndefined()
      } finally {
        delete (mockSerialPortHandler as unknown as Record<string, unknown>)
          .nonSerialPortDevice
      }
    })

    it("rejects queued requests when the device is destroyed", async () => {
      const device = new SerialPortDevice(mockDeviceInfo)
      device.attachPort()

      await waitFor(() => {
        expect(device.status).toBe(SerialPortDeviceStatus.DeviceConnected)
      })

      jest
        .spyOn(device["requestsQueue"], "add")
        .mockReturnValue(new Promise<never>(() => undefined))

      const pendingRequest = device.request({ endpoint: 1 })

      device.destroy()

      await expect(pendingRequest).rejects.toThrow()
    })
  })
})
