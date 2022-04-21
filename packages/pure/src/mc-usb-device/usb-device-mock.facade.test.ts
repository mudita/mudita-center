/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { UsbDeviceMockFacade } from "./usb-device-mock.facade"

const subject = new UsbDeviceMockFacade()

describe("`UsbDeviceMockFacade`", () => {
  test("`readData` method return undefined", async () => {
    expect(await subject.readData()).toBeUndefined()
  })
  test("`write` method return undefined", async () => {
    expect(await subject.write()).toBeUndefined()
  })
  test("`openSession` method return undefined", async () => {
    expect(await subject.openSession()).toBeUndefined()
  })
  test("`closeSession` method return undefined", async () => {
    expect(await subject.closeSession()).toBeUndefined()
  })
})
