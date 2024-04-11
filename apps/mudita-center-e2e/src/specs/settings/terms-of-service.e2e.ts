/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import SettingsPage from "../../page-objects/settings.page"
import NavigationTabs from "../../page-objects/tabs.page"
import HomePage from "../../page-objects/home.page"
import ModalTermsOfServicePage from "../../page-objects/modal-terms-of-service.page"

describe("Checking Terms of service", () => {
  before(async function () {
    // Wait 10 seconds to allow the update checking process to potentially timeout.
    await browser.executeAsync((done) => {
      setTimeout(done, 10000)
    })

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

    const aboutTermsOfServiceTextLabel =
      await SettingsPage.aboutTermsOfServiceTextLabel
    await expect(aboutTermsOfServiceTextLabel).toHaveText("Terms of service")
  })

  it("Check Terms of service 'LEARN MORE' button", async () => {
    const aboutTermsOfServiceButton =
      await SettingsPage.aboutTermsOfServiceButton
    await expect(aboutTermsOfServiceButton).toHaveText("LEARN MORE")
    await aboutTermsOfServiceButton.click()

    await browser.switchWindow("#/terms-of-service")

    const modalHeader = await ModalTermsOfServicePage.modalHeader
    await modalHeader.waitForDisplayed()
    await expect(modalHeader).toHaveText("Mudita Center Terms of Use")
  })

  it("Check keywords", async () => {
    const firstParagraph = ModalTermsOfServicePage.firstParagraph
    await expect(firstParagraph).toHaveTextContaining(
      "National Court Register, entry no. 0000467620"
    )
    await expect(firstParagraph).toHaveTextContaining(
      "Tax Identification Number: 5252558282"
    )
    await expect(firstParagraph).toHaveTextContaining(
      "Statistical Identification Number: 14676767613"
    )
  })

  it("Check Terms of service sections", async () => {
    const sectionGeneralProvisions =
      await ModalTermsOfServicePage.sectionGeneralProvisions
    await expect(sectionGeneralProvisions).toHaveText("GENERAL PROVISIONS")

    const sectionPurposeAndUse =
      await ModalTermsOfServicePage.sectionPurposeAndUse
    await expect(sectionPurposeAndUse).toHaveText("PURPOSE AND USE OF THE APP")

    const sectionResponsibility =
      await ModalTermsOfServicePage.sectionResponsibility
    await expect(sectionResponsibility).toHaveText("RESPONSIBILITY")

    const sectionConditionsOfUse =
      await ModalTermsOfServicePage.sectionConditionsOfUse
    await expect(sectionConditionsOfUse).toHaveText("CONDITIONS OF USE")

    const sectionCommunication =
      await ModalTermsOfServicePage.sectionCommunication
    await expect(sectionCommunication).toHaveText("COMMUNICATION AND FEEDBACK")

    const sectionFinalProvisions =
      await ModalTermsOfServicePage.sectionFinalProvisions
    await expect(sectionFinalProvisions).toHaveText("FINAL PROVISIONS")
  })

  it("Check links", async () => {
    const companyWebsiteLink = await ModalTermsOfServicePage.companyWebsiteLink
    await expect(companyWebsiteLink).toHaveAttribute(
      "href",
      "https://www.mudita.com"
    )

    const emailLink = await ModalTermsOfServicePage.companyEmailLink
    await expect(emailLink).toHaveAttribute("href", "mailto:hello@mudita.com")

    const privacyPolicyLink = await ModalTermsOfServicePage.privacyPolicyLink
    await expect(privacyPolicyLink).toHaveAttribute(
      "href",
      "https://mudita.com/legal/privacy-policy/mudita-center/"
    )

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
