/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import SettingsPage from "../page-objects/settings.page"
import AboutPage from "../page-objects/about.page"

describe("About screen", () => {
  before(async () => {
    const settingsMenuItem = await SettingsPage.settingsMenuItem
    await settingsMenuItem.click()

    const aboutTab = await SettingsPage.aboutTab
    await aboutTab.click()
  })

  it("should display 'About' tab item as active", async () => {
    const activeMenuItem = await SettingsPage.activeMenuItem
    await expect(activeMenuItem).toHaveText("About")
    await expect(activeMenuItem).toHaveAttribute("href", "#/settings/about")
  })

  it("should display the About wrapper", async () => {
    const wrapper = await AboutPage.aboutWrapper
    await expect(wrapper).toBeDisplayed()
  })

  it("should show current app version", async () => {
    const versionRow = await AboutPage.installedVersionRow
    await expect(versionRow).toBeDisplayed()
    await expect(await versionRow.getText()).toMatch(/[\d]+\.[\d]+\.[\d]+/)
  })

  it("should show update button", async () => {
    const updateButton = await AboutPage.updateButton
    await expect(updateButton).toBeDisplayed()
    await expect(updateButton).toBeClickable()
  })

  it("should show Terms of Service button", async () => {
    const button = await AboutPage.termsOfServiceButton
    await expect(button).toBeDisplayed()
    await expect(button).toBeClickable()
    await expect(button).toHaveText("LEARN MORE")
  })

  it("should show Privacy Policy button", async () => {
    const button = await AboutPage.privacyPolicyButton
    await expect(button).toBeDisplayed()
    await expect(button).toBeClickable()
    await expect(button).toHaveText("LEARN MORE")
  })

  it("should show License button", async () => {
    const button = await AboutPage.licenseButton
    await expect(button).toBeDisplayed()
    await expect(button).toBeClickable()
    await expect(button).toHaveText("LEARN MORE")
  })
})
