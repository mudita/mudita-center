/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { E2EMockClient } from "e2e-mock/client"
import McUpdatePage from "../page-objects/mc-update.page"
import AppInitPage from "../page-objects/app-init.page"
import UsbAccessPage from "../page-objects/usb-access.page"
import testsHelper from "../helpers/tests.helper"

describe("App Init - Full Happy Path", () => {
  before(async () => {
    await E2EMockClient.connect()
    const version = "5.0.0"
    McUpdatePage.setUpdateAvailableModal({ version })
    E2EMockClient.setAppUpdaterState({ check: { version, forced: false } })
    E2EMockClient.setUsbAccess({
      serialPortAccess: false,
      grantAccessToSerialPortResult: true,
    })
  })

  it("should display the Privacy Policy on app start", async () => {
    await AppInitPage.privacyPolicyModal.waitForDisplayed()
    await expect(AppInitPage.privacyPolicyModal).toBeDisplayed()
  })

  it("should display the Available Update Modal after agreeing to the Privacy Policy", async () => {
    await AppInitPage.privacyPolicyAcceptButton.click()
    await expect(McUpdatePage.updateAvailableModal).toBeDisplayed()
    await expect(McUpdatePage.updateAvailableModalCloseButton).toBeDisplayed()
  })

  it("should display the USB Access Request Modal after closing the Available Update Modal", async function () {
    if (!testsHelper.isLinux()) {
      this.skip()
    }
    await McUpdatePage.updateAvailableModalCloseButton.waitForClickable({
      timeout: 10000,
    })
    await McUpdatePage.updateAvailableModalCloseButton.click()

    await UsbAccessPage.requestModal.waitForDisplayed({ timeout: 10000 })
    await expect(UsbAccessPage.requestModal).toBeDisplayed()
  })

  it("should open the Request Cancelled Modal when clicking the close button in the USB Access Request Modal", async function () {
    if (!testsHelper.isLinux()) {
      this.skip()
    }
    await UsbAccessPage.requestModalCloseButton.waitForClickable({
      timeout: 10000,
    })
    await UsbAccessPage.requestModalCloseButton.click()
    await UsbAccessPage.requestCancelledModal.waitForDisplayed({
      timeout: 10000,
    })
    await expect(UsbAccessPage.requestCancelledModal).toBeDisplayed()
  })

  it("should allow closing the full-screen layout via the OK button in the modal", async () => {
    if (!testsHelper.isLinux()) {
      await expect(AppInitPage.fullscreenLayoutCloseButton).not.toBeClickable()
      await McUpdatePage.updateAvailableModalCloseButton.waitForClickable({
        timeout: 10000,
      })
      await McUpdatePage.updateAvailableModalCloseButton.click()
      await AppInitPage.fullscreenLayoutCloseButton.waitForClickable({
        timeout: 10000,
      })
      await expect(AppInitPage.fullscreenLayoutCloseButton).toBeClickable()
    } else {
      await AppInitPage.fullscreenLayoutCloseButton.waitForClickable({
        reverse: true,
        timeout: 10000,
      })
      await UsbAccessPage.requestCancelledModalButton.waitForDisplayed()
      await UsbAccessPage.requestCancelledModalButton.waitForClickable({
        timeout: 10000,
      })
      await UsbAccessPage.requestCancelledModalButton.click()
      await UsbAccessPage.requestCancelledModal.waitForDisplayed({
        reverse: true,
      })
      await AppInitPage.fullscreenLayoutCloseButton.waitForClickable({
        timeout: 10000,
      })
      await expect(AppInitPage.fullscreenLayoutCloseButton).toBeClickable()
    }
  })
})
