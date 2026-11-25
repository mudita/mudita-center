/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import EventEmitter from "events"
import { BrowserWindow, IpcMain } from "electron"
import {
  SerialPortChangedDevices,
  SerialPortDeviceInfo,
  SerialPortDeviceType,
  SerialPortIpcEvents,
} from "app-serialport/models"

type DevicesChangeCallback = (data: SerialPortChangedDevices) => void

const mockDevicesChangedCallbacks: DevicesChangeCallback[] = []
const mockGetVisibleDevices = jest.fn((): SerialPortDeviceInfo[] => [])
const mockGetCurrentDevices = jest.fn(() => [])

jest.mock("./app-serial-port-service", () => ({
  AppSerialPortService: jest.fn().mockImplementation(() => ({
    onDevicesChanged: (callback: DevicesChangeCallback) => {
      mockDevicesChangedCallbacks.push(callback)
      return () => {
        const index = mockDevicesChangedCallbacks.indexOf(callback)
        if (index !== -1) {
          mockDevicesChangedCallbacks.splice(index, 1)
        }
      }
    },
    getVisibleDevices: mockGetVisibleDevices,
    getCurrentDevices: mockGetCurrentDevices,
    request: jest.fn(),
    freeze: jest.fn(),
    unfreeze: jest.fn(),
    isFrozen: jest.fn(),
    reset: jest.fn(),
  })),
}))

const deviceInfo: SerialPortDeviceInfo = {
  id: "device-123",
  path: "/dev/ttyUSB0",
  vendorId: "1234",
  productId: "5678",
  deviceType: SerialPortDeviceType.ApiDevice,
  manufacturer: "Test Manufacturer",
  serialNumber: "SN12345",
  pnpId: "USB\\VID_1234&PID_5678\\SN12345",
  locationId: "1-1",
}

const changedDevices: SerialPortChangedDevices = {
  all: [deviceInfo],
  added: [deviceInfo],
  removed: [],
}

interface FakeWindow extends EventEmitter {
  webContents: EventEmitter & {
    send: jest.Mock
    isDestroyed: jest.Mock<boolean, []>
  }
}

const createFakeWindow = (): FakeWindow => {
  const webContents = Object.assign(new EventEmitter(), {
    send: jest.fn(),
    isDestroyed: jest.fn(() => false),
  })
  return Object.assign(new EventEmitter(), { webContents })
}

const asBrowserWindow = (window: FakeWindow) =>
  window as unknown as BrowserWindow

const createFakeIpcMain = () =>
  ({
    handle: jest.fn(),
    removeHandler: jest.fn(),
  }) as unknown as IpcMain

const emitDevicesChanged = (data: SerialPortChangedDevices) => {
  for (const callback of [...mockDevicesChangedCallbacks]) {
    callback(data)
  }
}

describe("initSerialPort", () => {
  let initSerialPort: typeof import("./init-serialport").initSerialPort
  let ipcMain: IpcMain

  beforeEach(() => {
    jest.clearAllMocks()
    mockDevicesChangedCallbacks.length = 0
    mockGetVisibleDevices.mockReturnValue([])
    // The module keeps the service and the current window binding in module
    // scope, so every test needs a fresh copy of it.
    jest.resetModules()
    initSerialPort = require("./init-serialport").initSerialPort
    ipcMain = createFakeIpcMain()
  })

  it("pushes device changes to the window it was initialized with", () => {
    const window = createFakeWindow()

    initSerialPort(ipcMain, asBrowserWindow(window))
    emitDevicesChanged(changedDevices)

    expect(window.webContents.send).toHaveBeenCalledWith(
      SerialPortIpcEvents.DevicesChanged,
      changedDevices
    )
  })

  it("moves the subscription to the window of a later initialization", () => {
    const firstWindow = createFakeWindow()
    const secondWindow = createFakeWindow()

    initSerialPort(ipcMain, asBrowserWindow(firstWindow))
    initSerialPort(ipcMain, asBrowserWindow(secondWindow))
    emitDevicesChanged(changedDevices)

    expect(mockDevicesChangedCallbacks).toHaveLength(1)
    expect(firstWindow.webContents.send).not.toHaveBeenCalled()
    expect(secondWindow.webContents.send).toHaveBeenCalledWith(
      SerialPortIpcEvents.DevicesChanged,
      changedDevices
    )
  })

  it("stops listening on the old window when it is rebound", () => {
    const firstWindow = createFakeWindow()
    const secondWindow = createFakeWindow()

    initSerialPort(ipcMain, asBrowserWindow(firstWindow))
    initSerialPort(ipcMain, asBrowserWindow(secondWindow))

    expect(firstWindow.webContents.listenerCount("did-finish-load")).toEqual(0)
    expect(secondWindow.webContents.listenerCount("did-finish-load")).toEqual(1)
  })

  it("drops the subscription when the bound window is closed", () => {
    const window = createFakeWindow()

    initSerialPort(ipcMain, asBrowserWindow(window))
    window.emit("closed")
    emitDevicesChanged(changedDevices)

    expect(mockDevicesChangedCallbacks).toHaveLength(0)
    expect(window.webContents.send).not.toHaveBeenCalled()
  })

  it("keeps the current binding when a previously bound window is closed", () => {
    const firstWindow = createFakeWindow()
    const secondWindow = createFakeWindow()

    initSerialPort(ipcMain, asBrowserWindow(firstWindow))
    initSerialPort(ipcMain, asBrowserWindow(secondWindow))
    firstWindow.emit("closed")
    emitDevicesChanged(changedDevices)

    expect(secondWindow.webContents.send).toHaveBeenCalledWith(
      SerialPortIpcEvents.DevicesChanged,
      changedDevices
    )
  })

  it("sends the same filtered device list on did-finish-load as the push channel", () => {
    const window = createFakeWindow()
    mockGetVisibleDevices.mockReturnValue([deviceInfo])

    initSerialPort(ipcMain, asBrowserWindow(window))
    window.webContents.emit("did-finish-load")

    expect(mockGetCurrentDevices).not.toHaveBeenCalled()
    expect(window.webContents.send).toHaveBeenCalledWith(
      SerialPortIpcEvents.DevicesChanged,
      { all: [deviceInfo], added: [], removed: [] }
    )
  })

  it("sends the current device list to a window opened after the first one", () => {
    const firstWindow = createFakeWindow()
    const secondWindow = createFakeWindow()
    mockGetVisibleDevices.mockReturnValue([deviceInfo])

    initSerialPort(ipcMain, asBrowserWindow(firstWindow))
    firstWindow.emit("closed")
    initSerialPort(ipcMain, asBrowserWindow(secondWindow))
    secondWindow.webContents.emit("did-finish-load")

    expect(secondWindow.webContents.send).toHaveBeenCalledWith(
      SerialPortIpcEvents.DevicesChanged,
      { all: [deviceInfo], added: [], removed: [] }
    )
  })

  it("does not send to a destroyed webContents", () => {
    const window = createFakeWindow()

    initSerialPort(ipcMain, asBrowserWindow(window))
    window.webContents.isDestroyed.mockReturnValue(true)
    emitDevicesChanged(changedDevices)
    window.webContents.emit("did-finish-load")

    expect(window.webContents.send).not.toHaveBeenCalled()
  })

  it("creates the service and registers the ipc handlers only once", () => {
    const { AppSerialPortService } = require("./app-serial-port-service") as {
      AppSerialPortService: jest.Mock
    }

    initSerialPort(ipcMain, asBrowserWindow(createFakeWindow()))
    const handlersAfterFirstInit = (ipcMain.handle as jest.Mock).mock.calls
      .length
    initSerialPort(ipcMain, asBrowserWindow(createFakeWindow()))

    expect(AppSerialPortService).toHaveBeenCalledTimes(1)
    expect((ipcMain.handle as jest.Mock).mock.calls.length).toEqual(
      handlersAfterFirstInit
    )
  })
})
