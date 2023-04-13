/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import navigationTabs from "../../page-objects/tabs.page"
import messagesPage from "../../page-objects/messages.page"
import modalMessagesPage from "../../page-objects/modal-messages.page"
import modalGeneralPage from "../../page-objects/modal-general.page"
import messagesConversationPage from "../../page-objects/messages-conversation.page"

import {
  sendMessage,
  deleteAllMessagesWithSelectionManager,
} from "../../helpers/messages.helper"
import {
  addNewContact,
  deleteContactsWithSelectionManager,
} from "../../helpers/contacts.helper"
import { waitForClickableAndClick } from "../../helpers/general.helper"

const enterKey = "\uE007"
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
    message: "unique",
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
    message: " What are you waiting for??? Go and test it",
  },
  {
    firstName: "Witold",
    lastName: "Brzeczyszczykiewicz",
    primaryNumber: "036912",
    message: "So this is it...",
  },
]
const commonword = "test"
const nonexistingword = "nonexistingwordinthread"

describe("Check search without any threads or contacts", () => {
  before(async () => {
    // Waiting for device connected through USB
    await browser.pause(10000)

    await modalGeneralPage.clickUpdateAvailableModalCloseButton()
    await waitForClickableAndClick(await navigationTabs.contactsTab)
    await waitForClickableAndClick(await navigationTabs.messagesTab)
  })

  it("Insert text into search input while having no threads", async () => {
    await messagesPage.insertTextToSearchInput(commonword)
    const resultList = await messagesPage.searchResultsOverlayList
    const emptyList = await messagesPage.emptySearchResultsOverlayList
    const seeAllButton = await messagesPage.seeAllSearchResultsButton

    await expect(resultList).toBeDisplayed()
    await expect(emptyList).toBeDisplayed()
    await expect(seeAllButton).not.toBeDisplayed()
  })
})

describe("Messasges search scenarios-results overlay-conversation with contact existing in phonebook", () => {
  before(async () => {
    for (let j = 0; j < 3; j++) {
      await addNewContact(
        contacts[j].firstName,
        contacts[j].lastName,
        contacts[j].primaryNumber
      )
    }
    browser.pause(2000)
    await waitForClickableAndClick(await navigationTabs.overviewTab)
    for (let j = 0; j < contacts.length; j++) {
      await sendMessage(contacts[j].primaryNumber, contacts[j].message)
    }

    await waitForClickableAndClick(await navigationTabs.settingsTab)
    await waitForClickableAndClick(await navigationTabs.messagesTab)
    await browser.pause(4000)
  })
  it("Search by existing contact name and check results", async () => {
    await browser.pause(4000)
    await messagesPage.insertTextToSearchInput(contacts[1].firstName)
    const resultList = await messagesPage.searchResultsOverlayList
    const emptyList = await messagesPage.emptySearchResultsOverlayList
    await expect(resultList).toBeDisplayed()
    await expect(emptyList).not.toBeDisplayed()
  })

  it("Search by existing surname and check results", async () => {
    await messagesPage.insertTextToSearchInput(contacts[1].lastName)
    const resultList = await messagesPage.searchResultsOverlayList
    const emptyList = await messagesPage.emptySearchResultsOverlayList
    await expect(resultList).toBeDisplayed()
    await expect(emptyList).not.toBeDisplayed()
  })

  it("Search by partial existing contact name and check results", async () => {
    await messagesPage.insertTextToSearchInput(contacts[0].lastName.slice(0, 4))
    const resultList = await messagesPage.searchResultsOverlayList
    const emptyList = await messagesPage.emptySearchResultsOverlayList

    await expect(resultList).toBeDisplayed()
    await expect(emptyList).not.toBeDisplayed()
  })

  it("Search by existing contact number and check results", async () => {
    await messagesPage.insertTextToSearchInput(contacts[1].primaryNumber)
    const resultList = await messagesPage.searchResultsOverlayList
    const emptyList = await messagesPage.emptySearchResultsOverlayList

    await expect(resultList).toBeDisplayed()
    await expect(emptyList).not.toBeDisplayed()
  })

  it("Search by existing partial contact number and check results", async () => {
    await messagesPage.insertTextToSearchInput(
      contacts[1].primaryNumber.slice(0, 4)
    )
    const resultList = await messagesPage.searchResultsOverlayList
    const emptyList = await messagesPage.emptySearchResultsOverlayList

    await expect(resultList).toBeDisplayed()
    await expect(emptyList).not.toBeDisplayed()
  })

  it("Search by word existing in single thread and check results", async () => {
    await messagesPage.insertTextToSearchInput(contacts[0].message)
    const resultList = await messagesPage.searchResultsOverlayList
    const emptyList = await messagesPage.emptySearchResultsOverlayList

    await expect(resultList).toBeDisplayed()
    await expect(emptyList).not.toBeDisplayed()
  })

  it("Search messages by word existing in multiple threads and check results", async () => {
    await messagesPage.insertTextToSearchInput(commonword)
    const resultList = await messagesPage.searchResultsOverlayList
    const emptyList = await messagesPage.emptySearchResultsOverlayList

    await expect(resultList).toBeDisplayed()
    await expect(emptyList).not.toBeDisplayed()
  })
})

describe("Messasges search scenarios-results overlay-conversation with contact NOT existing in phonebook", () => {
  before(async () => {
    await waitForClickableAndClick(await navigationTabs.contactsTab)
    await waitForClickableAndClick(await navigationTabs.messagesTab)
  })
  it("Search messages by NOT existing contact name and check results", async () => {
    await browser.pause(4000)
    await messagesPage.insertTextToSearchInput(contacts[4].firstName)
    const resultList = await messagesPage.searchResultsOverlayList
    const emptyList = await messagesPage.emptySearchResultsOverlayList
    await expect(resultList).toBeDisplayed()
    await expect(emptyList).toBeDisplayed()
  })

  it("Search messages by NOT existing surname and check results", async () => {
    await messagesPage.insertTextToSearchInput(contacts[5].lastName)
    const resultList = await messagesPage.searchResultsOverlayList
    const emptyList = await messagesPage.emptySearchResultsOverlayList
    await expect(resultList).toBeDisplayed()
    await expect(emptyList).toBeDisplayed()
  })

  it("Search messages by partial NOT existing contact name and check results", async () => {
    await messagesPage.insertTextToSearchInput(
      contacts[5].firstName.slice(0, 4)
    )
    const resultList = await messagesPage.searchResultsOverlayList
    const emptyList = await messagesPage.emptySearchResultsOverlayList
    await expect(resultList).toBeDisplayed()
    await expect(emptyList).toBeDisplayed()
  })

  it("Search messages by contact number and check results", async () => {
    await messagesPage.insertTextToSearchInput(contacts[5].primaryNumber)
    const resultList = await messagesPage.searchResultsOverlayList
    const emptyList = await messagesPage.emptySearchResultsOverlayList
    await expect(resultList).toBeDisplayed()
    await expect(emptyList).not.toBeDisplayed()
  })

  it("Search messages by partial contact number and check results", async () => {
    await messagesPage.insertTextToSearchInput(
      contacts[5].primaryNumber.slice(0, 3)
    )
    const resultList = await messagesPage.searchResultsOverlayList
    const emptyList = await messagesPage.emptySearchResultsOverlayList
    await expect(resultList).toBeDisplayed()
    await expect(emptyList).not.toBeDisplayed()
  })
})

describe("Messasges search scenarios - results overlay 'SEE ALL'", () => {
  before(async () => {
    await waitForClickableAndClick(await navigationTabs.contactsTab)
    await waitForClickableAndClick(await navigationTabs.messagesTab)
  })

  it("Click SEE ALL on search results overlay", async () => {
    await messagesPage.insertTextToSearchInput(commonword)
    const resultList = await messagesPage.searchResultsOverlayList
    const emptyList = await messagesPage.emptySearchResultsOverlayList

    await expect(resultList).toBeDisplayed()
    await expect(emptyList).not.toBeDisplayed()

    await waitForClickableAndClick(await messagesPage.seeAllSearchResultsButton)

    const searchResultText = await messagesPage.searchResultsForText
    const expectedText = 'Search results for "' + commonword + '"'
    await console.log(expectedText)
    await expect(searchResultText).toHaveText(
      `Search results for \u201C${commonword}\u201D`
    )
  })
})

describe("Messasges search scenarios - results overlay - click on conversation", () => {
  before(async () => {
    await waitForClickableAndClick(await navigationTabs.contactsTab)
    await waitForClickableAndClick(await navigationTabs.messagesTab)
  })

  it("Click conversation from search results overlay", async () => {
    await messagesPage.insertTextToSearchInput(contacts[1].lastName)

    await messagesPage.clickByTextConversationOnSearchResultsOverlay(
      contacts[1].lastName
    )
  })

  it("Check thread is opened and search word is NOT highlighted", async () => {
    const conversationWindow = await messagesPage.threadDetailsContainer
    await expect(conversationWindow).toBeDisplayed()
    const highlightedMessage = messagesConversationPage.highlightedMessage(
      contacts[1].message
    )
    await expect(highlightedMessage).not.toBeDisplayed()
  })
})

describe("Messasges search scenarios - results overlay - click message", () => {
  before(async () => {
    await waitForClickableAndClick(await navigationTabs.contactsTab)
    await waitForClickableAndClick(await navigationTabs.messagesTab)
  })

  it("Click thread and check thread is opened and search word is highlighted", async () => {
    await messagesPage.insertTextToSearchInput(contacts[1].message)

    await messagesPage.clickByTextConversationOnSearchResultsOverlay(
      contacts[1].message
    )
  })
  it("Check thread is opened and search word is NOT highlighted", async () => {
    const conversationWindow = await messagesPage.threadDetailsContainer
    await expect(conversationWindow).toBeDisplayed()
    const highlightedMessage = messagesConversationPage.highlightedMessage(
      contacts[1].message
    )
    await expect(highlightedMessage).toBeDisplayed()
  })
})

describe("Messasges search scenarios - Enter press in search results", () => {
  before(async () => {
    await waitForClickableAndClick(await navigationTabs.contactsTab)
    await waitForClickableAndClick(await navigationTabs.messagesTab)
  })

  it("Press ENTER key after inserting search query and check only matching threads are displayed", async () => {
    await messagesPage.insertTextToSearchInput(commonword)
    const resultList = await messagesPage.searchResultsOverlayList
    const emptyList = await messagesPage.emptySearchResultsOverlayList

    await expect(resultList).toBeDisplayed()
    await expect(emptyList).not.toBeDisplayed()
    await browser.keys(enterKey)

    const searchResultText = await messagesPage.searchResultsForText
    await expect(searchResultText).toHaveText(
      `Search results for \u201C${commonword}\u201D`
    )
  })

  it("Click thread and check thread is opened and search word is highlighted", async () => {
    await waitForClickableAndClick(
      await messagesPage.nameFieldOnSearchResultsConversationList
    )
    const conversationWindow = await messagesPage.threadDetailsContainer
    await expect(conversationWindow).toBeDisplayed()
    const highlightedMessage =
      messagesConversationPage.highlightedMessage(commonword)
    await expect(highlightedMessage).toBeDisplayed()
  })
})

describe("Messasges search scenarios - clear search input", () => {
  before(async () => {
    await waitForClickableAndClick(await navigationTabs.contactsTab)
    await waitForClickableAndClick(await navigationTabs.messagesTab)
  })

  it("Clear search input and check all threads list is displayed ", async () => {
    const numberOfSearchAvatarsBeforeSearch = await messagesPage.avatarsText
      .length
    const numberOfSearchContactIconsBeforeSearch = await messagesPage
      .iconsContactFilled.length
    let numberOfThreads =
      numberOfSearchAvatarsBeforeSearch + numberOfSearchContactIconsBeforeSearch

    await messagesPage.insertTextToSearchInput(commonword)
    const resultList = await messagesPage.searchResultsOverlayList
    const emptyList = await messagesPage.emptySearchResultsOverlayList

    await expect(resultList).toBeDisplayed()
    await expect(emptyList).not.toBeDisplayed()
    await browser.keys(enterKey)

    const numberOfSearchAvatars = await messagesPage.avatarsText.length
    const numberOfSearchContactIcons = await messagesPage.iconsContactFilled
      .length
    let numberOfSearchResults =
      numberOfSearchAvatars + numberOfSearchContactIcons

    await messagesPage.insertTextToSearchInput("")
    const numberOfSearchAvatarsAfterSearch = await messagesPage.avatarsText
      .length
    const numberOfSearchContactIconsAfterSearch = await messagesPage
      .iconsContactFilled.length
    let numberOfThreadsAfterSearch =
      numberOfSearchAvatarsAfterSearch + numberOfSearchContactIconsAfterSearch

    await expect(numberOfThreads).toEqual(numberOfThreadsAfterSearch)
    await expect(numberOfThreads).toBeGreaterThan(numberOfSearchResults)
  })
})

describe("Messasges search scenarios - lack of results for user search input", () => {
  before(async () => {
    await waitForClickableAndClick(await navigationTabs.contactsTab)
    await waitForClickableAndClick(await navigationTabs.messagesTab)
  })

  it("Insert text that does not exist in any of messages", async () => {
    await messagesPage.insertTextToSearchInput(nonexistingword)
    const resultList = await messagesPage.searchResultsOverlayList
    const emptyList = await messagesPage.emptySearchResultsOverlayList

    await expect(resultList).toBeDisplayed()
    await expect(emptyList).toBeDisplayed()
    //TODO check see all button is not displayed
  })
})

describe("Check search after deleting messages and threads", () => {
  before(async () => {
    await waitForClickableAndClick(await navigationTabs.contactsTab)
    await deleteContactsWithSelectionManager()
    await waitForClickableAndClick(await navigationTabs.messagesTab)
    await deleteAllMessagesWithSelectionManager()
  })

  it("Insert text from deleted earlier message", async () => {
    await messagesPage.insertTextToSearchInput(commonword)
    const resultList = await messagesPage.searchResultsOverlayList
    const emptyList = await messagesPage.emptySearchResultsOverlayList
    const seeAllButton = await messagesPage.seeAllSearchResultsButton

    await expect(resultList).toBeDisplayed()
    await expect(emptyList).toBeDisplayed()
    await expect(seeAllButton).not.toBeDisplayed()
  })
})
