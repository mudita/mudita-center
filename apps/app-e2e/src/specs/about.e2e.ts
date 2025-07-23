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

    await browser.waitUntil(async () => {
      const activeMenuItem = await SettingsPage.activeMenuItem
      return (await activeMenuItem.getText()) === "About"
    })
  })

  it("should display the 'About' tab as active", async () => {
    const activeMenuItem = await SettingsPage.activeMenuItem
    await expect(activeMenuItem).toHaveText("About")
    await expect(activeMenuItem).toHaveAttribute("href", "#/settings/about")
  })

  it("should display the About wrapper", async () => {
    const wrapper = await AboutPage.aboutWrapper
    await expect(wrapper).toBeDisplayed()
  })

  it("should display the current application version", async () => {
    const versionRow = await AboutPage.installedVersionRow
    await expect(versionRow).toBeDisplayed()
    await expect(await versionRow.getText()).toMatch(/[\d]+\.[\d]+\.[\d]+/)
  })

  it("should display the Update button", async () => {
    const updateButton = await AboutPage.updateButton
    await expect(updateButton).toBeDisplayed()
    await expect(updateButton).toBeClickable()
  })

  it("should display the Terms of Service button", async () => {
    const button = await AboutPage.termsOfServiceButton
    await expect(button).toBeDisplayed()
    await expect(button).toBeClickable()
    await expect(button).toHaveText("LEARN MORE")
  })

  it("should display the Privacy Policy button", async () => {
    const button = await AboutPage.privacyPolicyButton
    await expect(button).toBeDisplayed()
    await expect(button).toBeClickable()
    await expect(button).toHaveText("LEARN MORE")
  })

  it("should display the License button", async () => {
    const button = await AboutPage.licenseButton
    await expect(button).toBeDisplayed()
    await expect(button).toBeClickable()
    await expect(button).toHaveText("LEARN MORE")
  })
})
