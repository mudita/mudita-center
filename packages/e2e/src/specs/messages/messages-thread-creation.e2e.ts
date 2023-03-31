/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import NavigationTabs from "../../page-objects/tabs.page"
import MessagesPage from "../../page-objects/messages.page"
import ModalGeneralPage from "../../page-objects/modal-general.page"
import MessagesConversationPage from "../../page-objects/messages-conversation.page"
import BrowseContactsModal from "../../page-objects/messages-browse-contacts-modal.page"
import ModalMessagesPage from "../../page-objects/modal-messages.page"

import { addNewContact, deleteContact } from "../../helpers/contacts.helper"
import { waitForClickableAndClick } from "../../helpers/general.helper"
import {
  deleteConversationOnThreadList,
  sendMessage,
} from "../../helpers/messages.helper"
import messagesConversationPage from "../../page-objects/messages-conversation.page"

const enterKey = "\uE007"
const backspaceKey = "\ue003"

describe("New thread creation scenarios - no contacts & no threads", () => {
  before(async () => {
    // Waiting for device connected through USB
    browser.pause(10000)

    await ModalGeneralPage.clickUpdateAvailableModalCloseButton()

    await waitForClickableAndClick(await NavigationTabs.messagesTab)
  })
  it("Press browse contacts button and check no contacts is displayed", async () => {
    await waitForClickableAndClick(await MessagesPage.newMessageButton)
    await waitForClickableAndClick(
      await MessagesConversationPage.browseContactsButton
    )

    const searchInput = await BrowseContactsModal.searchInput
    await searchInput.waitForDisplayed()

    const contactList = await BrowseContactsModal.emptyContactList
    await expect(contactList).toBeDisplayed()
  })

  it("Check modal title is Browse Contacts and close it", async () => {
    const modalHeader = await BrowseContactsModal.modalHeader
    await expect(modalHeader).toHaveText("Browse Contacts")

    await BrowseContactsModal.closeModalButtonClick()
  })

  it("Input message text first then recipient number and check message Send button is clickable", async () => {
    const testMessage = "First input message text"
    const testNumber = "11111"
    await MessagesConversationPage.insertTextToMessageInput(testMessage)
    await MessagesConversationPage.insertTextToSearchContactInput(testNumber)

    const sendButton = await MessagesConversationPage.sendMessageButton
    await expect(sendButton).toBeClickable()
  })

  it("Delete existing recipient number and insert new one", async () => {
    const testNumber = "22222"
    await waitForClickableAndClick(
      await MessagesConversationPage.messageTextInput
    )
    await waitForClickableAndClick(
      await MessagesConversationPage.searchContactsInput
    )
    const recipientInputValue =
      await MessagesConversationPage.searchContactsInput.getValue()
    for (let i = 0; i <= (await recipientInputValue).length; i++) {
      await browser.keys(backspaceKey)
    }
    await MessagesConversationPage.insertTextToSearchContactInput(testNumber)

    const recipientInput = await MessagesConversationPage.searchContactsInput
    await expect(recipientInput).toHaveValue(testNumber)
  })
  it("Check thread name is 'New conversation'", async () => {
    const thaedName = await MessagesPage.threadRow
    await expect(thaedName).toHaveText("New Conversation")
  })

  it("Click on recipient input field and send Enter key to lock it and create a thread", async () => {
    waitForClickableAndClick(await MessagesConversationPage.messageTextInput)
    await browser.keys(enterKey)
    const recipientInput = await MessagesConversationPage.searchContactsInput
    await expect(recipientInput).not.toBeClickable()
  })

  it("Check thread name is updated with recipient number", async () => {
    const conversationName =
      await MessagesConversationPage.conversationRecipientNameText
    const recipientText = await conversationName.getText()

    const threadName = await MessagesPage.threadRow
    await expect(threadName).toHaveText(recipientText)
  })
  it("Delete empty thread with selection manager", async () => {
    await MessagesPage.hoverOverThreadRow()
    await waitForClickableAndClick(await MessagesPage.threadCheckbox)
    await waitForClickableAndClick(
      await MessagesPage.selectionManagerDeleteButton
    )
    await ModalMessagesPage.clickConfirmDeleteButton()

    const emptyThreadList = MessagesPage.threadScreenEmptyList
    await emptyThreadList.waitForDisplayed({ timeout: 8000 })
    await expect(emptyThreadList).toBeDisplayed()
  })

  after(async () => {
    try {
      await waitForClickableAndClick(
        await MessagesConversationPage.threadDetailScreenCloseButton
      )
      await deleteConversationOnThreadList()
      await waitForClickableAndClick(await NavigationTabs.contactsTab)
      await waitForClickableAndClick(await NavigationTabs.messagesTab)
    } catch (error) {
      console.log(error)
    }
  })
})

describe("New thread creation scenarios - no contacts & thread exists", () => {
  const existingThreadPhoneNumber = "98765"
  const existingThreadMessageText = "Existing thread msg"
  before(async () => {
    // Waiting for device connected through USB
    await browser.executeAsync((done) => {
      setTimeout(done, 10000)
    })
    await ModalGeneralPage.clickUpdateAvailableModalCloseButton()
    await waitForClickableAndClick(await NavigationTabs.messagesTab)
    await sendMessage(existingThreadPhoneNumber, existingThreadMessageText)
  })
  it("input recipient number of existing thread and press enter ", async () => {
    await waitForClickableAndClick(await MessagesPage.newMessageButton)
    await MessagesConversationPage.insertTextToSearchContactInput(
      existingThreadPhoneNumber
    )
    await browser.keys(enterKey)
    const messageContent =
      await messagesConversationPage.messageContent.getText()
    await expect(messageContent).toEqual(existingThreadMessageText)
  })

  after(async () => {
    try {
      await waitForClickableAndClick(
        await MessagesConversationPage.threadDetailScreenCloseButton
      )
      await deleteConversationOnThreadList()
    } catch (error) {
      console.log(error)
    }
  })
})

describe("New thread creation scenarios - contact exists & no threads", () => {
  const existingContactName = "Henryk"
  const existingContactSurname = "Kwiatkowski"
  const existingContactPrimaryNumber = "664364535"

  before(async () => {
    // Waiting for device connected through USB
    await browser.executeAsync((done) => {
      setTimeout(done, 10000)
    })
    await ModalGeneralPage.clickUpdateAvailableModalCloseButton()
    await waitForClickableAndClick(await NavigationTabs.contactsTab)
    await addNewContact(
      existingContactName,
      existingContactSurname,
      existingContactPrimaryNumber
    )
    await waitForClickableAndClick(await NavigationTabs.messagesTab)
  })
  it("Press phone book button (contact exist)", async () => {
    await waitForClickableAndClick(await MessagesPage.newMessageButton)
    await waitForClickableAndClick(
      await MessagesConversationPage.browseContactsButton
    )
    const contactName = await BrowseContactsModal.modalContactNameText
    const contactPrimaryNumber =
      await BrowseContactsModal.modalContactPrimaryNumberText

    //TO BE UPDATED AFTER CONTACT NAME HAS DEDICATED DATA-TESTID ATTRIBUTE
    //await expect(contactName).toHaveText(
    //existingContactName + " " + existingContactSurname
    //)
    await expect(contactPrimaryNumber).toHaveText(existingContactPrimaryNumber)
  })
  it("Click available contact and check conversation screen has contact name and phone number displayed above messages", async () => {
    await waitForClickableAndClick(
      await BrowseContactsModal.modalContactNameText
    )
    const recipientName =
      await MessagesConversationPage.conversationRecipientNameText
    const recipientNameText = await recipientName.getText()
    const recipientNumber =
      await MessagesConversationPage.conversationRecipientPhoneText
    const recipientNumberText = await recipientNumber.getText()

    const threadName = await MessagesPage.threadRow
    await expect(threadName).toHaveText(recipientNameText)
    await expect(recipientNumberText).toEqual(existingContactPrimaryNumber)
  })

  it("Insert text to message input, send it and check conversation screen has contact name and phone number displayed above messages", async () => {
    await MessagesConversationPage.insertTextToMessageInput(
      "Check conversation title is the same"
    )

    await waitForClickableAndClick(
      await MessagesConversationPage.sendMessageButton
    )
    const recipientName =
      await MessagesConversationPage.conversationRecipientNameText
    const recipientNameText = await recipientName.getText()
    const recipientNumber =
      await MessagesConversationPage.conversationRecipientPhoneText
    const recipientNumberText = await recipientNumber.getText()

    await expect(recipientNameText).toEqual(
      existingContactName + " " + existingContactSurname
    )
    await expect(recipientNumberText).toEqual(existingContactPrimaryNumber)
  })

  it("click new message and insert part of existing contact name into search contact input", async () => {
    await waitForClickableAndClick(await MessagesPage.newMessageButton)
    await MessagesConversationPage.insertTextToSearchContactInput(
      existingContactName.slice(0, -2)
    )
    await expect(
      MessagesConversationPage.contactSearchResultItem
    ).toHaveTextContaining(existingContactName)
    await expect(
      MessagesConversationPage.contactSearchResultItem
    ).toHaveTextContaining(existingContactSurname)
    await expect(
      MessagesConversationPage.contactSearchResultItem
    ).toHaveTextContaining(existingContactPrimaryNumber)
  })
  it("click New Message and insert part of existing contact number into search contact input", async () => {
    const recipientInputValue =
      await MessagesConversationPage.searchContactsInput.getValue()
    for (let i = 0; i <= (await recipientInputValue).length; i++) {
      await browser.keys(backspaceKey)
    }
    await MessagesConversationPage.insertTextToSearchContactInput(
      existingContactPrimaryNumber.slice(0, -2)
    )
    await expect(
      MessagesConversationPage.contactSearchResultItem
    ).toHaveTextContaining(existingContactName)
    await expect(
      MessagesConversationPage.contactSearchResultItem
    ).toHaveTextContaining(existingContactSurname)
    await expect(
      MessagesConversationPage.contactSearchResultItem
    ).toHaveTextContaining(existingContactPrimaryNumber)
  })
  after(async () => {
    try {
      await waitForClickableAndClick(
        await MessagesConversationPage.threadDetailScreenCloseButton
      )
      await deleteConversationOnThreadList()
      await waitForClickableAndClick(await NavigationTabs.contactsTab)
      await deleteContact()
    } catch (error) {
      console.log(error)
    }
  })
})

describe("New thread creation scenarios - contact exists & thread exists", () => {
  const existingContactName = "Zbigniew"
  const existingContactSurname = "Kuropatwa"
  const existingContactPrimaryNumber = "664364535"
  const existingThreadMessageText = "Another existing thread msg"
  before(async () => {
    // Waiting for device connected through USB
    await browser.executeAsync((done) => {
      setTimeout(done, 10000)
    })
    await ModalGeneralPage.clickUpdateAvailableModalCloseButton()
    await waitForClickableAndClick(await NavigationTabs.contactsTab)
    await addNewContact(
      existingContactName,
      existingContactSurname,
      existingContactPrimaryNumber
    )
    await waitForClickableAndClick(await NavigationTabs.messagesTab)
    await sendMessage(existingContactPrimaryNumber, existingThreadMessageText)
  })
  it("input recipient number of existing thread and press enter ", async () => {
    await waitForClickableAndClick(await MessagesPage.newMessageButton)
    await MessagesConversationPage.insertTextToSearchContactInput(
      existingContactPrimaryNumber
    )
    await browser.keys(enterKey)

    const recipientName =
      await MessagesConversationPage.conversationRecipientNameText
    const recipientNameText = await recipientName.getText()
    const recipientNumber =
      await MessagesConversationPage.conversationRecipientPhoneText
    const recipientNumberText = await recipientNumber.getText()

    await expect(recipientNameText).toEqual(
      existingContactName + " " + existingContactSurname
    )
    await expect(recipientNumberText).toEqual(existingContactPrimaryNumber)
  })

  after(async () => {
    try {
      await waitForClickableAndClick(
        await MessagesConversationPage.threadDetailScreenCloseButton
      )
      await deleteConversationOnThreadList()
      await waitForClickableAndClick(await NavigationTabs.contactsTab)
      await deleteContact()
    } catch (error) {
      console.log(error)
    }
  })
})
