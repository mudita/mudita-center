/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  itBehavesLikeRequestCancelledModal,
  simulateAppInitUsbAccessStep,
} from "../helpers/usb-access.helper"
import UsbAccessPage from "../page-objects/usb-access.page"
import testsHelper from "../helpers/tests.helper"

describe("App Init Step - Usb Access - Cancel Path", () => {
  before(async function () {
    if (!testsHelper.isLinux()) {
      this.skip()
    }
    await simulateAppInitUsbAccessStep({
      serialPortAccess: false,
      grantAccessToSerialPortResult: true,
    })
  })

  describe("Usb Access Request Modal", () => {
    it("should display all core modal elements", async () => {
      await expect(UsbAccessPage.requestModal).toBeDisplayed()
      await expect(UsbAccessPage.requestModalTitle).toBeDisplayed()
      await expect(UsbAccessPage.requestModalTitleIcon).toBeDisplayed()
      await expect(UsbAccessPage.requestModalDescription).toBeDisplayed()
    })

    it("should display the action controls", async () => {
      await expect(UsbAccessPage.requestModalCloseButton).toBeDisplayed()
      await expect(UsbAccessPage.requestModalButton).toBeDisplayed()
    })

    it("should open the Request Cancelled Modal when closing", async () => {
      await UsbAccessPage.requestModalCloseButton.click()
      await expect(UsbAccessPage.requestCancelledModal).toBeDisplayed()
    })
  })

  itBehavesLikeRequestCancelledModal()
})
