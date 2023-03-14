import MessagesPage from "../page-objects/messages.page"
import MessagesConversationPage from "../page-objects/messages-conversation.page"

/** Send message using send button */
export const sendMessage = async (
  recipientText: string,
  messageText: string
) => {
  // click NEW MESSAGE button
  await MessagesPage.clickNewMessageButton()
  //input phone number into contact search field
  await MessagesConversationPage.insertTextToSearchContactInput(recipientText)
  //input message text into message input
  await MessagesConversationPage.insertTextToMessageInput(messageText)
  //send by pressing Send button

  await MessagesConversationPage.sendMessageButton.waitForClickable()
  await MessagesConversationPage.sendMessageButton.click()
}
