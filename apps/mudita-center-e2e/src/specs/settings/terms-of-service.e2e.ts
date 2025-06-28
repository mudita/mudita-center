/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import SettingsPage from "../../page-objects/settings.page"
import NavigationTabs from "../../page-objects/tabs.page"
import HomePage from "../../page-objects/home.page"
import ModalTermsOfServicePage from "../../page-objects/modal-terms-of-service.page"
import ModalPage from "../../page-objects/modal.page"
import { sleep } from "../../helpers/sleep.helper"
import testsHelper from "../../helpers/tests.helper"

describe("Checking Terms of service", () => {
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

    const aboutTermsOfServiceTextLabel =
      await SettingsPage.aboutTermsOfServiceTextLabel
    await expect(aboutTermsOfServiceTextLabel).toHaveText("Terms of service")
  })

  it("Check Terms of service 'LEARN MORE' button", async () => {
    if (testsHelper.isLinux()) {
      sleep(5000)
    }

    const aboutTermsOfServiceButton =
      await SettingsPage.aboutTermsOfServiceButton

    await expect(aboutTermsOfServiceButton).toHaveText("LEARN MORE")
    await aboutTermsOfServiceButton.click()

    await browser.switchWindow("#/terms-of-service")

    const modalHeader = await ModalTermsOfServicePage.modalHeader
    await modalHeader.waitForDisplayed()
    await expect(modalHeader).toHaveText("Mudita Center Terms of Service")
  })

  it("Check Terms of service sections", async () => {
    const sectionGeneralProvisions =
      await ModalTermsOfServicePage.sectionGeneralProvisions
    await expect(sectionGeneralProvisions).toHaveText("2. GENERAL PROVISIONS")

    const sectionServices = await ModalTermsOfServicePage.sectionServices
    await expect(sectionServices).toHaveText(
      "3. SERVICES / MUDITA CENTER FEATURES"
    )

    const sectionIntellectualProperty =
      await ModalTermsOfServicePage.sectionIntellectualProperty
    await expect(sectionIntellectualProperty).toHaveText(
      "4. INTELLECTUAL PROPERTY / LICENSE"
    )

    const sectionUpdates = await ModalTermsOfServicePage.sectionUpdates
    await expect(sectionUpdates).toHaveText("5. UPDATES")

    const sectionHealthDisclaimer =
      await ModalTermsOfServicePage.sectionHealthDisclaimer
    await expect(sectionHealthDisclaimer).toHaveText("6. HEALTH DISCLAIMER")

    const sectionUserObligations =
      await ModalTermsOfServicePage.sectionUserObligations
    await expect(sectionUserObligations).toHaveText("7. USER OBLIGATIONS")

    const sectionLiability = await ModalTermsOfServicePage.sectionLiability
    await expect(sectionLiability).toHaveText("8. LIABILITY")

    const sectionTerminationOfTheTerms =
      await ModalTermsOfServicePage.sectionTerminationOfTheTerms
    await expect(sectionTerminationOfTheTerms).toHaveText(
      "9. TERMINATION OF THE TERMS OF SERVICE"
    )

    const sectionComplaints = await ModalTermsOfServicePage.sectionComplaints
    await expect(sectionComplaints).toHaveText("10. COMPLAINTS")

    const sectionDisputeResolution =
      await ModalTermsOfServicePage.sectionDisputeResolution
    await expect(sectionDisputeResolution).toHaveText("11. DISPUTE RESOLUTION")

    const sectionAmendments = await ModalTermsOfServicePage.sectionAmendments
    await expect(sectionAmendments).toHaveText("12. AMENDMENTS")

    const sectinonApplicableLaw =
      await ModalTermsOfServicePage.sectinonApplicableLaw
    await expect(sectinonApplicableLaw).toHaveText(
      "13. APPLICABLE LAW / LANGUAGE VERSIONS"
    )

    const sectionFinalProvisions =
      await ModalTermsOfServicePage.sectionFinalProvisions
    await expect(sectionFinalProvisions).toHaveText("14. FINAL PROVISIONS")
  })

  it("Check links", async () => {
    const companyWebsiteLink = await ModalTermsOfServicePage.companyWebsiteLink
    await expect(companyWebsiteLink).toHaveAttribute(
      "href",
      "https://mudita.com/legal/terms-conditions/mudita-center/"
    )

    const emailLink = await ModalTermsOfServicePage.companyEmailLink
    await expect(emailLink).toHaveAttribute("href", "mailto:hello@mudita.com")

    const termsConditionsLink =
      await ModalTermsOfServicePage.termsConditionsLink
    await expect(termsConditionsLink).toHaveAttribute(
      "href",
      "https://mudita.com/legal/terms-conditions/mudita-center/"
    )
  })

  it("Check content after scroll", async () => {
    const sectionFinalProvisions =
      await ModalTermsOfServicePage.sectionFinalProvisions
    await sectionFinalProvisions.scrollIntoView()
    const termsConditionsLink =
      await ModalTermsOfServicePage.termsConditionsLink
    await expect(termsConditionsLink).toBeDisplayedInViewport
    const modalHeader = await ModalTermsOfServicePage.modalHeader
    await expect(modalHeader).not.toBeDisplayedInViewport()
  })

  it("Close modal", async () => {
    const windowCountBefore = await browser.getWindowHandles()
    expect(windowCountBefore.length).toBe(2)
    await browser.closeWindow()
    const windowCountAfter = await browser.getWindowHandles()
    expect(windowCountAfter.length).toBe(1)
  })
})
