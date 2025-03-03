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

    //await browser.pause(500000)
  })
})
