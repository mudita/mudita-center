/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import SettingsPage from "../../page-objects/settings.page"
import NavigationTabs from "../../page-objects/tabs.page"
import HomePage from "../../page-objects/home.page"
import ModalLicense from "../../page-objects/modal-license.page"
import ModalPage from "../../page-objects/modal.page"

describe("Checking License", () => {
  before(async function () {
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

    // Wait 15 seconds to allow the update checking process to potentially timeout.
    const modalOverlay = await ModalPage.modalOverlay
    await modalOverlay.waitForDisplayed({ timeout: 15000, reverse: true })

    const aboutLicenseTextLabel = await SettingsPage.aboutLicenseTextLabel
    await expect(aboutLicenseTextLabel).toHaveText("License")
  })

  it("Check License 'LEARN MORE' button", async () => {
    const aboutLicenseButton = await SettingsPage.aboutLicenseButton
    await expect(aboutLicenseButton).toHaveText("LEARN MORE")
    await aboutLicenseButton.click()

    await browser.switchWindow("#/license")

    const modalHeader = await ModalLicense.modalHeader
    await modalHeader.waitForDisplayed()
    await expect(modalHeader).toHaveText("Notice for Mudita Center")
  })

  it("Check License sections", async () => {
    const firstParagraph = ModalLicense.firstParagraph
    await expect(firstParagraph).toHaveTextContaining(
      "Please note that we provide an open source software notice with this app. "
    )

    const sectionWarrantyDisclaimer =
      await ModalLicense.sectionWarrantyDisclaimer
    await expect(sectionWarrantyDisclaimer).toHaveText("WARRANTY DISCLAIMER")

    const sectionNoticeForFile = await ModalLicense.sectionNoticeForFile
    await expect(sectionNoticeForFile).toHaveText("Notice for file(s):")
  })

  it("Check content after scroll", async () => {
    const zodLibrarySection = await ModalLicense.zodLibrarySection
    await zodLibrarySection.scrollIntoView()
    await expect(zodLibrarySection).toBeDisplayedInViewport
    const zodLibraryCopyrightSection =
      await ModalLicense.zodLibraryCopyrightSection
    await expect(zodLibraryCopyrightSection).not.toBeDisplayedInViewport
  })

  it("Close modal", async () => {
    const windowCountBefore = await browser.getWindowHandles()
    expect(windowCountBefore.length).toBe(2)
    await browser.closeWindow()
    const windowCountAfter = await browser.getWindowHandles()
    expect(windowCountAfter.length).toBe(1)
  })
})
