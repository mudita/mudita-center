/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import SettingsPage from "../page-objects/settings.page"

describe("Settings - Backup screen", () => {
  before(async () => {
    const settingsMenuItem = await SettingsPage.settingsMenuItem
    await settingsMenuItem.click()
  })

  it("should be opened", async () => {
    const pageUrl = await SettingsPage.getPageUrl()
    expect(pageUrl).toBe("/settings/backup")
  })

  it("should have proper title in app header", async () => {
    const settingsHeader = await SettingsPage.appHeader
    expect(await settingsHeader.getText()).toBe("Settings")
  })

  it("should have 'Backup' tab active", async () => {
    const activeHeaderTab = await SettingsPage.activeHeaderTab
    const activeTabName = await activeHeaderTab.$(".//p")
    expect(await activeTabName.getText()).toBe("Backup")
  })

  it("should display a correct backup location", async () => {
    const backupLocation = await SettingsPage.backupLocation
    const appInstancePath = await SettingsPage.getInstancePath()

    expect(await backupLocation.getText()).toBe(`${appInstancePath}/backups`)
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
  })

  it("should have 'About' tab active", async () => {
    const activeHeaderTab = await SettingsPage.activeHeaderTab
    const activeTabName = await activeHeaderTab.$(".//p")
    expect(await activeTabName.getText()).toBe("About")
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
