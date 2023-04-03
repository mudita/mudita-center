/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */
import MessagesPage from "../page-objects/messages.page"
import MessagesConversationPage from "../page-objects/messages-conversation.page"
import ModalMessagesPage from "../page-objects/modal-messages.page"

import NavigationTabs from "../page-objects/tabs.page"
import { waitForClickableAndClick } from "../helpers/general.helper"
import messagesPage from "../page-objects/messages.page"

/** Send message using send button */
export const sendMessage = async (
  recipientText: string,
  messageText: string
) => {
  await console.log("****SEND MESSAGE****")
  await console.log(recipientText)

  await waitForClickableAndClick(await NavigationTabs.contactsTab)
  await waitForClickableAndClick(await NavigationTabs.messagesTab)
  await browser.saveScreenshot("./" + recipientText + "_1.png")
  await waitForClickableAndClick(await messagesPage.newMessageButton)
  await browser.saveScreenshot("./" + recipientText + "_2.png")
  await MessagesConversationPage.insertTextToSearchContactInput(recipientText)
  await browser.saveScreenshot("./" + recipientText + "_3.png")
  await MessagesConversationPage.insertTextToMessageInput(messageText)

  await MessagesConversationPage.sendMessageButton.waitForClickable()
  await MessagesConversationPage.sendMessageButton.click()
  await browser.saveScreenshot("./" + recipientText + "_4.png")
  await browser.pause(2000)
}

/** Delete conversation on thread list screen by clicking options (...) and delete conversation from dropdown list */
export const deleteConversationOnThreadList = async () => {
  await MessagesPage.clickThreadDropdownButton()

  await MessagesPage.clickThreadDropdownDeleteButton()

  await ModalMessagesPage.clickConfirmDeleteButton()
}
