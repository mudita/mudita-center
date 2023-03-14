import MessagesPage from "../page-objects/messages.page"
import MessagesConversationPage from "../page-objects/messages-conversation.page"

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
