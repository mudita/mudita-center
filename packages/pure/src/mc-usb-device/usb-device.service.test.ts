/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ConfigRequest, UsbDeviceService } from "./usb-device.service"
import { UsbDeviceFacadeClass, UsbResponse } from "./usb-device.facade.class"

describe("`UsbDeviceService`", () => {
  describe("`openSession` method", () => {
    test("returns success property as false when methods return false ", async () => {
      const usbDeviceFacade = {
        openSession: jest.fn().mockReturnValue(false),
      } as unknown as UsbDeviceFacadeClass
      const subject = new UsbDeviceService(usbDeviceFacade)
      expect(await subject.openSession()).toEqual({ success: false })
    })

    test("returns success property as false when methods return undefined ", async () => {
      const usbDeviceFacade = {
        openSession: jest.fn().mockReturnValue(undefined),
      } as unknown as UsbDeviceFacadeClass
      const subject = new UsbDeviceService(usbDeviceFacade)
      expect(await subject.openSession()).toEqual({ success: false })
    })

    test("returns success property as true when methods return true ", async () => {
      const usbDeviceFacade = {
        openSession: jest.fn().mockReturnValue(true),
      } as unknown as UsbDeviceFacadeClass
      const subject = new UsbDeviceService(usbDeviceFacade)
      expect(await subject.openSession()).toEqual({ success: true })
    })
  })

  describe("`closeSession` method", () => {
    test("returns success property as false when methods return false ", async () => {
      const usbDeviceFacade = {
        closeSession: jest.fn().mockReturnValue(false),
      } as unknown as UsbDeviceFacadeClass
      const subject = new UsbDeviceService(usbDeviceFacade)
      expect(await subject.closeSession()).toEqual({ success: false })
    })

    test("returns success property as false when methods return undefined ", async () => {
      const usbDeviceFacade = {
        closeSession: jest.fn().mockReturnValue(undefined),
      } as unknown as UsbDeviceFacadeClass
      const subject = new UsbDeviceService(usbDeviceFacade)
      expect(await subject.closeSession()).toEqual({ success: false })
    })

    test("returns success property as true when methods return true ", async () => {
      const usbDeviceFacade = {
        closeSession: jest.fn().mockReturnValue(true),
      } as unknown as UsbDeviceFacadeClass
      const subject = new UsbDeviceService(usbDeviceFacade)
      expect(await subject.closeSession()).toEqual({ success: true })
    })
  })

  describe("`request` method", () => {
    test("returns success property as false with error when `write` throw error ", async () => {
      const error = new Error()
      const usbDeviceFacade = {
        write: jest.fn().mockImplementation(() => {
          throw error
        }),
      } as unknown as UsbDeviceFacadeClass
      const subject = new UsbDeviceService(usbDeviceFacade)
      expect(await subject.request({} as ConfigRequest)).toEqual({
        success: false,
        error,
      })
    })

    test("returns success property as false with error when `readData` throw error ", async () => {
      const error = new Error()
      const usbDeviceFacade = {
        write: jest.fn(),
        readData: jest.fn().mockImplementation(() => {
          throw error
        }),
      } as unknown as UsbDeviceFacadeClass
      const subject = new UsbDeviceService(usbDeviceFacade)
      expect(await subject.request({} as ConfigRequest)).toEqual({
        success: false,
        error,
      })
    })

    test("returns success property as true with data when `readData` return properly payload ", async () => {
      const buffer = Buffer.from("") as unknown as UsbResponse
      const usbDeviceFacade = {
        write: jest.fn(),
        readData: jest.fn().mockReturnValue({ payload: buffer }),
      } as unknown as UsbDeviceFacadeClass
      const subject = new UsbDeviceService(usbDeviceFacade)
      expect(await subject.request({} as ConfigRequest)).toEqual({
        success: true,
        data: buffer,
      })
    })
  })
})
