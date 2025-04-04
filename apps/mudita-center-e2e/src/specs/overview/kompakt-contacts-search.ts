import { E2EMockClient } from "../../../../../libs/e2e-mock/client/src"
import tabsPage from "../../page-objects/tabs.page"
import ContactsKompaktPage from "../../page-objects/contacts-kompakt"
import { mockEntityDownloadProcess } from "../../helpers"
import { selectedContactsEntities } from "../../helpers/entity-fixtures"
import { expect } from "@wdio/globals"

describe("E2E mock sample - overview view", () => {
  before(async () => {
    E2EMockClient.connect()
    //wait for a connection to be established
    await browser.waitUntil(() => {
      return E2EMockClient.checkConnection()
    })
  })

  after(() => {
    E2EMockClient.stopServer()
    E2EMockClient.disconnect()
  })

  it("Connect device", async () => {
    E2EMockClient.addDevice({
      path: "path-1",
      serialNumber: "first-serial-number",
    })

    // mock contacts function for testing/modification purposes
    mockEntityDownloadProcess({
      path: "path-1",
      data: selectedContactsEntities,
      entityType: "contacts",
    })

    await browser.pause(6000)
    const menuItem = await $(`//a[@href="#/generic/mc-overview"]`)

    await menuItem.waitForDisplayed({ timeout: 10000 })
    await expect(menuItem).toBeDisplayed()
  })

  it("Open Contacts tab", async () => {
    const contactsKompaktTab = tabsPage.contactsKompaktTab
    await contactsKompaktTab.click()
  })

  it("Activate search field, input text and check if suggestion list appears", async () => {
    //input "Dr." as a search phrase
    const searchField = ContactsKompaktPage.searchField
    await searchField.click()
    await searchField.setValue("Dr.")

    //check if suggestion list is displayed
    const searchSuggestionsList = ContactsKompaktPage.searchSuggestionsList
    await expect(searchSuggestionsList).toBeDisplayed()
  })
  it("Find all search results and ensure exactly two results exist", async () => {
    // Fetch only visible elements with a valid number in `data-testid`
    const results = await $$(
      '//li[@data-testid and starts-with(@data-testid, "ui-form-search-results-")]'
    )

    // Ensure exactly 2 results exist
    await expect(results.length).toEqual(2)

    // Verify that results 1 and 2 are displayed
    const firstResult = await ContactsKompaktPage.getSearchSuggestionListResult(
      0
    ).isDisplayed()
    const secondResult =
      await ContactsKompaktPage.getSearchSuggestionListResult(1).isDisplayed()

    expect(firstResult).toBe(true)
    expect(secondResult).toBe(true)
  })
  it("Remove search phrase, input wrong search phrase (not found), check if no results is displayed", async () => {
    //click remove/close button (X) in search field to remove searched phrase
    const searchSuggestionsListEraseButton =
      ContactsKompaktPage.searchSuggestionsListEraseButton
    await expect(searchSuggestionsListEraseButton).toBeDisplayed()
    await searchSuggestionsListEraseButton.click()

    //input non-searchable phrase
    const searchField = ContactsKompaktPage.searchField
    await searchField.click()
    await searchField.setValue("@#@#@#@#@@#hisdhisdh")

    const searchSuggestionsListEmpty =
      ContactsKompaktPage.searchSuggestionsListEmpty
    await expect(searchSuggestionsListEmpty).toBeDisplayed()
    const searchSuggestionsListEmptyText =
      ContactsKompaktPage.searchSuggestionsListEmptyText
    await expect(searchSuggestionsListEmptyText).toHaveText(
      "We couldn't find anything..."
    )
  })

  it("Test search Rules", async () => {
    //1.0 check if search suggestions appear after inputing 1 character
    const searchField = ContactsKompaktPage.searchField
    await searchField.click()
    await searchField.setValue("a")
    const searchSuggestionsList = ContactsKompaktPage.searchSuggestionsList
    await expect(searchSuggestionsList).toBeDisplayed()
    //1.1 clear search field
    const searchSuggestionsListEraseButton =
      ContactsKompaktPage.searchSuggestionsListEraseButton
    await expect(searchSuggestionsListEraseButton).toBeDisplayed()
    await searchSuggestionsListEraseButton.click()
    await browser.pause(500)

    //2.0 input a number and check if there are many search results on the list
    await searchField.setValue("1")
    //2.1 check if there are more than 4 results
    const results = await $$(
      '//li[@data-testid and starts-with(@data-testid, "ui-form-search-results-")]'
    )
    await expect(results.length).toBeGreaterThan(4) //there are 5 results for this search
    //2.2 clear search field
    await searchSuggestionsListEraseButton.click()
    await browser.pause(500)

    //3.0 input an empty space " " and check if there are many search results on the list
    await searchField.setValue(" ")
    // 3.1 check if 17 results will appear
    const updatedresults = await $$(
      '//li[@data-testid and starts-with(@data-testid, "ui-form-search-results-")]'
    )
    await expect(updatedresults.length).toBeGreaterThan(16) //there are 17 results for this search
    //3.2 clear search field
    await searchSuggestionsListEraseButton.click()
    await browser.pause(500)

    //4.0 search using only phone number
    const telNum: string = "+48345678902"
    await searchField.setValue(telNum)
    //4.1click the only result on the search list
    await searchSuggestionsList.click()
    //4.2check contact title in Details view to compare
    const contactDisplayNameHeader =
      await ContactsKompaktPage.contactDisplayNameHeader
    await expect(contactDisplayNameHeader).toHaveText(telNum)
    await browser.pause(500)

    //5.0 search by website contact attribute only
    const website: string = "https://websiteonly.com"
    await searchField.click()
    await searchField.setValue(website)
    //5.1click the only result on the search list
    await searchSuggestionsList.click()
    //5.2check contact title in Details view to compare
    await expect(contactDisplayNameHeader).toHaveText(website)
    await browser.pause(500)

    //6.0 search by email contact attribute only
    const email: string = "work@email.com"
    await searchField.click()
    await searchField.setValue(email)
    //6.1click the only result on the search list
    await searchSuggestionsList.click()
    //6.2check contact title in Details view to compare
    await expect(contactDisplayNameHeader).toHaveText(email)
    await browser.pause(500)
  })
  it("Test Order rules", async () => {
    // Get the first search result (index 0) and verify its text
    const searchField = ContactsKompaktPage.searchField
    await searchField.click()
    await searchField.setValue("Micha")
    const firstResult = await ContactsKompaktPage.getSearchSuggestionListResult(
      0
    )
    await expect(firstResult).toHaveText("Michael Brown")

    // Get the third search result (index 2) and verify its text
    await browser.pause(500)

    const thirdResult = await ContactsKompaktPage.getSearchSuggestionListResult(
      2
    )
    // Find the specific element that contains only the name
    await browser.pause(500)

    const nameElement = await thirdResult.$('p[data-testid="ui-typography-p3"]')

    // Assert only the name, ignoring the phone number
    await browser.pause(500)

    await expect(nameElement).toHaveText("Dr. Michael Johnson PhD")

    // Get all search result elements
    await browser.pause(500)

    const searchResults = await $$(
      '//*[@data-testid and starts-with(@data-testid, "ui-form-search-results-")]'
    )
  })

  it("Check if the selected contact from search opens contact details, the search field is cleared and the selected contact is highlighted in the contact list.", async () => {
    //input "Dr. Anna" as a search phrase
    await browser.pause(500)
    const searchField = ContactsKompaktPage.searchField
    await searchField.click()
    await searchField.setValue("Dr. Anna")

    //click the only result on the search list
    await browser.pause(500)
    const searchSuggestionsList = ContactsKompaktPage.searchSuggestionsList
    await searchSuggestionsList.click()

    //check if contacts search field is cleared
    await expect(searchField).not.toHaveText

    //check contact title in Details view
    await browser.pause(500)
    const contactDisplayNameHeader =
      await ContactsKompaktPage.contactDisplayNameHeader
    await expect(contactDisplayNameHeader).toHaveText("Dr. Anna Nowak Jr.")

    //check if selected contact is highlighted on the contacts list

    const selectedContact = ContactsKompaktPage.allContactsTableRows[7]
    const backgroundColor = await selectedContact.getCSSProperty(
      "background-color"
    )
    await expect(backgroundColor.value).not.toBe("rgb(251, 251, 251)") // Default background color
  })
})
