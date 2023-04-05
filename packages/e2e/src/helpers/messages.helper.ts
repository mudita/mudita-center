/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */
import MessagesPage from "../page-objects/messages.page"
import MessagesConversationPage from "../page-objects/messages-conversation.page"
import ModalMessagesPage from "../page-objects/modal-messages.page"

/** Send message using send button */
export const sendMessage = async (
  recipientText: string,
  messageText: string
) => {
  await MessagesPage.clickNewMessageButton()
  await MessagesConversationPage.insertTextToSearchContactInput(recipientText)
  await MessagesConversationPage.insertTextToMessageInput(messageText)

  await MessagesConversationPage.sendMessageButton.waitForClickable()
  await MessagesConversationPage.sendMessageButton.click()
}

/** Delete conversation on thread list screen by clicking options (...) and delete conversation from dropdown list */
export const deleteConversationOnThreadList = async () => {
  await MessagesPage.clickThreadDropdownButton()

  await MessagesPage.clickThreadDropdownDeleteButton()

  await ModalMessagesPage.clickConfirmDeleteButton()
}
