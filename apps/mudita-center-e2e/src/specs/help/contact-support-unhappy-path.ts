/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import NavigationTabs from "../../page-objects/tabs.page"
import HelpPage from "../../page-objects/help.page"
import HomePage from "../../page-objects/home.page"
import HelpModalPage from "../../page-objects/help-modal.page"

describe("Contact Support - Unhappy Path", () => {
  before(async () => {
    const notNowButton = await HomePage.notNowButton
    await notNowButton.waitForDisplayed()
    await notNowButton.click()
  })

  it("Open Mudita Help Center and open Contact Support Modal", async () => {
    const helpTab = NavigationTabs.helpTab
    await helpTab.click()

    const helpMainFooterContactSupportButton =
      HelpPage.helpMainFooterContactSupportButton
    await helpMainFooterContactSupportButton.click()
  })

  it("Check contents of Contact Form", async () => {
    const wholeModal = HelpModalPage.wholeModal
    await expect(wholeModal).toBeDisplayed()

    const closeModalButton = HelpModalPage.closeModalButton
    await expect(closeModalButton).toBeDisplayed()

    const modalHeader = HelpModalPage.modalHeader
    await expect(modalHeader).toBeDisplayed()

    const iconSupport = HelpModalPage.iconSupport
    await expect(iconSupport).toBeDisplayed()

    const modalTitle = HelpModalPage.modalTitle
    await expect(modalTitle).toBeDisplayed()
    await expect(modalTitle).toHaveText("Mudita Center Support")

    const modalSubtitle = HelpModalPage.modalSubtitle
    await expect(modalSubtitle).toBeDisplayed()
    await expect(modalSubtitle).toHaveText(
      "Contact Mudita support team and we will do our best to help you resolve your issues."
    )

    const emailLabel = HelpModalPage.emailLabel
    await expect(emailLabel).toHaveText("Email")
    const emailInput = HelpModalPage.emailInput
    await expect(emailInput).toBeDisplayed()

    const messageLabel = HelpModalPage.messageLabel
    await expect(messageLabel).toHaveText("Message (optional)")
    const descriptionInput = HelpModalPage.descriptionInput
    await expect(descriptionInput).toBeDisplayed()

    const attachedFilesText = HelpModalPage.attachedFilesText
    const attachedFilesSubText = HelpModalPage.attachedFilesSubText
    const singleAttachment = HelpModalPage.singleAttachment
    const iconAttachment = HelpModalPage.iconAttachment
    const currentDateZipFile = HelpModalPage.currentDateZipFile
    await expect(singleAttachment).toBeDisplayed()
    await expect(iconAttachment).toBeDisplayed()
    await expect(currentDateZipFile).toBeDisplayed() //checks if zipfile has current date (date of sending the logs is the same as zip file name)
    await expect(attachedFilesText).toHaveText("Attached files")
    await expect(attachedFilesSubText).toHaveText(
      "The attached files will help us resolve your problem"
    )
  })
})
