/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */
import { sleep } from "../../helpers"
import HomePage from "../../page-objects/home.page"
import SettingsPage from "../../page-objects/settings.page"
import NavigationTabs from "../../page-objects/tabs.page"

describe("Open Settings and change backup location", () => {
  before(async function () {
    const notNowButton = await HomePage.notNowButton
    await notNowButton.waitForDisplayed()
    await notNowButton.click()
  })
  it("Verify default settings", async () => {
    const settingsTab = await NavigationTabs.settingsTab
    await settingsTab.waitForDisplayed()
    await settingsTab.click()

    const aboutTab = await SettingsPage.aboutTab
    await aboutTab.waitForDisplayed()

    await browser.pause(300000)
  })
  it("Change backup location to not existing folder", async () => {
    // Linux Windows MacOS split?
  })
  it("Change backup location to existing folder", async () => {})
})
