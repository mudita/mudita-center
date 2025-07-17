/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { simulateAppInitUsbAccessStep } from "../helpers/usb-access.helper"
import UsbAccessPage from "../page-objects/usb-access.page"
import { SPEC_TITLE } from "../consts/spec-title"
import AppInitPage from "../page-objects/app-init.page"

describe(SPEC_TITLE.APP_INIT_USB_ACCESS_CANCEL_PATH, () => {
  before(async () => {
    await simulateAppInitUsbAccessStep({
      serialPortAccess: false,
      grantAccessToSerialPortResult: true,
    })
  })

  describe("Usn Access Request Modal", () => {
    it("should display all core modal elements", async () => {
      await expect(UsbAccessPage.requestModal).toBeDisplayed()
      await expect(UsbAccessPage.requestModalTitle).toBeDisplayed()
      await expect(UsbAccessPage.requestModalTitleIcon).toBeDisplayed()
      await expect(UsbAccessPage.requestModalDescription).toBeDisplayed()
    })

    it("should display action controls", async () => {
      await expect(UsbAccessPage.requestModalCloseButton).toBeDisplayed()
      await expect(UsbAccessPage.requestModalButton).toBeDisplayed()
    })

    it("should open the Request Cancelled modal on clicking close button", async () => {
      await UsbAccessPage.requestModalCloseButton.click()
      await expect(UsbAccessPage.requestCancelledModal).toBeDisplayed()
    })
  })

  describe("Usb Access  Request Cancelled Modal", () => {
    it("should display modal header and icon", async () => {
      await expect(UsbAccessPage.requestCancelledModalTitle).toBeDisplayed()
      await expect(UsbAccessPage.requestCancelledModalTitleIcon).toBeDisplayed()
    })

    it("should display action controls", async () => {
      await expect(
        UsbAccessPage.requestCancelledModalCloseButton
      ).toBeDisplayed()
      await expect(UsbAccessPage.requestCancelledModalButton).toBeDisplayed()
    })

    it("should allows to close full screen layout when clicking ok modal button", async () => {
      await expect(AppInitPage.fullscreenLayoutCloseButton).not.toBeClickable()
      await UsbAccessPage.requestCancelledModalButton.waitForDisplayed()
      await UsbAccessPage.requestCancelledModalButton.click()
      await expect(UsbAccessPage.requestCancelledModal).not.toBeDisplayed()
      await expect(AppInitPage.fullscreenLayoutCloseButton).toBeClickable()
    })
  })
})
