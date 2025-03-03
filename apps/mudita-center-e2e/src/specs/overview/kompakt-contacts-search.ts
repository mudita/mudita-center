import { E2EMockClient } from "../../../../../libs/e2e-mock/client/src"
import tabsPage from "../../page-objects/tabs.page"
import ContactsKompaktPage from "../../page-objects/contacts-kompakt"
import { mockEntityDownloadProcess } from "../../helpers"
import { selectedContactsEntities } from "../../helpers/entity-fixtures"
import { search } from "@orama/orama/dist/components/index"

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
    const searchField = ContactsKompaktPage.searchField
    await searchField.click()
    await searchField.setValue("Dr.")

    const searchSuggestionsField = ContactsKompaktPage.searchSuggestionsField
    await expect(searchSuggestionsField).toBeDisplayed()
  })
})
