/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import NavigationTabs from "../../page-objects/tabs.page"
import MessagesPage from "../../page-objects/messages.page"
import modalMessagesPage from "../../page-objects/modal-messages.page"
import ModalGeneralPage from "../../page-objects/modal-general.page"
import MessagesConversationPage from "../../page-objects/messages-conversation.page"

import { sendMessage } from "../../helpers/messages.helper"

describe("Messages send and delete", () => {
  before(async () => {
    // Waiting for device connected through USB
    await browser.executeAsync((done) => {
      setTimeout(done, 10000)
    })

    await ModalGeneralPage.clickUpdateAvailableModalCloseButton()
    await NavigationTabs.messagesTabClick()
  })
  it("Send message to incorrect number using send button", async () => {
    await sendMessage("12345", "SMS to incorrect number (Send button)")

    await MessagesConversationPage.waitToDisappearSendingStatusIcon()

    const notSendMessageIcon = await MessagesConversationPage.messageNotSentIcon
    await notSendMessageIcon.waitForDisplayed({ timeout: 15000 })
    const notSendThreadIcon = await MessagesPage.messageNotSentThreadIcon
    await notSendThreadIcon.waitForDisplayed({ timeout: 15000 })
    expect(notSendMessageIcon).toBeDisabled()
    expect(notSendThreadIcon).toBeDisabled()
  })
  it("Should delete the thread using delete thread button on open thread screen", async () => {
    await MessagesConversationPage.clickThreadDetailScreenDeleteButton()

    await modalMessagesPage.clickConfirmDeleteButton()

    const emptyThreadList = MessagesPage.threadScreenEmptyList
    await emptyThreadList.waitForDisplayed({ timeout: 7000 })
    await expect(emptyThreadList).toBeDisplayed()
  })

  it("Send message to incorrect number using Enter key", async () => {
    await MessagesPage.clickNewMessageButton()

    await MessagesConversationPage.insertTextToSearchContactInput("54321")

    await MessagesConversationPage.insertTextToMessageInput(
      "SMS to incorrect number (Enter key send)"
    )

    await browser.keys("\uE007")

    await MessagesConversationPage.waitToDisappearSendingStatusIcon()

    const notSendMessageIcon = await MessagesConversationPage.messageNotSentIcon
    await notSendMessageIcon.waitForDisplayed({ timeout: 15000 })
    const notSendThreadIcon = await MessagesPage.messageNotSentThreadIcon
    await notSendThreadIcon.waitForDisplayed({ timeout: 15000 })
    expect(notSendMessageIcon).toBeDisabled()
    expect(notSendThreadIcon).toBeDisabled()
  })

  it("Should close the thread and delete it from the thread list screen", async () => {
    await MessagesConversationPage.clickCloseThreadDetailsScreen()

    await MessagesPage.clickThreadDropdownIcon()

    await MessagesPage.clickThreadDropdownDeleteButton()

    await modalMessagesPage.clickConfirmDeleteButton()

    const emptyThreadList = MessagesPage.threadScreenEmptyList
    await emptyThreadList.waitForDisplayed({ timeout: 8000 })
    await expect(emptyThreadList).toBeDisplayed()
  })

  it("Send message to incorrect number using send button", async () => {
    await sendMessage("02468", "SMS to incorrect number (Send button)")

    await MessagesConversationPage.waitToDisappearSendingStatusIcon()

    const notSendMessageIcon = await MessagesConversationPage.messageNotSentIcon
    await notSendMessageIcon.waitForDisplayed({ timeout: 15000 })
    const notSendThreadIcon = await MessagesPage.messageNotSentThreadIcon
    await notSendThreadIcon.waitForDisplayed({ timeout: 15000 })
    expect(notSendMessageIcon).toBeDisabled()
    expect(notSendThreadIcon).toBeDisabled()
  })
  it("Click message options button and delete it", async () => {
    await MessagesConversationPage.hoverOverMessageContent()

    await MessagesConversationPage.clickMessageDropdownIcon()

    await MessagesConversationPage.clickMessageDropdownDeleteButton()

    await modalMessagesPage.clickConfirmDeleteButton()

    const emptyThreadList = MessagesPage.threadScreenEmptyList
    await emptyThreadList.waitForDisplayed({ timeout: 8000 })
    await expect(emptyThreadList).toBeDisplayed()
  })

  it("Send message to incorrect number using send button", async () => {
    await sendMessage("13579", "SMS to incorrect number (Send button)")

    await MessagesConversationPage.waitToDisappearSendingStatusIcon()

    const notSendMessageIcon = await MessagesConversationPage.messageNotSentIcon
    await notSendMessageIcon.waitForDisplayed({ timeout: 15000 })
    const notSendThreadIcon = await MessagesPage.messageNotSentThreadIcon
    await notSendThreadIcon.waitForDisplayed({ timeout: 15000 })
    expect(notSendMessageIcon).toBeDisabled()
    expect(notSendThreadIcon).toBeDisabled()
  })
  it("Should close the thread and delete thread using selection manager", async () => {
    await MessagesConversationPage.clickCloseThreadDetailsScreen()

    await MessagesPage.hoverOverThreadRow()

    await MessagesPage.clickThreadCheckbox()

    await MessagesPage.clickSelectionManagerDeleteButton()

    await modalMessagesPage.clickConfirmDeleteButton()

    const emptyThreadList = MessagesPage.threadScreenEmptyList
    await emptyThreadList.waitForDisplayed({ timeout: 8000 })
    await expect(emptyThreadList).toBeDisplayed()
  })
})
