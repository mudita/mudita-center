/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import navigationTabs from "../../page-objects/tabs.page"
import messagesPage from "../../page-objects/messages.page"
import modalMessagesPage from "../../page-objects/modal-messages.page"
import modalGeneralPage from "../../page-objects/modal-general.page"
import messagesConversationPage from "../../page-objects/messages-conversation.page"

import { sendMessage } from "../../helpers/messages.helper"
import { waitForClickableAndClick } from "../../helpers/general.helper"

describe("Messages send and delete", () => {
  before(async () => {
    // Waiting for device connected through USB
    await browser.executeAsync((done) => {
      setTimeout(done, 10000)
    })

    await modalGeneralPage.clickUpdateAvailableModalCloseButton()
    await navigationTabs.clickMessagesTab()
  })
  it("Send message to incorrect number using send button", async () => {
    await sendMessage("12345", "SMS to incorrect number (Send button)")

    await messagesConversationPage.waitToDisappearSendingStatusIcon()

    const notSendMessageIcon = await messagesConversationPage.messageNotSentIcon
    await notSendMessageIcon.waitForDisplayed({ timeout: 15000 })
    const notSendThreadIcon = await messagesPage.messageNotSentThreadIcon
    await notSendThreadIcon.waitForDisplayed({ timeout: 15000 })
    expect(notSendMessageIcon).toBeDisabled()
    expect(notSendThreadIcon).toBeDisabled()
  })
  it("Should delete the thread using delete thread button on open thread screen", async () => {
    await messagesConversationPage.clickThreadDetailScreenDeleteButton()

    await modalMessagesPage.clickConfirmDeleteButton()

    const emptyThreadList = messagesPage.threadScreenEmptyList
    await emptyThreadList.waitForDisplayed({ timeout: 7000 })
    await expect(emptyThreadList).toBeDisplayed()
  })

  it("Send message to incorrect number using Enter key", async () => {
    await messagesPage.clickNewMessageButton()

    await messagesConversationPage.insertTextToSearchContactInput("54321")

    await messagesConversationPage.insertTextToMessageInput(
      "SMS to incorrect number (Enter key send)"
    )

    await browser.keys("\uE007")

    await messagesConversationPage.waitToDisappearSendingStatusIcon()

    const notSendMessageIcon = await messagesConversationPage.messageNotSentIcon
    await notSendMessageIcon.waitForDisplayed({ timeout: 15000 })
    const notSendThreadIcon = await messagesPage.messageNotSentThreadIcon
    await notSendThreadIcon.waitForDisplayed({ timeout: 15000 })
    expect(notSendMessageIcon).toBeDisabled()
    expect(notSendThreadIcon).toBeDisabled()
  })

  it("Should close the thread and delete it from the thread list screen", async () => {
    await messagesConversationPage.clickCloseThreadDetailsScreen()

    await messagesPage.clickThreadDropdownIcon()

    await messagesPage.clickThreadDropdownDeleteButton()

    await modalMessagesPage.clickConfirmDeleteButton()

    const emptyThreadList = messagesPage.threadScreenEmptyList
    await emptyThreadList.waitForDisplayed({ timeout: 8000 })
    await expect(emptyThreadList).toBeDisplayed()
  })

  it("Send message to incorrect number using send button", async () => {
    await sendMessage("02468", "SMS to incorrect number (Send button)")

    await messagesConversationPage.waitToDisappearSendingStatusIcon()

    const notSendMessageIcon = await messagesConversationPage.messageNotSentIcon
    await notSendMessageIcon.waitForDisplayed({ timeout: 15000 })
    const notSendThreadIcon = await messagesPage.messageNotSentThreadIcon
    await notSendThreadIcon.waitForDisplayed({ timeout: 15000 })
    expect(notSendMessageIcon).toBeDisabled()
    expect(notSendThreadIcon).toBeDisabled()
  })
  it("Click message options button and delete it", async () => {
    await messagesConversationPage.hoverOverMessageContent()

    await messagesConversationPage.clickMessageDropdownIcon()

    await messagesConversationPage.clickMessageDropdownDeleteButton()

    await modalMessagesPage.clickConfirmDeleteButton()

    const emptyThreadList = messagesPage.threadScreenEmptyList
    await emptyThreadList.waitForDisplayed({ timeout: 8000 })
    await expect(emptyThreadList).toBeDisplayed()
  })

  it("Send message to incorrect number using send button", async () => {
    await sendMessage("13579", "SMS to incorrect number (Send button)")

    await messagesConversationPage.waitToDisappearSendingStatusIcon()

    const notSendMessageIcon = await messagesConversationPage.messageNotSentIcon
    await notSendMessageIcon.waitForDisplayed({ timeout: 15000 })
    const notSendThreadIcon = await messagesPage.messageNotSentThreadIcon
    await notSendThreadIcon.waitForDisplayed({ timeout: 15000 })
    expect(notSendMessageIcon).toBeDisabled()
    expect(notSendThreadIcon).toBeDisabled()
  })
  it("Should close the thread and delete thread using selection manager", async () => {
    await messagesConversationPage.clickCloseThreadDetailsScreen()

    await messagesPage.hoverOverThreadRow()

    await messagesPage.clickThreadCheckbox()

    await messagesPage.clickSelectionManagerDeleteButton()

    await modalMessagesPage.clickConfirmDeleteButton()

    const emptyThreadList = messagesPage.threadScreenEmptyList
    await emptyThreadList.waitForDisplayed({ timeout: 8000 })
    await expect(emptyThreadList).toBeDisplayed()
  })
})

describe("Messages Resend", () => {
  before(async () => {
    // Waiting for device connected through USB
    await browser.pause(10000)

    await modalGeneralPage.clickUpdateAvailableModalCloseButton()
    await navigationTabs.clickMessagesTab()
  })
  it("Send message to incorrect number using send button", async () => {
    const messageText = "Testing Resend option"
    await sendMessage("12345", messageText)

    await messagesConversationPage.waitToDisappearSendingStatusIcon()

    const notSendMessageIcon = await messagesConversationPage.messageNotSentIcon
    await notSendMessageIcon.waitForDisplayed({ timeout: 15000 })
    const notSendThreadIcon = await messagesPage.messageNotSentThreadIcon
    await notSendThreadIcon.waitForDisplayed({ timeout: 15000 })
    expect(notSendMessageIcon).toBeDisabled()
    expect(notSendThreadIcon).toBeDisabled()

    await messagesConversationPage.hoverOverMessageContent()
    const messagesCountBeforeResending = (
      await messagesConversationPage.messagesContentsList
    ).length
    await waitForClickableAndClick(
      await messagesConversationPage.messageDropdownButton
    )
    await waitForClickableAndClick(
      await messagesConversationPage.messageDropdownResendButton
    )

    await browser.pause(5000)
    await messagesConversationPage.messageTextInput.moveTo()
    const messagesCountAfterResending = (
      await messagesConversationPage.messagesContentsList
    ).length

    await expect(messagesCountAfterResending).toBeGreaterThan(
      messagesCountBeforeResending
    )
    await expect(messagesCountAfterResending).toEqual(2)
    const messageList = await messagesConversationPage.messagesContentsList
    await expect(messageList[0]).toHaveText(messageText)
    await expect(messageList[1]).toHaveText(messageText)
  })
  after(async () => {})
})
