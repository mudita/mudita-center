/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */
import messagesPage from "../page-objects/messages.page"
import messagesConversationPage from "../page-objects/messages-conversation.page"
import modalMessagesPage from "../page-objects/modal-messages.page"
import navigationTabs from "../page-objects/tabs.page"

import { waitForClickableAndClick } from "../helpers/general.helper"

/** Send message using send button */
export const sendMessage = async (
  recipientText: string,
  messageText: string
) => {
  await waitForClickableAndClick(await navigationTabs.contactsTab)
  await waitForClickableAndClick(await navigationTabs.messagesTab)

  await waitForClickableAndClick(await messagesPage.newMessageButton)

  await messagesConversationPage.insertTextToSearchContactInput(recipientText)

  await messagesConversationPage.insertTextToMessageInput(messageText)

  await messagesConversationPage.sendMessageButton.waitForClickable()
  await messagesConversationPage.sendMessageButton.click()
}

/** Delete conversation on thread list screen by clicking options (...) and delete conversation from dropdown list */
export const deleteConversationOnThreadList = async () => {
  await messagesPage.clickThreadDropdownButton()

  await messagesPage.clickThreadDropdownDeleteButton()

  await modalMessagesPage.clickConfirmDeleteButton()
}

export const deleteAllMessagesWithSelectionManager = async () => {
  //hover over data-testid="contact-row" to make checkbox display=true
  await messagesPage.hoverOverThreadRow()

  await waitForClickableAndClick(await messagesPage.threadCheckbox)

  //select all contacts
  await waitForClickableAndClick(await messagesPage.selectAllCheckbox)

  await waitForClickableAndClick(
    await messagesPage.selectionManagerDeleteButton
  )
  await waitForClickableAndClick(await modalMessagesPage.confirmDeleteButton)

  const noMessagesTextLabel = await messagesPage.threadScreenEmptyList

  await noMessagesTextLabel.waitForDisplayed()
}
