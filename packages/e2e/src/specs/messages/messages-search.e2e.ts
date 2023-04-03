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
import { addNewContact, deleteContact } from "../../helpers/contacts.helper"
import { waitForClickableAndClick } from "../../helpers/general.helper"

const contacts: Array<{
  firstName: string
  lastName: string
  primaryNumber: string
  message: string
}> = [
  {
    firstName: "Janek",
    lastName: "Szarpidrut",
    primaryNumber: "664364535",
    message: "tested",
  },
  {
    firstName: "Kazimierz",
    lastName: "Podchodek",
    primaryNumber: "515364135",
    message: "I did not test this",
  },
  {
    firstName: "Zbigniew",
    lastName: "Koczkodan",
    primaryNumber: "12345",
    message: "You should hire a tester",
  },
  {
    firstName: "Antoni",
    lastName: "Smutny",
    primaryNumber: "13579",
    message: "What?!? I should be asking this question",
  },
  {
    firstName: "Tadeusz",
    lastName: "Niepali",
    primaryNumber: "02468",
    message: " What are you waiting for???",
  },
]

describe("Messasges search scenarios-results overlay-conversation with contact existing in phonebook", () => {
  before(async () => {
    // Waiting for device connected through USB
    await browser.pause(10000)

    await modalGeneralPage.clickUpdateAvailableModalCloseButton()
    await waitForClickableAndClick(await navigationTabs.contactsTab)
    await waitForClickableAndClick(await navigationTabs.messagesTab)

    // TODO: GENERATE CONTACTS + MESSAGES

    contacts
      .slice(0, 3)
      .forEach(
        async (contact) =>
          await addNewContact(
            contact.firstName,
            contact.lastName,
            contact.primaryNumber
          )
      )
    await waitForClickableAndClick(await navigationTabs.messagesTab)
    contacts.forEach(
      async (contact) =>
        await sendMessage(contact.primaryNumber, contact.message)
    )
    await waitForClickableAndClick(await navigationTabs.contactsTab)
    await waitForClickableAndClick(await navigationTabs.messagesTab)
  })
  it("Search by existing contact name and check results", async () => {
    //await messagesPage.insertTextToSearchInput(contacts[0].firstName)
    await messagesPage.insertTextToSearchInput("test")
    const resultList = await messagesPage.searchResultsOverlayList
    const emptyList = await messagesPage.emptySearchResultsOverlayList
    await browser.saveScreenshot("./SearchResultOverlay.png")
    //await expect(resultList).toBeDisplayed()
    await expect(emptyList).toBeDisplayed()
  })

  it("Search messages by surname and check results", async () => {
    await messagesPage.insertTextToSearchInput(contacts[1].lastName)
  })

  it("Search messages by partial contact name and check results", async () => {})

  it("Search messages by contact number and check results", async () => {})

  it("Search messages by partial contact number and check results", async () => {})

  it("Search messages by word existing in single thread and check results", async () => {})

  it("Search messages by word existing in multiple threads and check results", async () => {})
})

describe("Messasges search scenarios-results overlay-conversation with contact existing in phonebook", () => {
  before(async () => {
    await waitForClickableAndClick(await navigationTabs.contactsTab)
    await waitForClickableAndClick(await navigationTabs.messagesTab)
  })
  it("Search by existing contact name and check results", async () => {})

  it("Search messages by surname and check results", async () => {})

  it("Search messages by partial contact name and check results", async () => {})

  it("Search messages by contact number and check results", async () => {})

  it("Search messages by partial contact number and check results", async () => {})

  it("Search messages by word existing in single thread and check results", async () => {})

  it("Search messages by word existing in multiple threads and check results", async () => {})
})

describe("Messasges search scenarios - results overlay 'SEE ALL'", () => {
  before(async () => {
    await waitForClickableAndClick(await navigationTabs.contactsTab)
    await waitForClickableAndClick(await navigationTabs.messagesTab)
  })

  it("Click SEE ALL on search results overlay", async () => {})
})

describe("Messasges search scenarios - results overlay - click on conversation", () => {
  before(async () => {
    await waitForClickableAndClick(await navigationTabs.contactsTab)
    await waitForClickableAndClick(await navigationTabs.messagesTab)
  })

  it("Click conversation from search results overlay", async () => {})

  it("Check thread is opened and search word is NOT highlighted", async () => {})

  it("Click message from search results overlay", async () => {})

  it("Check thread is opened and search word is highlighted", async () => {})

  it("Press ENTER key after inserting search query and check only matching threads are displayed", async () => {})

  it("Click thread and check thread is opened and search word is highlighted", async () => {})

  it("Clear search input and check all thraeds list is displayed ", async () => {})
})

describe("Messasges search scenarios - results overlay - click message", () => {
  before(async () => {
    await waitForClickableAndClick(await navigationTabs.contactsTab)
    await waitForClickableAndClick(await navigationTabs.messagesTab)
  })

  it("Click message from search results overlay", async () => {})

  it("Check thread is opened and search word is highlighted", async () => {})

  it("Press ENTER key after inserting search query and check only matching threads are displayed", async () => {})

  it("Click thread and check thread is opened and search word is highlighted", async () => {})

  it("Clear search input and check all thraeds list is displayed ", async () => {})
})

describe("Messasges search scenarios - Enter press in search results", () => {
  before(async () => {
    await waitForClickableAndClick(await navigationTabs.contactsTab)
    await waitForClickableAndClick(await navigationTabs.messagesTab)
  })

  it("Press ENTER key after inserting search query and check only matching threads are displayed", async () => {})

  it("Click thread and check thread is opened and search word is highlighted", async () => {})
})

describe("Messasges search scenarios - clear search input", () => {
  before(async () => {
    await waitForClickableAndClick(await navigationTabs.contactsTab)
    await waitForClickableAndClick(await navigationTabs.messagesTab)
  })

  it("Clear search input and check all thraeds list is displayed ", async () => {})
})

describe("Messasges search scenarios - lack of results for user search input", () => {
  before(async () => {
    await waitForClickableAndClick(await navigationTabs.contactsTab)
    await waitForClickableAndClick(await navigationTabs.messagesTab)
  })

  it("Insert text that does not exist in any of messages", async () => {})
})

describe("Check search after deleting threads and contacts", () => {
  before(async () => {
    //TODO: DELETE MESSAGES/CONTACTS
    await waitForClickableAndClick(await navigationTabs.contactsTab)
    await waitForClickableAndClick(await navigationTabs.messagesTab)
  })

  it("Insert text from deleted earlier message", async () => {})
})
