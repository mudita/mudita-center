import { E2EMockClient } from "../../../../../libs/e2e-mock/client/src"
import tabsPage from "../../page-objects/tabs.page"
import ContactsKompaktPage from "../../page-objects/contacts-kompakt"
import exp from "constants"

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

    await browser.pause(6000)
    const menuItem = await $(`//a[@href="#/generic/mc-overview"]`)

    await menuItem.waitForDisplayed({ timeout: 10000 })
    await expect(menuItem).toBeDisplayed()
  })

  it("Click Contacts tab and check contacts counter", async () => {
    // mock contacts function for testing/modification purposes
    // mockEntityDownloadProcess({
    //   path: "path-1",
    //   data: selectedContactsEntities,
    //   entityType: "contacts",
    // })
    const contactsKompaktTab = tabsPage.contactsKompaktTab
    await contactsKompaktTab.click()

    const contactsCounter = ContactsKompaktPage.contactsCounter
    await expect(contactsCounter).toBeDisplayed()
    await expect(contactsCounter).toHaveText("Contacts (1)")
  })

  it("Verify Page elements ", async () => {
    const contactsSearchField = ContactsKompaktPage.contactsSearchField
    await expect(contactsSearchField).toBeDisplayed()
    await expect(contactsSearchField).toHaveAttribute("type", "search")

    const addContactButton = ContactsKompaktPage.addContactButton
    await expect(addContactButton).toBeDisplayed()

    const importContactsButton = ContactsKompaktPage.importContactsButton
    await expect(importContactsButton).toBeDisplayed()
    await expect(importContactsButton).toBeClickable()
  })

  xit("Verify different contacts", async () => {})

  it("Verify contacts array", async () => {
    //scroll down
    await browser.execute(() => {
      window.scrollTo(0, document.body.scrollHeight)
    })

    //check if import contacts button is still clickable
    const importContactsButton = ContactsKompaktPage.importContactsButton
    await expect(importContactsButton).toBeDisplayed()
    await expect(importContactsButton).toBeClickable()

    //check if there is at least 10 contacts
    const rows = await ContactsKompaktPage.allContactsTableRows
    expect(rows.length).toBeGreaterThanOrEqual(10)

    //click on the last contact
    const lastRow = rows[rows.length - 1]
    const isDisplayed = await lastRow.isDisplayed()
    expect(isDisplayed).toBe(true)
    const contactsTableRow = ContactsKompaktPage.contactsTableRow
    await contactsTableRow.click()
  })
})
