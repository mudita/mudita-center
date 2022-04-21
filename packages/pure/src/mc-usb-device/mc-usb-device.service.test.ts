/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { McUsbDeviceService } from "./mc-usb-device.service"
import { UsbDeviceService } from "./usb-device.service"
import { UsbDecoder } from "./usb-decoder"

jest.mock("./usb-decoder")

beforeEach(() => {
  UsbDecoder.getParameters = jest.fn().mockImplementation((value) => value)
  UsbDecoder.getString = jest.fn().mockImplementation((value) => value)
  UsbDecoder.getNumberFromUint64 = jest
    .fn()
    .mockImplementation((value) => value)
  UsbDecoder.getUsbFileType = jest.fn().mockImplementation((value) => value)
})

describe("`McUsbDeviceService`", () => {
  describe("`openSession` method", () => {
    test("returns properly results when no error is thrown", async () => {
      const result = { success: true }
      const service = {
        openSession: jest.fn().mockReturnValue(result),
      } as unknown as UsbDeviceService
      const subject = new McUsbDeviceService(service)
      expect(await subject.openSession()).toEqual(result)
    })

    test("returns success property as false with error when openSession throw error", async () => {
      const error = new Error()
      const service = {
        openSession: jest.fn().mockImplementation(() => {
          throw error
        }),
      } as unknown as UsbDeviceService
      const subject = new McUsbDeviceService(service)
      expect(await subject.openSession()).toEqual({ success: false, error })
    })
  })

  describe("`closeSession` method", () => {
    test("returns properly results when no error is thrown", async () => {
      const result = { success: true }
      const service = {
        closeSession: jest.fn().mockReturnValue(result),
      } as unknown as UsbDeviceService
      const subject = new McUsbDeviceService(service)
      expect(await subject.closeSession()).toEqual(result)
    })

    test("returns success property as false with error when closeSession throw error", async () => {
      const error = new Error()
      const service = {
        closeSession: jest.fn().mockImplementation(() => {
          throw error
        }),
      } as unknown as UsbDeviceService
      const subject = new McUsbDeviceService(service)
      expect(await subject.closeSession()).toEqual({ success: false, error })
    })
  })

  describe("`getObjectHandles` method", () => {
    test("returns properly results when no error is thrown", async () => {
      const result = { success: true, data: [] }
      const service = {
        request: jest.fn().mockReturnValue(result),
      } as unknown as UsbDeviceService
      const subject = new McUsbDeviceService(service)
      expect(await subject.getObjectHandles()).toEqual(result)

      expect(UsbDecoder.getParameters).toBeCalled()
    })

    test("returns success property as false when data is undefined", async () => {
      const result = { success: true, data: undefined }
      const service = {
        request: jest.fn().mockReturnValue(result),
      } as unknown as UsbDeviceService
      const subject = new McUsbDeviceService(service)
      expect(await subject.getObjectHandles()).toEqual({ success: false })

      expect(UsbDecoder.getParameters).not.toBeCalled()
    })

    test("returns success property as false with error when closeSession throw error", async () => {
      const error = new Error()
      const service = {
        request: jest.fn().mockImplementation(() => {
          throw error
        }),
      } as unknown as UsbDeviceService
      const subject = new McUsbDeviceService(service)
      expect(await subject.getObjectHandles()).toEqual({
        success: false,
        error,
      })
      expect(UsbDecoder.getParameters).not.toBeCalled()
    })
  })

  describe("`getFileName` method", () => {
    test("returns properly results when no error is thrown", async () => {
      const result = { success: true, data: "fileName" }
      const service = {
        request: jest.fn().mockReturnValue(result),
      } as unknown as UsbDeviceService
      const subject = new McUsbDeviceService(service)
      expect(await subject.getFileName("1")).toEqual(result)

      expect(UsbDecoder.getString).toBeCalled()
    })

    test("returns success property as false when data is undefined", async () => {
      const result = { success: true, data: undefined }
      const service = {
        request: jest.fn().mockReturnValue(result),
      } as unknown as UsbDeviceService
      const subject = new McUsbDeviceService(service)
      expect(await subject.getFileName("1")).toEqual({ success: false })

      expect(UsbDecoder.getString).not.toBeCalled()
    })

    test("returns success property as false with error when closeSession throw error", async () => {
      const error = new Error()
      const service = {
        request: jest.fn().mockImplementation(() => {
          throw error
        }),
      } as unknown as UsbDeviceService
      const subject = new McUsbDeviceService(service)
      expect(await subject.getFileName("1")).toEqual({ success: false, error })
      expect(UsbDecoder.getString).not.toBeCalled()
    })
  })

  describe("`getFileSize` method", () => {
    test("returns properly results when no error is thrown", async () => {
      const result = { success: true, data: 123 }
      const service = {
        request: jest.fn().mockReturnValue(result),
      } as unknown as UsbDeviceService
      const subject = new McUsbDeviceService(service)
      expect(await subject.getFileSize("1")).toEqual(result)

      expect(UsbDecoder.getNumberFromUint64).toBeCalled()
    })

    test("returns success property as false when data is undefined", async () => {
      const result = { success: true, data: undefined }
      const service = {
        request: jest.fn().mockReturnValue(result),
      } as unknown as UsbDeviceService
      const subject = new McUsbDeviceService(service)
      expect(await subject.getFileSize("1")).toEqual({ success: false })

      expect(UsbDecoder.getNumberFromUint64).not.toBeCalled()
    })

    test("returns success property as false with error when closeSession throw error", async () => {
      const error = new Error()
      const service = {
        request: jest.fn().mockImplementation(() => {
          throw error
        }),
      } as unknown as UsbDeviceService
      const subject = new McUsbDeviceService(service)
      expect(await subject.getFileSize("1")).toEqual({ success: false, error })
      expect(UsbDecoder.getNumberFromUint64).not.toBeCalled()
    })
  })

  describe("`getFileFormat` method", () => {
    test("returns properly results when no error is thrown", async () => {
      const result = { success: true, data: 12288 }
      const service = {
        request: jest.fn().mockReturnValue(result),
      } as unknown as UsbDeviceService
      const subject = new McUsbDeviceService(service)
      expect(await subject.getFileFormat("1")).toEqual(result)

      expect(UsbDecoder.getUsbFileType).toBeCalled()
    })

    test("returns success property as false when data is undefined", async () => {
      const result = { success: true, data: undefined }
      const service = {
        request: jest.fn().mockReturnValue(result),
      } as unknown as UsbDeviceService
      const subject = new McUsbDeviceService(service)
      expect(await subject.getFileFormat("1")).toEqual({ success: false })

      expect(UsbDecoder.getUsbFileType).not.toBeCalled()
    })

    test("returns success property as false with error when closeSession throw error", async () => {
      const error = new Error()
      const service = {
        request: jest.fn().mockImplementation(() => {
          throw error
        }),
      } as unknown as UsbDeviceService
      const subject = new McUsbDeviceService(service)
      expect(await subject.getFileFormat("1")).toEqual({
        success: false,
        error,
      })
      expect(UsbDecoder.getUsbFileType).not.toBeCalled()
    })
  })
})
