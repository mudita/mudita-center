/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  itBehavesLikeProcessingModal,
  itBehavesLikeRequestModal,
  simulateAppInitUsbAccessStep,
} from "../helpers/usb-access.helper"
import UsbAccessPage from "../page-objects/usb-access.page"
import { SPEC_TITLE } from "../consts/spec-title"
import AppInitPage from "../page-objects/app-init.page"
import testsHelper from "../helpers/tests.helper"

describe(SPEC_TITLE.APP_INIT_USB_ACCESS_HAPPY_PATH, () => {
  before(async function () {
    if (!testsHelper.isLinux()) {
      this.skip()
    }
    await simulateAppInitUsbAccessStep({
      serialPortAccess: false,
      grantAccessToSerialPortResult: true,
    })
  })

  itBehavesLikeRequestModal()
  itBehavesLikeProcessingModal()

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
