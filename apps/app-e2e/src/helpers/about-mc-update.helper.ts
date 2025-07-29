/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { E2EMockClient } from "e2e-mock/client"
import { SetAppUpdaterPayload } from "app-updater/models"
import SettingsPage from "../page-objects/settings.page"
import McUpdatePage from "../page-objects/mc-update.page"
import AboutPage from "../page-objects/about.page"

export const simulateMcUpdateCheckFromAbout = async (
  payload: SetAppUpdaterPayload
) => {
  if (process.env.MOCK_SERVER_ENABLED === "1") {
    await E2EMockClient.connect()
    E2EMockClient.setAppUpdaterState(payload)
  }

  await SettingsPage.settingsMenuItem.click()
  await SettingsPage.aboutTab.click()
}

export const itBehavesLikeAboutTabBeforeManualCheck = () => {
  describe("Before Manual Check", () => {
    it("should display 'You're up to date.' label and 'CHECK FOR UPDATES' button", async () => {
      await expect(AboutPage.updateButton).toBeDisplayed()
      await expect(AboutPage.updateButton).toHaveText("CHECK FOR UPDATES")
      await expect(AboutPage.updateLabel).toBeDisplayed()
      await expect(AboutPage.updateLabel).toHaveText("You’re up to date.")
    })

    it("should trigger update check on button click", async () => {
      await AboutPage.updateButton.click()
    })
  })
}

export const itBehavesLikeCheckingModal = () => {
  describe("Update Checking Modal", () => {
    it("should display the checking modal with all elements", async () => {
      await expect(McUpdatePage.updateCheckingModalTitle).toBeDisplayed()
      await expect(McUpdatePage.updateCheckingModalTitleIcon).toBeDisplayed()
      await expect(McUpdatePage.updateCheckingModalCloseButton).toBeDisplayed()
      await expect(McUpdatePage.updateCheckingModalDescription).toBeDisplayed()
    })
  })
}

export const itBehavesLikeUpdateErrorModal = () => {
  describe("Update Error Modal", () => {
    it("should display the 'Update Error' modal with all elements", async () => {
      await expect(McUpdatePage.updateErrorModal).toBeDisplayed()
      await expect(McUpdatePage.updateErrorModalTitle).toBeDisplayed()
      await expect(McUpdatePage.updateErrorModalTitleIcon).toBeDisplayed()
      await expect(McUpdatePage.updateErrorModalDescription).toBeDisplayed()
      await expect(McUpdatePage.updateErrorModalButton).toBeDisplayed()
      await expect(McUpdatePage.updateErrorModalCloseButton).not.toBeDisplayed()
    })

    it("should trigger closing the modal on button click", async () => {
      await McUpdatePage.updateErrorModalButton.click()
    })
  })
}
