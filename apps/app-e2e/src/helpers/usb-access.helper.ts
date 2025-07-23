/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { E2EMockClient } from "e2e-mock/client"
import { SetUsbAccessPayload } from "app-init/models"
import AppInitPage from "../page-objects/app-init.page"
import UsbAccessPage from "../page-objects/usb-access.page"

export const simulateAppInitUsbAccessStep = async (
  payload: SetUsbAccessPayload
) => {
  // should open USB Access Modal
  if (process.env.MOCK_SERVER_ENABLED === "1") {
    await E2EMockClient.connect()

    E2EMockClient.setUsbAccess(payload)
  }
  await AppInitPage.acceptPrivacyPolicy()
}

export const itBehavesLikeRequestModal = () => {
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

    it("should open the Processing modal upon allowing", async () => {
      await UsbAccessPage.requestModalButton.click()
      await expect(UsbAccessPage.processingModal).toBeDisplayed()
    })
  })
}

export const itBehavesLikeProcessingModal = () => {
  describe("Usb Access Processing Modal", () => {
    it("should display the modal header and icon", async () => {
      await expect(UsbAccessPage.processingModalTitle).toBeDisplayed()
      await expect(UsbAccessPage.processingModalTitleIcon).toBeDisplayed()
    })

    it("should hide the close button during processing", async () => {
      await expect(UsbAccessPage.processingModalCloseButton).not.toBeDisplayed()
    })
  })
}

export const itBehavesLikeRequestCancelledModal = () => {
  describe("Usb Access Request Cancelled Modal", () => {
    it("should display the modal header and icon", async () => {
      await expect(UsbAccessPage.requestCancelledModalTitle).toBeDisplayed()
      await expect(UsbAccessPage.requestCancelledModalTitleIcon).toBeDisplayed()
    })

    it("should display the action controls", async () => {
      await expect(
        UsbAccessPage.requestCancelledModalCloseButton
      ).toBeDisplayed()
      await expect(UsbAccessPage.requestCancelledModalButton).toBeDisplayed()
    })

    it("should allow closing the full‑screen layout via the OK button", async () => {
      await expect(AppInitPage.fullscreenLayoutCloseButton).not.toBeClickable()
      await UsbAccessPage.requestCancelledModalButton.waitForDisplayed()
      await UsbAccessPage.requestCancelledModalButton.click()
      await expect(UsbAccessPage.requestCancelledModal).not.toBeDisplayed()
      await expect(AppInitPage.fullscreenLayoutCloseButton).toBeClickable()
    })
  })
}
