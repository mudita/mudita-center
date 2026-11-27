/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { waitUntilUnfreeze } from "./wait-until-unfreeze"
import { AppSerialPort } from "app-serialport/renderer"
import { HarmonyMsc } from "devices/harmony-msc/models"
import { SerialPortDeviceType } from "app-serialport/models"

jest.mock("app-serialport/renderer", () => ({
  AppSerialPort: {
    isFrozen: jest.fn(),
    unfreeze: jest.fn(),
    getCurrentDevices: jest.fn(),
  },
}))

const isFrozenMock = AppSerialPort.isFrozen as jest.Mock
const getCurrentDevicesMock = AppSerialPort.getCurrentDevices as jest.Mock

const device = { id: "device-123" } as unknown as HarmonyMsc

describe("waitUntilUnfreeze", () => {
  beforeEach(() => {
    jest.clearAllMocks()
    jest.useFakeTimers()
    getCurrentDevicesMock.mockResolvedValue([
      { deviceType: SerialPortDeviceType.Harmony },
    ])
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  const waitFor = (signal = new AbortController().signal) => {
    return waitUntilUnfreeze({ device, signal })
  }

  it("gives up on a device the main process no longer holds", async () => {
    // `undefined` is "no such device". Nothing is left to do the freezing,
    // so waiting for the freeze would outlive the flashing flow itself.
    isFrozenMock.mockResolvedValue(undefined)

    const result = await waitFor()

    expect(result.ok).toBe(false)
    expect(isFrozenMock).toHaveBeenCalledTimes(1)
  })

  it("keeps waiting while the device is only not frozen yet", async () => {
    // `false` is the device answering for itself - the opposite of the case
    // above, and the reason this cannot just test for a falsy answer.
    isFrozenMock
      .mockResolvedValueOnce(false)
      .mockResolvedValueOnce(false)
      .mockResolvedValue(true)

    const pending = waitFor()
    await jest.advanceTimersByTimeAsync(2_000)

    await expect(pending).resolves.toEqual(
      expect.objectContaining({ ok: true })
    )
    expect(isFrozenMock.mock.calls.length).toBeGreaterThan(2)
  })

  it("gives up when the device is forgotten while it waits to come back", async () => {
    // Frozen on the first look, not held at all on the next: the freeze ran
    // out and the device never returned. Leaving the wait here would report
    // that as a reconnect.
    isFrozenMock.mockResolvedValueOnce(true).mockResolvedValue(undefined)
    getCurrentDevicesMock.mockResolvedValue([])

    const result = await waitFor()

    expect(result.ok).toBe(false)
  })

  it("waits until the device is back on the list as a Harmony", async () => {
    isFrozenMock.mockResolvedValue(true)
    getCurrentDevicesMock
      .mockResolvedValueOnce([])
      .mockResolvedValue([{ deviceType: SerialPortDeviceType.Harmony }])

    const pending = waitFor()
    await jest.advanceTimersByTimeAsync(2_000)

    await expect(pending).resolves.toEqual(
      expect.objectContaining({ ok: true })
    )
    expect(getCurrentDevicesMock.mock.calls.length).toBeGreaterThan(1)
  })

  it("returns once the device is frozen and back on the list", async () => {
    isFrozenMock.mockResolvedValue(true)

    const result = await waitFor()

    expect(result.ok).toBe(true)
  })
})
