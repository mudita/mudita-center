/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import SettingsPage from "../../page-objects/settings.page"
import NavigationTabs from "../../page-objects/tabs.page"
import HomePage from "../../page-objects/home.page"
import modalPrivacyPolicyPage from "../../page-objects/modal-privacy-policy.page"
import ModalPage from "../../page-objects/modal.page"

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
    const aboutPrivacyPolicyButton = await SettingsPage.aboutPrivacyPolicyButton
    await expect(aboutPrivacyPolicyButton).toHaveText("LEARN MORE")
    await aboutPrivacyPolicyButton.click()

    await browser.switchWindow("#/privacy-policy")

    const modalHeader = await modalPrivacyPolicyPage.modalHeader
    await modalHeader.waitForDisplayed()
    await expect(modalHeader).toHaveText("Mudita Center Privacy Policy")
  })

  it("Check keywords", async () => {
    const firstParagraph = modalPrivacyPolicyPage.firstParagraph
    await expect(firstParagraph).toHaveTextContaining(
      "KRS [National Court Register Number] 0000467620"
    )
    await expect(firstParagraph).toHaveTextContaining(
      "NIP [Polish Taxpayer Identification Number] 5252558282"
    )
    await expect(firstParagraph).toHaveTextContaining(
      "REGON [National Business Registration Number] 146767613"
    )
  })

  it("Check Privacy Policy sections", async () => {
    const first = await modalPrivacyPolicyPage.first
    await expect(first).toHaveText(
      "Who is the controller of your personal data and who can you contact about it?"
    )

    const second = await modalPrivacyPolicyPage.second
    await expect(second).toHaveText(
      "For what purposes and on what grounds do we process your personal data?"
    )

    const third = await modalPrivacyPolicyPage.third
    await expect(third).toHaveText("Who has access to your personal data?")

    const fourth = await modalPrivacyPolicyPage.fourth
    await expect(fourth).toHaveText("How long is your personal data stored?")

    const fifth = await modalPrivacyPolicyPage.fifth
    await expect(fifth).toHaveText(
      "What rights do you have in relation to the processing of your personal data?"
    )

    const sixth = await modalPrivacyPolicyPage.sixth
    await expect(sixth).toHaveText("How to exercise your personal data rights?")

    const seventh = await modalPrivacyPolicyPage.seventh
    await expect(seventh).toHaveText("Is providing personal data mandatory?")

    const eighth = await modalPrivacyPolicyPage.eighth
    await expect(eighth).toHaveText("Cookies")

    const nineth = await modalPrivacyPolicyPage.nineth
    await expect(nineth).toHaveText("Additional information")
  })

  it("Check content after scroll", async () => {
    const firstColumnHeader = await modalPrivacyPolicyPage.firstColumnHeader
    await firstColumnHeader.scrollIntoView()
    const second = await modalPrivacyPolicyPage.second
    await expect(second).toBeDisplayedInViewport
    const third = await modalPrivacyPolicyPage.third
    await expect(third).toBeDisplayedInViewport
  })

  it("Close modal", async () => {
    const windowCountBefore = await browser.getWindowHandles()
    expect(windowCountBefore.length).toBe(2)
    await browser.closeWindow()
    const windowCountAfter = await browser.getWindowHandles()
    expect(windowCountAfter.length).toBe(1)
  })
})
