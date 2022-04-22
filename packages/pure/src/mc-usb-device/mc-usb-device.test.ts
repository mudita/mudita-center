/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { McUsbDevice } from "./mc-usb-device"
import { McUsbDeviceService } from "./mc-usb-device.service"

beforeEach(() => {
  jest.resetAllMocks()
})

describe("`McUsbDevice`", () => {
  describe("`getFiles` method", () => {
    test("returns properly data when each used method return success", async () => {
      const mcUsbDeviceService = {
        openSession: jest.fn().mockReturnValue({ success: true }),
        closeSession: jest.fn().mockReturnValue({ success: true }),
        getObjectHandles: jest
          .fn()
          .mockReturnValue({ success: true, data: ["1"] }),
        getFileName: jest
          .fn()
          .mockReturnValue({ success: true, data: "fileName" }),
        getFileSize: jest.fn().mockReturnValue({ success: true, data: 123 }),
        getFileFormat: jest
          .fn()
          .mockReturnValue({ success: true, data: 12288 }),
      } as unknown as McUsbDeviceService
      const subject = new McUsbDevice(mcUsbDeviceService)

      expect(await subject.getFiles()).toEqual({
        success: true,
        data: [{ id: "1", size: 123, name: "fileName", type: 12288 }],
      })
      expect(mcUsbDeviceService.openSession).toBeCalled()
      expect(mcUsbDeviceService.closeSession).toBeCalled()
      expect(mcUsbDeviceService.getObjectHandles).toBeCalled()
      expect(mcUsbDeviceService.getFileName).toBeCalled()
      expect(mcUsbDeviceService.getFileSize).toBeCalled()
      expect(mcUsbDeviceService.getFileFormat).toBeCalled()
    })

    test("returns error when `openSession` returns `false` ", async () => {
      const mcUsbDeviceService = {
        openSession: jest.fn().mockReturnValue({ success: false }),
      } as unknown as McUsbDeviceService
      const subject = new McUsbDevice(mcUsbDeviceService)

      expect(await subject.getFiles()).toEqual({
        success: false,
      })
    })

    test("returns error when `getObjectHandles` returns `false` ", async () => {
      const mcUsbDeviceService = {
        openSession: jest.fn().mockReturnValue({ success: true }),
        getObjectHandles: jest.fn().mockReturnValue({ success: false }),
      } as unknown as McUsbDeviceService
      const subject = new McUsbDevice(mcUsbDeviceService)

      expect(await subject.getFiles()).toEqual({
        success: false,
      })
      expect(mcUsbDeviceService.openSession).toBeCalled()
      expect(mcUsbDeviceService.getObjectHandles).toBeCalled()
    })

    test("returns error when `getFileName` returns `false` ", async () => {
      const mcUsbDeviceService = {
        openSession: jest.fn().mockReturnValue({ success: true }),
        closeSession: jest.fn().mockReturnValue({ success: true }),
        getObjectHandles: jest
          .fn()
          .mockReturnValue({ success: true, data: ["1"] }),
        getFileName: jest.fn().mockReturnValue({ success: false }),
      } as unknown as McUsbDeviceService
      const subject = new McUsbDevice(mcUsbDeviceService)

      const result = await subject.getFiles()
      expect(result.success).toBeFalsy()
      expect(mcUsbDeviceService.openSession).toBeCalled()
      expect(mcUsbDeviceService.getObjectHandles).toBeCalled()
      expect(mcUsbDeviceService.getFileName).toBeCalled()
      expect(mcUsbDeviceService.closeSession).toBeCalled()
    })

    test("returns error when `getFileSize` returns `false` ", async () => {
      const mcUsbDeviceService = {
        openSession: jest.fn().mockReturnValue({ success: true }),
        closeSession: jest.fn().mockReturnValue({ success: true }),
        getObjectHandles: jest
          .fn()
          .mockReturnValue({ success: true, data: ["1"] }),
        getFileName: jest
          .fn()
          .mockReturnValue({ success: true, data: "fileName" }),
        getFileSize: jest.fn().mockReturnValue({ success: false }),
      } as unknown as McUsbDeviceService
      const subject = new McUsbDevice(mcUsbDeviceService)

      const result = await subject.getFiles()
      expect(result.success).toBeFalsy()
      expect(mcUsbDeviceService.openSession).toBeCalled()
      expect(mcUsbDeviceService.getObjectHandles).toBeCalled()
      expect(mcUsbDeviceService.getFileName).toBeCalled()
      expect(mcUsbDeviceService.getFileSize).toBeCalled()
      expect(mcUsbDeviceService.closeSession).toBeCalled()
    })

    test("returns error when `getFileFormat` returns `false` ", async () => {
      const mcUsbDeviceService = {
        openSession: jest.fn().mockReturnValue({ success: true }),
        closeSession: jest.fn().mockReturnValue({ success: true }),
        getObjectHandles: jest
          .fn()
          .mockReturnValue({ success: true, data: ["1"] }),
        getFileName: jest
          .fn()
          .mockReturnValue({ success: true, data: "fileName" }),
        getFileSize: jest.fn().mockReturnValue({ success: true, data: 123 }),
        getFileFormat: jest.fn().mockReturnValue({ success: false }),
      } as unknown as McUsbDeviceService
      const subject = new McUsbDevice(mcUsbDeviceService)

      const result = await subject.getFiles()
      expect(result.success).toBeFalsy()
      expect(mcUsbDeviceService.openSession).toBeCalled()
      expect(mcUsbDeviceService.getObjectHandles).toBeCalled()
      expect(mcUsbDeviceService.getFileName).toBeCalled()
      expect(mcUsbDeviceService.getFileSize).toBeCalled()
      expect(mcUsbDeviceService.getFileFormat).toBeCalled()
      expect(mcUsbDeviceService.closeSession).toBeCalled()
    })
  })
})
