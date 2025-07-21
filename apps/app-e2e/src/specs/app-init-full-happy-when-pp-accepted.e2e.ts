/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { SPEC_TITLE } from "../consts/spec-title"
import { mockAppSettings } from "../helpers/mock-app-settings"
import PrivacyPolicyPage from "../page-objects/privacy-policy.page"
import AppInitPage from "../page-objects/app-init.page"
import { E2EMockClient } from "e2e-mock/client"
import McUpdatePage from "../page-objects/mc-update.page"
import testsHelper from "../helpers/tests.helper"
import UsbAccessPage from "../page-objects/usb-access.page"

describe(SPEC_TITLE.APP_INIT_FULL_HAPPY_FLOW_WHEN_PP_ACCEPTED, () => {
  before(async () => {
    await E2EMockClient.connect()
    const version = "5.0.0"
    await mockAppSettings({
      user: {
        privacyPolicyAccepted: true,
      },
    })
    McUpdatePage.setUpdateAvailableModal({ version })
    E2EMockClient.setAppUpdaterCheckResult({ version, forced: false })
    E2EMockClient.setUsbAccess({
      serialPortAccess: false,
      grantAccessToSerialPortResult: true,
    })
  })

  it("should display Available Update Modal when privacy policy modal already accepted", async () => {
    await expect(PrivacyPolicyPage.privacyPolicyModal).not.toBeDisplayed()
    await expect(McUpdatePage.updateAvailableModal).toBeDisplayed()
    await expect(McUpdatePage.updateAvailableModalCloseButton).toBeDisplayed()
  })

  it("should display USB Access Request Modal after click close button of Available Update Modal", async function () {
    if (!testsHelper.isLinux()) {
      this.skip()
    }
    await McUpdatePage.updateAvailableModalCloseButton.click()
    await expect(UsbAccessPage.requestModal).toBeDisplayed()
  })

  it("should open the Request Cancelled modal on clicking close button", async function () {
    if (!testsHelper.isLinux()) {
      this.skip()
    }
    await UsbAccessPage.requestModalCloseButton.click()
    await expect(UsbAccessPage.requestCancelledModal).toBeDisplayed()
  })

  it("should allow to close full screen layout when clicking ok modal button", async () => {
    if (!testsHelper.isLinux()) {
      await expect(AppInitPage.fullscreenLayoutCloseButton).not.toBeClickable()
      await McUpdatePage.updateAvailableModalCloseButton.click()
      await expect(AppInitPage.fullscreenLayoutCloseButton).toBeClickable()
    } else {
      await expect(AppInitPage.fullscreenLayoutCloseButton).not.toBeClickable()
      await UsbAccessPage.requestCancelledModalButton.waitForDisplayed()
      await UsbAccessPage.requestCancelledModalButton.click()
      await expect(UsbAccessPage.requestCancelledModal).not.toBeDisplayed()
      await expect(AppInitPage.fullscreenLayoutCloseButton).toBeClickable()
    }
  })
})
