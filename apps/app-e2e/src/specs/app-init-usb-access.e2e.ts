/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { simulateAppInitUsbAccessStep } from "../helpers/usb-access.helper"
import UsbAccessPage from "../page-objects/usb-access.page"
import { SPEC_TITLE } from "../consts/spec-title"

describe(SPEC_TITLE.APP_INIT_USB_ACCESS, () => {
  before(async () => {
    await simulateAppInitUsbAccessStep({
      serialPortAccess: false,
      grantAccessToSerialPortResult: true,
    })
  })

  it("should display all core modal elements", async () => {
    await expect(UsbAccessPage.requestModal).toBeDisplayed()
    await expect(UsbAccessPage.requestModalTitle).toBeDisplayed()
    await expect(UsbAccessPage.requestModalTitleIcon).toBeDisplayed()
    await expect(UsbAccessPage.requestModalDescription).toBeDisplayed()
    await expect(UsbAccessPage.requestModalCloseButton).toBeDisplayed()
  })
})
