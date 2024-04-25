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

    const changeLocationButton = await SettingsPage.changeLocationButton
    await changeLocationButton.waitForClickable()
  })
  it("Verify default backup location", async () => {
    const changeLocationValue = await SettingsPage.changeLocationValue
    await changeLocationValue.waitForDisplayed()

    await expect(changeLocationValue).toHaveTextContaining(
      /^(\/{1}|C\:\\)(Users|home).*(\/Library\/Application Support|\/.config|\\AppData\\Roaming)(\/@mudita\/mudita-center-app|\\@mudita\\mudita-center-app).*/gm
    )
  })
})
