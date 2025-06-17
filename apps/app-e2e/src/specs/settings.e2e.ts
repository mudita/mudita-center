/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import path from "path"
import SettingsPage from "../page-objects/settings.page"

describe("Settings - Backup screen", () => {
  before(async () => {
    const settingsMenuItem = await SettingsPage.settingsMenuItem
    await settingsMenuItem.click()

    await browser.waitUntil(async () => {
      const pageUrl = await SettingsPage.getPageUrl()
      return pageUrl === "/settings/backup"
    })
  })

  it("should be opened on 'Backup' tab", async () => {
    const backupTab = await SettingsPage.backupTab
    expect(backupTab).toHaveAttribute("aria-current", "page")
  })

  it("should have proper title in app header", async () => {
    const settingsHeader = await SettingsPage.appHeader
    expect(await settingsHeader.getText()).toBe("Settings")
  })

  it("should display a correct backup location", async () => {
    const backupLocation = await SettingsPage.backupLocation
    const appInstancePath = await SettingsPage.getInstancePath()

    expect(await backupLocation.getText()).toBe(
      path.join(appInstancePath, "backups")
    )
  })

  it("should show a location changing button", async () => {
    const changeButton = await SettingsPage.changeBackupLocationButton
    await expect(changeButton).toBeDisplayed()
    await expect(changeButton).toBeClickable()
    await expect(changeButton).toHaveText("CHANGE LOCATION")
  })
})

describe("Settings - About screen", () => {
  before(async () => {
    const aboutTab = await SettingsPage.aboutTab
    await aboutTab.click()

    await browser.waitUntil(async () => {
      const pageUrl = await SettingsPage.getPageUrl()
      return pageUrl === "/settings/backup"
    })
  })

  it("should be opened on 'About' tab", async () => {
    const aboutTab = await SettingsPage.aboutTab

    expect(aboutTab).toHaveAttribute("aria-current", "page")
  })

  it("should show current app version", async () => {
    const versionRow = await SettingsPage.installedVersionRow
    await expect(versionRow).toBeDisplayed()
    await expect(await versionRow.getText()).toMatch(/[\d]+\.[\d]+\.[\d]+/)
  })

  it("should show update button", async () => {
    const updateButton = await SettingsPage.updateButton
    await expect(updateButton).toBeDisplayed()
    await expect(updateButton).toBeClickable()
  })

  it("should show Terms of Service button", async () => {
    const button = await SettingsPage.termsOfServiceButton
    await expect(button).toBeDisplayed()
    await expect(button).toBeClickable()
    await expect(button).toHaveText("LEARN MORE")
  })

  it("should show Privacy Policy button", async () => {
    const button = await SettingsPage.privacyPolicyButton
    await expect(button).toBeDisplayed()
    await expect(button).toBeClickable()
    await expect(button).toHaveText("LEARN MORE")
  })

  it("should show License button", async () => {
    const button = await SettingsPage.licenseButton
    await expect(button).toBeDisplayed()
    await expect(button).toBeClickable()
    await expect(button).toHaveText("LEARN MORE")
  })
})
