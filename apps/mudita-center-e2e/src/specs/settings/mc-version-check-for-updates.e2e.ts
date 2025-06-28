/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import SettingsPage from "../../page-objects/settings.page"
import NavigationTabs from "../../page-objects/tabs.page"
import ModalPage from "../../page-objects/mc-update-modal.page"
import HomePage from "../../page-objects/home.page"
import TestHelper from "../../helpers/tests.helper"

describe("Checking for Mudita Center updates", () => {
  before(async function () {
    if (TestHelper.isLinux()) {
      this.skip()
    }
    const notNowButton = await HomePage.notNowButton
    await notNowButton.waitForDisplayed()
    await notNowButton.click()
  })

  it("Application is up to date", async () => {
    const settingsTab = await NavigationTabs.settingsTab
    await settingsTab.waitForDisplayed()
    await settingsTab.click()

    const aboutTab = await SettingsPage.aboutTab
    await aboutTab.waitForDisplayed()
    await aboutTab.click()

    const aboutUpToDateLabel = await SettingsPage.aboutUpToDateLabel
    await expect(aboutUpToDateLabel).toBeDisplayed()
    await expect(aboutUpToDateLabel).toHaveText("You’re up to date.")
  })

  it("Check 'Check for updates' button", async () => {
    const aboutCheckForUpdatesButton =
      await SettingsPage.aboutCheckForUpdatesButton
    await aboutCheckForUpdatesButton.waitForDisplayed()
    await expect(aboutCheckForUpdatesButton).toHaveTextContaining(
      "CHECK FOR UPDATES"
    )
    await aboutCheckForUpdatesButton.click()

    const modalHeader = await ModalPage.modalHeader
    await expect(modalHeader).toBeDisplayed()
    await expect(modalHeader).toHaveText("Mudita Center")
  })

  it("Check for updates", async () => {
    // Waiting to check if an update is available
    await browser.executeAsync((done) => {
      setTimeout(done, 10000)
    })
    const modalContentUpToDate = await ModalPage.updateNotAvailable
    await expect(modalContentUpToDate).toBeDisplayed()
    await expect(modalContentUpToDate).toHaveTextContaining(
      "Your Mudita Center is up to date!"
    )
  })
})
