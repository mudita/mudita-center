/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import NavigationTabs from "../../page-objects/tabs.page"
import MessagesPage from "../../page-objects/messages.page"
import ModalGeneralPage from "../../page-objects/modal-general.page"
import MessagesConversationPage from "../../page-objects/messages-conversation.page"

import {
  deleteConversationOnThreadList,
  sendMessage,
} from "../../helpers/messages.helper"

import { addNewContact } from "../../helpers/contacts.helper"

describe("New thread creation scenarios - no contacts & no threads", () => {
  before(async () => {
    // Waiting for device connected through USB
    await browser.executeAsync((done) => {
      setTimeout(done, 10000)
    })

    await ModalGeneralPage.clickUpdateAvailableModalCloseButton()
    await NavigationTabs.clickMessagesTab()
  })
  it("press phone book button (empty phone book) - UI check", async () => {})

  it("input message first then recipient number ", async () => {})

  after(async () => {
    await deleteConversationOnThreadList()
  })
})

describe("New thread creation scenarios - no contacts & thread exists", () => {
  before(async () => {
    // Waiting for device connected through USB
    await browser.executeAsync((done) => {
      setTimeout(done, 10000)
    })

    await ModalGeneralPage.clickUpdateAvailableModalCloseButton()
    await NavigationTabs.clickMessagesTab()
  })
  it("input recipient number of existing thread and press enter ", async () => {})

  after(async () => {
    await deleteConversationOnThreadList()
  })
})

describe("New thread creation scenarios - contact exists & no threads", () => {
  before(async () => {
    // Waiting for device connected through USB
    await browser.executeAsync((done) => {
      setTimeout(done, 10000)
    })

    await ModalGeneralPage.clickUpdateAvailableModalCloseButton()
    await NavigationTabs.clickContactsTab()
    await addNewContact("Henryk", "Kwiatkowski", "+48664364535")

    await NavigationTabs.clickMessagesTab()
  })
  it("press phone book button (contact exist)", async () => {})
  it("insert part of existing contact name into search contact input", async () => {})
  it("insert part of existing contact number into search contact input", async () => {})
  after(async () => {
    await deleteConversationOnThreadList()
  })
})

describe("New thread creation scenarios - contact exists & thread exists", () => {
  before(async () => {
    // Waiting for device connected through USB
    await browser.executeAsync((done) => {
      setTimeout(done, 10000)
    })

    await ModalGeneralPage.clickUpdateAvailableModalCloseButton()
    await NavigationTabs.clickMessagesTab()
  })
  it("input recipient number of existing thread and press enter ", async () => {})

  after(async () => {
    await deleteConversationOnThreadList()
  })
})
