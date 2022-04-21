/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { UsbDeviceFacade } from "./usb-device.facade"
import { UsbParser } from "./usb-parser"
import { USBDataType, WriteOption } from "./usb-device.facade.class"

jest.mock("./usb-parser")

beforeEach(() => {
  jest.resetAllMocks()
})

describe("`UsbDeviceFacade`", () => {
  describe("`openSession` method", () => {
    test("returns `true` when `read` methods no returns `undefined` ", async () => {
      const device = {
        opened: false,
        close: jest.fn(),
        open: jest.fn(),
        configuration: null,
        selectConfiguration: jest.fn(),
        claimInterface: jest.fn(),
      } as unknown as USBDevice
      const subject = new UsbDeviceFacade(device)

      const write = jest.fn()
      const read = jest.fn().mockReturnValue("")
      jest.spyOn(subject, "write").mockImplementation(write)
      jest
        .spyOn(subject as unknown as { read: any }, "read")
        .mockImplementation(read)

      expect(await subject.openSession(1)).toBeTruthy()
      expect(device.open).toBeCalled()
      expect(write).toBeCalled()
      expect(read).toBeCalled()
    })

    test("returns `false` when `read` methods returns `undefined` ", async () => {
      const device = {
        opened: false,
        close: jest.fn(),
        open: jest.fn(),
        configuration: null,
        selectConfiguration: jest.fn(),
        claimInterface: jest.fn(),
      } as unknown as USBDevice
      const subject = new UsbDeviceFacade(device)

      const write = jest.fn()
      const read = jest.fn().mockReturnValue(undefined)
      jest.spyOn(subject, "write").mockImplementation(write)
      jest
        .spyOn(subject as unknown as { read: any }, "read")
        .mockImplementation(read)

      expect(await subject.openSession(1)).toBeFalsy()
      expect(device.open).toBeCalled()
      expect(write).toBeCalled()
      expect(read).toBeCalled()
    })
  })

  describe("`closeSession` method", () => {
    test("returns `true` when any method throw error ", async () => {
      const device = {
        close: jest.fn(),
        releaseInterface: jest.fn(),
      } as unknown as USBDevice
      const subject = new UsbDeviceFacade(device)

      jest.spyOn(subject, "write").mockImplementation(jest.fn())
      jest
        .spyOn(subject as unknown as { read: any }, "read")
        .mockReturnValue("")

      expect(await subject.closeSession(1)).toBeTruthy()
      expect(device.releaseInterface).toBeCalled()
      expect(device.close).toBeCalled()
    })
  })

  describe("`write` method", () => {
    test("call `transferOut` method", async () => {
      const device = {
        transferOut: jest.fn(),
      } as unknown as USBDevice
      const subject = new UsbDeviceFacade(device)

      await subject.write({} as WriteOption)
      expect(UsbParser.buildContainerPacket).toBeCalled()
      expect(device.transferOut).toBeCalled()
    })
  })

  describe("`readData` method", () => {
    test("return result when type is equal DataBlock", async () => {
      const device = {
        transferOut: jest.fn(),
      } as unknown as USBDevice
      const subject = new UsbDeviceFacade(device)

      const result = { type: USBDataType.DataBlock }
      const read = jest.fn().mockReturnValue(result)
      jest
        .spyOn(subject as unknown as { read: any }, "read")
        .mockImplementation(read)

      expect(await subject.readData()).toEqual(result)
      expect(read).toBeCalled()
    })
  })

  describe("`readData` method", () => {
    test("throw Error when returns result is `undefined`", async () => {
      const device = {
        transferOut: jest.fn(),
      } as unknown as USBDevice
      const subject = new UsbDeviceFacade(device)

      const result = undefined
      const read = jest.fn().mockReturnValue(result)
      jest
        .spyOn(subject as unknown as { read: any }, "read")
        .mockImplementation(read)

      await expect(async () => await subject.readData()).rejects.toThrow()
      expect(read).toBeCalled()
    })
  })
})
