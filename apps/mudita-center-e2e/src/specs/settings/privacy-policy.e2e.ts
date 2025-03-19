/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import SettingsPage from "../../page-objects/settings.page"
import NavigationTabs from "../../page-objects/tabs.page"
import HomePage from "../../page-objects/home.page"
import modalPrivacyPolicyPage from "../../page-objects/modal-privacy-policy.page"
import ModalPage from "../../page-objects/modal.page"
import { sleep } from "../../helpers/sleep.helper"
import testsHelper from "../../helpers/tests.helper"

describe("Checking Privacy Policy", () => {
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

    const aboutPrivacyPolicyTextLabel =
      await SettingsPage.aboutPrivacyPolicyTextLabel
    await expect(aboutPrivacyPolicyTextLabel).toHaveText("Privacy Policy")
  })

  it("Check Privacy Policy 'LEARN MORE' button", async () => {
    if (testsHelper.isLinux()) {
      sleep(5000)
    }

    const aboutPrivacyPolicyButton = await SettingsPage.aboutPrivacyPolicyButton
    await expect(aboutPrivacyPolicyButton).toHaveText("LEARN MORE")
    await aboutPrivacyPolicyButton.click()

    await browser.switchWindow("#/privacy-policy")

    const modalHeader = await modalPrivacyPolicyPage.modalHeader
    await modalHeader.waitForDisplayed()
    await expect(modalHeader).toHaveText("Mudita Center Privacy Policy")
  })

  it("Check keywords", async () => {
    const firstParagraph = modalPrivacyPolicyPage.firstPoint
    await expect(firstParagraph).toHaveTextContaining("KRS no: 0000467620")
    await expect(firstParagraph).toHaveTextContaining(
      "Tax Identification Number: 5252558282"
    )
  })

  it("Check Privacy Policy sections", async () => {
    const sectionAboutDocument =
      await modalPrivacyPolicyPage.sectionAboutDocument
    await expect(sectionAboutDocument).toHaveText("1. ABOUT DOCUMENT")

    const sectionDataController =
      await modalPrivacyPolicyPage.sectionDataController
    await expect(sectionDataController).toHaveText("2. DATA CONTROLLER")

    const sectionContact = await modalPrivacyPolicyPage.sectionContact
    await expect(sectionContact).toHaveText("3. CONTACT")

    const sectionPurposesAndLegalBasis =
      await modalPrivacyPolicyPage.sectionPurposesAndLegalBasis
    await expect(sectionPurposesAndLegalBasis).toHaveText(
      "4. PURPOSES AND LEGAL BASIS FOR THE PROCESSING OF YOUR PERSONAL DATA / RETENTION PERIOD"
    )

    const sectionDataRecipients =
      await modalPrivacyPolicyPage.sectionDataRecipients
    await expect(sectionDataRecipients).toHaveText("5. DATA RECIPIENTS")

    const sectionAutomatedIndividual =
      await modalPrivacyPolicyPage.sectionAutomatedIndividual
    await expect(sectionAutomatedIndividual).toHaveText(
      "6. AUTOMATED INDIVIDUAL DECISION-MAKING / PROFILING"
    )

    const sectionRightsOfTheData =
      await modalPrivacyPolicyPage.sectionRightsOfTheData
    await expect(sectionRightsOfTheData).toHaveText(
      "7. RIGHTS OF THE DATA SUBJECTS"
    )

    const sectionTransferOfPersonalData =
      await modalPrivacyPolicyPage.sectionTransferOfPersonalData
    await expect(sectionTransferOfPersonalData).toHaveText(
      "8. TRANSFER OF PERSONAL DATA TO THIRD COUNTRIES"
    )

    const sectionOtherInformations =
      await modalPrivacyPolicyPage.sectionOtherInformations
    await expect(sectionOtherInformations).toHaveText(
      "9. OTHER INFORMATIONS ABOUR YOUR PRIVACY / BACKUP / MANAGE MUDITA DEVICE"
    )

    const sectionFinalProvisions =
      await modalPrivacyPolicyPage.sectionFinalProvisions
    await expect(sectionFinalProvisions).toHaveText("10. FINAL PROVISIONS")
  })

  it("Check content after scroll", async () => {
    const firstColumnHeader =
      await modalPrivacyPolicyPage.sectionFinalProvisions
    await firstColumnHeader.scrollIntoView()
    const purposesQuestion = await modalPrivacyPolicyPage.privacyPolicyVersion
    await expect(purposesQuestion).toBeDisplayedInViewport
    const accessQuestion =
      await modalPrivacyPolicyPage.rightsToAmendPrivacyPolicy
    await expect(accessQuestion).toBeDisplayedInViewport
  })

  it("Close modal", async () => {
    const windowCountBefore = await browser.getWindowHandles()
    expect(windowCountBefore.length).toBe(2)
    await browser.closeWindow()
    const windowCountAfter = await browser.getWindowHandles()
    expect(windowCountAfter.length).toBe(1)
  })
})
