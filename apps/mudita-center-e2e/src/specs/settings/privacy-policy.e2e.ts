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
    if(testsHelper.isLinux()){
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
    const controllerQuestion = await modalPrivacyPolicyPage.controllerQuestion
    await expect(controllerQuestion).toHaveText(
      "Who is the controller of your personal data and who can you contact about it?"
    )

    const purposesQuestion = await modalPrivacyPolicyPage.purposesQuestion
    await expect(purposesQuestion).toHaveText(
      "For what purposes and on what grounds do we process your personal data?"
    )

    const firstColumnHeader = await modalPrivacyPolicyPage.firstColumnHeader
    await expect(firstColumnHeader).toHaveText("the purpose of the processing")
    const firstColumnHeaderBorder = (
      await firstColumnHeader.getCSSProperty("border")
    ).value
    await expect(firstColumnHeaderBorder).toBe("1px solid rgb(0, 0, 0)")

    const accessQuestion = await modalPrivacyPolicyPage.accessQuestion
    await expect(accessQuestion).toHaveText(
      "Who has access to your personal data?"
    )

    const storageLengthQuestion =
      await modalPrivacyPolicyPage.storageLengthQuestion
    await expect(storageLengthQuestion).toHaveText(
      "How long is your personal data stored?"
    )

    const rightsQuestion = await modalPrivacyPolicyPage.rightsQuestion
    await expect(rightsQuestion).toHaveText(
      "What rights do you have in relation to the processing of your personal data?"
    )

    const rightsExcerciseQuestion =
      await modalPrivacyPolicyPage.rightsExcerciseQuestion
    await expect(rightsExcerciseQuestion).toHaveText(
      "How to exercise your personal data rights?"
    )

    const dataProvidingMandatoryQuestion =
      await modalPrivacyPolicyPage.dataProvidingMandatoryQuestion
    await expect(dataProvidingMandatoryQuestion).toHaveText(
      "Is providing personal data mandatory?"
    )

    const cookiesParagraph = await modalPrivacyPolicyPage.cookiesParagraph
    await expect(cookiesParagraph).toHaveText("Cookies")

    const cookiesInfoLinks = await modalPrivacyPolicyPage.cookiesInfoLinks
    await expect(cookiesInfoLinks).toBeElementsArrayOfSize({ gte: 5 })
    for (let cookiesInfoLink of cookiesInfoLinks) {
      const link = await cookiesInfoLink.$("a")
      await expect(link).toHaveAttribute("href")
      await expect(link).toBeClickable()
    }

    const addInformationParagraph =
      await modalPrivacyPolicyPage.addInformationParagraph
    await expect(addInformationParagraph).toHaveText("Additional information")
  })

  it("Check content after scroll", async () => {
    const firstColumnHeader = await modalPrivacyPolicyPage.firstColumnHeader
    await firstColumnHeader.scrollIntoView()
    const purposesQuestion = await modalPrivacyPolicyPage.purposesQuestion
    await expect(purposesQuestion).toBeDisplayedInViewport
    const accessQuestion = await modalPrivacyPolicyPage.accessQuestion
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
