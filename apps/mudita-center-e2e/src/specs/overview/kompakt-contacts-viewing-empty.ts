import { E2EMockClient } from "../../../../../libs/e2e-mock/client/src"
import { mockEntityDownloadProcess } from "../../helpers/mock-entity-download-process.helper"
import tabsPage from "../../page-objects/tabs.page"
import ContactsKompaktPage from "../../page-objects/contacts-kompakt"

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
    mockEntityDownloadProcess({
      path: "path-1",
      data: [],
      entityType: "contacts",
    })

    E2EMockClient.addDevice({
      path: "path-1",
      serialNumber: "first-serial-number",
    })

    await browser.pause(6000)
    const menuItem = await $(`//a[@href="#/generic/mc-overview"]`)

    await menuItem.waitForDisplayed({ timeout: 10000 })
    await expect(menuItem).toBeDisplayed()
  })

  it("Click Contacts tab", async () => {
    const contactsKompaktTab = tabsPage.contactsKompaktTab
    await contactsKompaktTab.click()
  })

  it("Check if no contacts are displayed in the Contacts", async () => {
    // check if no contact row is displayed
    const contactsTableRow = ContactsKompaktPage.contactsTableRow
    await expect(contactsTableRow).not.toBeDisplayed()

    //check if contacts icon that is displayed only on empty contacts page is present
    const iconContactsBook = ContactsKompaktPage.iconContactsBook
    await expect(iconContactsBook).toBeDisplayed()
    //check if contacts import subtext that is displayed only on empty contacts page is present
    const importContactsSubtext = ContactsKompaktPage.importContactsSubtext
    await expect(importContactsSubtext).toHaveText(
      "Import all your contacts from a single source."
    )
    //check if contacts import button is present
    const importContactsButton = ContactsKompaktPage.importContactsButton
    await expect(importContactsButton).toBeDisplayed()
    await expect(importContactsButton).toBeClickable()
  })
})
