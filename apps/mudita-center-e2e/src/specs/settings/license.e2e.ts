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
    await expect(modalHeader).toHaveText(
      "Mudita Center Software – Terms of Use"
    )
  })

  it("Check keywords", async () => {
    const muditaDefinition = ModalLicense.muditaDefinition
    await expect(muditaDefinition).toHaveTextContaining("0000467620")
    await expect(muditaDefinition).toHaveTextContaining("5252558282")
    await expect(muditaDefinition).toHaveTextContaining(
      "Jana Czeczota 6, 02- 607 Warsaw, Poland"
    )
  })

  it("Check License sections", async () => {
    const definitionsParagraph = await ModalLicense.definitionsParagraph
    await expect(definitionsParagraph).toHaveText("Definitions:")

    const licenseTermsParagraph = await ModalLicense.licenseTermsParagraph
    await expect(licenseTermsParagraph).toHaveText("License terms:")

    const transferOfDataParagraph = await ModalLicense.transferOfDataParagraph
    await expect(transferOfDataParagraph).toHaveText("Transfer of data:")

    const limitationParagraph = await ModalLicense.limitationParagraph
    await expect(limitationParagraph).toHaveText("Limitation of liability:")

    const copyrightParagraph = await ModalLicense.copyrightParagraph
    await expect(copyrightParagraph).toHaveText(
      "Copyright / Third-party services:"
    )

    const amendmentsParagraph = await ModalLicense.amendmentsParagraph
    await expect(amendmentsParagraph).toHaveText("Amendments to the Terms:")

    const applicableLawParagraph = await ModalLicense.applicableLawParagraph
    await expect(applicableLawParagraph).toHaveText("Applicable law:")
  })

  it("Check content after scroll", async () => {
    const copyrightParagraph = await ModalLicense.copyrightParagraph
    await copyrightParagraph.scrollIntoView()
    await expect(copyrightParagraph).toBeDisplayedInViewport
    const definitionsParagraph = await ModalLicense.definitionsParagraph
    await expect(definitionsParagraph).not.toBeDisplayedInViewport
  })

  it("Close modal", async () => {
    const windowCountBefore = await browser.getWindowHandles()
    expect(windowCountBefore.length).toBe(2)
    await browser.closeWindow()
    const windowCountAfter = await browser.getWindowHandles()
    expect(windowCountAfter.length).toBe(1)
  })
})
