/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { simulateAppInitUsbAccessStep } from "../helpers/usb-access.helper"
import UsbAccessPage from "../page-objects/usb-access.page"
import { SPEC_TITLE } from "../consts/spec-title"
import AppInitPage from "../page-objects/app-init.page"

describe(SPEC_TITLE.APP_INIT_USB_ACCESS_HAPPY_PATH, () => {
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

    it("should open the Processing modal on clicking allow button", async () => {
      await UsbAccessPage.requestModalButton.click()
      await expect(UsbAccessPage.processingModal).toBeDisplayed()
    })
  })

  describe("Usb Access Processing Modal", () => {
    it("should display modal header and icon", async () => {
      await expect(UsbAccessPage.processingModalTitle).toBeDisplayed()
      await expect(UsbAccessPage.processingModalTitleIcon).toBeDisplayed()
    })

    it("should not show close button while processing", async () => {
      await expect(UsbAccessPage.processingModalCloseButton).not.toBeDisplayed()
    })
  })

  describe("Usb Access Granted Modal Modal", () => {
    it("should display all core modal elements", async () => {
      await expect(UsbAccessPage.grantedModal).toBeDisplayed()
      await expect(UsbAccessPage.grantedModalTitle).toBeDisplayed()
      await expect(UsbAccessPage.grantedModalTitleIcon).toBeDisplayed()
      await expect(UsbAccessPage.grantedModalDescription).toBeDisplayed()
    })

    it("should display action controls", async () => {
      await expect(UsbAccessPage.grantedModalCloseButton).toBeDisplayed()
      await expect(UsbAccessPage.grantedModalButton).toBeDisplayed()
    })

    it("should allows to close full screen layout when clicking ok modal button", async () => {
      await expect(AppInitPage.fullscreenLayoutCloseButton).not.toBeClickable()
      await UsbAccessPage.grantedModalButton.waitForDisplayed()
      await UsbAccessPage.grantedModalButton.click()
      await expect(UsbAccessPage.grantedModal).not.toBeDisplayed()
      await expect(AppInitPage.fullscreenLayoutCloseButton).toBeClickable()
    })
  })
})
