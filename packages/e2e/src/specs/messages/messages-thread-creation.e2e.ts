/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import NavigationTabs from "../../page-objects/tabs.page"
import MessagesPage from "../../page-objects/messages.page"
import ModalGeneralPage from "../../page-objects/modal-general.page"
import MessagesConversationPage from "../../page-objects/messages-conversation.page"
import BrowseContactsModal from "../../page-objects/messages-browse-contacts-modal.page"

import { addNewContact } from "../../helpers/contacts.helper"
import {
  deleteConversationOnThreadList,
  sendMessage,
} from "../../helpers/messages.helper"

describe("New thread creation scenarios - no contacts & no threads", () => {
  before(async () => {
    // Waiting for device connected through USB
    await browser.executeAsync((done) => {
      setTimeout(done, 10000)
    })

    await ModalGeneralPage.clickUpdateAvailableModalCloseButton()
    await NavigationTabs.clickMessagesTab()
  })
  it("Press browse contacts button and check no contacts is displayed", async () => {
    await MessagesPage.clickNewMessageButton()
    await MessagesConversationPage.clickBrowseContactsButton()

    const searchInput = await BrowseContactsModal.searchInput
    await searchInput.waitForDisplayed()

    const contactList = await BrowseContactsModal.emptyContactList
    await expect(contactList).toBeDisplayed()
  })

  it("Checks modal title is Browse Contacts and close it", async () => {
    const modalTitle = await BrowseContactsModal.modalHeader
    expect(modalTitle).toHaveText("Browse Contacts")

    await BrowseContactsModal.closeModalButtonClick()
  })

  it("Input message first then recipient number and check message Send button is clickable", async () => {
    await MessagesConversationPage.insertTextToMessageInput(
      "First input message text"
    )
    await MessagesConversationPage.insertTextToSearchContactInput("11111")

    const sendButton = await MessagesConversationPage.sendMessageButton
    await expect(sendButton).toBeClickable()
  })

  it("Change receipient number", async () => {
    const testNumber = "22222"
    console.log("**************************")

    await MessagesConversationPage.insertTextToSearchContactInput(testNumber)

    await browser.saveScreenshot("./recipientChange.png")
    const recipientInput = MessagesConversationPage.searchContactsInput
    await expect(recipientInput).toHaveValue(testNumber)
  })

  after(async () => {
    //await deleteConversationOnThreadList()
  })
})

// describe("New thread creation scenarios - no contacts & thread exists", () => {
//   before(async () => {
//     // Waiting for device connected through USB
//     await browser.executeAsync((done) => {
//       setTimeout(done, 10000)
//     })

//     await ModalGeneralPage.clickUpdateAvailableModalCloseButton()
//     await NavigationTabs.clickMessagesTab()
//   })
//   it("input recipient number of existing thread and press enter ", async () => {})

//   after(async () => {
//     await deleteConversationOnThreadList()
//   })
// })

// describe("New thread creation scenarios - contact exists & no threads", () => {
//   before(async () => {
//     // Waiting for device connected through USB
//     await browser.executeAsync((done) => {
//       setTimeout(done, 10000)
//     })

//     await ModalGeneralPage.clickUpdateAvailableModalCloseButton()
//     await NavigationTabs.clickContactsTab()
//     await addNewContact("Henryk", "Kwiatkowski", "+48664364535")

//     await NavigationTabs.clickMessagesTab()
//   })
//   xit("press phone book button (contact exist)", async () => {})
//   xit("insert part of existing contact name into search contact input", async () => {})
//   xit("insert part of existing contact number into search contact input", async () => {})
//   after(async () => {
//     await deleteConversationOnThreadList()
//   })
// })

// describe("New thread creation scenarios - contact exists & thread exists", () => {
//   before(async () => {
//     // Waiting for device connected through USB
//     await browser.executeAsync((done) => {
//       setTimeout(done, 10000)
//     })

//     await ModalGeneralPage.clickUpdateAvailableModalCloseButton()
//     await NavigationTabs.clickMessagesTab()
//   })
//   xit("input recipient number of existing thread and press enter ", async () => {})

//   after(async () => {
//     try {
//       await deleteConversationOnThreadList()
//     } catch (error) {
//       console.log(error)
//     }
//   })
// })
