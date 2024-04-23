/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import SettingsPage from "../../page-objects/settings.page"
import NavigationTabs from "../../page-objects/tabs.page"
import ModalPage from "../../page-objects/mc-update-modal.page"
import HomePage from "../../page-objects/home.page"
import TestHelper from "../../helpers/tests.helper"
import dns from "node:dns"

describe("Checking for Mudita Center updates", () => {
  before(async function () {
    if (TestHelper.isLinux()) {
      this.skip()
    }

    dns.setDefaultResultOrder("ipv4first")
    await browser.throttle("offline")

    const notNowButton = await HomePage.notNowButton
    await notNowButton.waitForDisplayed()
    await notNowButton.click()
  })

  it("Open Settings -> About", async () => {
    const settingsTab = await NavigationTabs.settingsTab
    await settingsTab.waitForDisplayed()
    await settingsTab.click()

    const aboutTab = await SettingsPage.aboutTab
    await aboutTab.waitForDisplayed()
    await aboutTab.click()

    const aboutCheckForUpdateFailedLabel =
      await SettingsPage.aboutCheckForUpdateFailedLabel
    await browser.executeAsync((done) => {
      setTimeout(done, 10000)
    })
    await expect(aboutCheckForUpdateFailedLabel).toBeDisplayed()
    await expect(aboutCheckForUpdateFailedLabel).toHaveText(
      "Checking for updates failed"
    )
  })
})
