/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import HomePage from "../../page-objects/home.page"
import SettingsPage from "../../page-objects/settings.page"
import NavigationTabs from "../../page-objects/tabs.page"

describe("Open Settings and check if change location button is clickable", () => {
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

    const changeLocationButton = await SettingsPage.changeLocationButton
    await changeLocationButton.waitForClickable()
  })
  it("Verify default backup location", async () => {
    const backupLocationValue = await SettingsPage.backupLocationValue
    await backupLocationValue.waitForDisplayed()

    await expect(backupLocationValue).toHaveText(
      /^(\/{1}|C\:\\)(Users|home).*(\/Library\/Application Support|\/.config|\\AppData\\Roaming)(\/@mudita\/mudita-center-app|\\@mudita\\mudita-center-app).*/gm
    )
  })
})
