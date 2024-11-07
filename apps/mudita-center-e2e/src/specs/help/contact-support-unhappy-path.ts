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

    const attachedFilesLabel = HelpModalPage.attachedFilesLabel
    const attachedFilesSubText = HelpModalPage.attachedFilesSubText
    const singleAttachment = HelpModalPage.singleAttachment
    const iconAttachment = HelpModalPage.iconAttachment
    const currentDateZipFile = HelpModalPage.currentDateZipFile
    await expect(singleAttachment).toBeDisplayed()
    await expect(iconAttachment).toBeDisplayed()
    await expect(currentDateZipFile).toBeDisplayed() //checks if zipfile has current date (date of sending the logs is the same as zip file name)
    await expect(attachedFilesLabel).toHaveText("Attached files")
    await expect(attachedFilesSubText).toHaveText(
      "The attached files will help us resolve your problem"
    )
  })

  it("Check if SEND button is present, has proper name and is disabled", async () => {
    const sendButton = HelpModalPage.sendButton
    const sendButtonLabel = HelpModalPage.sendButtonLabel
    await expect(sendButton).toBeDisplayed()
    await expect(sendButtonLabel).toHaveText("SEND")
    expect(sendButton).toBeDisabled()
  })

  it("Try to Send form without any input", async () => {
    const sendButton = HelpModalPage.sendButton
    expect(sendButton).toBeDisabled()
  })

  it("Verify e-mail without @ character", async () => {
    const emailInput = HelpModalPage.emailInput
    await emailInput.setValue("emailtest.com")
    const emailWarning = "Email is invalid"
    const invalidEmailTextElement = HelpModalPage.invalidEmailTextElement
    await expect(invalidEmailTextElement).toHaveText(emailWarning)
  })

  it("Check e-mail with @@ characters", async () => {
    const emailInput = HelpModalPage.emailInput
    await emailInput.setValue("email@@test.com")
    const emailWarning = "Email is invalid"
    const invalidEmailTextElement = HelpModalPage.invalidEmailTextElement
    await expect(invalidEmailTextElement).toHaveText(emailWarning)
  })

  it("Enter correct e-mail to check if error message dissappears", async () => {
    const emailInput = HelpModalPage.emailInput
    await emailInput.setValue("email@test.com")
    const invalidEmailTextElement = HelpModalPage.invalidEmailTextElement
    await expect(invalidEmailTextElement).not.toBeDisplayed()
  })

  it("Check e-mail with , character", async () => {
    const emailInput = HelpModalPage.emailInput
    await emailInput.setValue("email@test,com")
    const emailWarning = "Email is invalid"
    const invalidEmailTextElement = HelpModalPage.invalidEmailTextElement
    await expect(invalidEmailTextElement).toHaveText(emailWarning)
  })
})
