import { E2EMockClient } from "../../../../../libs/e2e-mock/client/src"
import tabsPage from "../../page-objects/tabs.page"
import ContactsKompaktPage from "../../page-objects/contacts-kompakt"
import { mockEntityDownloadProcess } from "../../helpers"
import { selectedContactsEntities } from "../../helpers/entity-fixtures"

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

  it("Click Contacts tab and check contacts counter", async () => {
    const contactsKompaktTab = tabsPage.contactsKompaktTab
    await contactsKompaktTab.click()

    const contactsCounter = ContactsKompaktPage.contactsCounter
    await expect(contactsCounter).toBeDisplayed()
    await expect(contactsCounter).toHaveText("Contacts (17)")
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

  it("Verify different contacts", async () => {
    // first row -> Long Display Name...
    const checkbox = await ContactsKompaktPage.checkboxByRowIndex(0)
    const isChecked = await checkbox.isSelected()
    console.log(`Checkbox is selected: ${isChecked}`)
    expect(isChecked).toBe(false)

    const displayName = await ContactsKompaktPage.displayNameByRowIndex(0)
    const displayNameText = await displayName.getText()
    console.log(`Display Name: ${displayNameText}`)
    expect(displayNameText).toContain("Long Display Name")

    //empty contact
    const lastCell = await ContactsKompaktPage.emptyCellByRowIndex(0)
    const lastCellText = await lastCell.getText()
    console.log(`Empty Cell Content: ${lastCellText}`)
    expect(lastCellText).toBe("")

    //phone number
    const phoneNumber = await ContactsKompaktPage.phoneNumberByRowIndex(0)
    const phoneNumberText = await phoneNumber.getText()
    console.log(`Phone Number: ${phoneNumberText}`)
    expect(phoneNumberText).toBe("+48123456786")

    //empty phone number
    const phoneNumberCounter =
      await ContactsKompaktPage.phoneNumberCounterByRowIndex(0)
    const phoneNumberCounterText = await phoneNumberCounter.getText()
    console.log(`Phone Number Counter: ${phoneNumberCounterText}`)
    expect(phoneNumberCounterText).toBe("")

    // prefix name lastname suffix
    const displayName5 = await ContactsKompaktPage.displayNameByRowIndex(5)
    const rows = await ContactsKompaktPage.allContactsTableRows
    expect(rows.length).toBeGreaterThan(5)
    const displayNameText5 = await displayName5.getText()
    console.log(`Display Name: ${displayNameText5}`)

    // prefix
    expect(displayNameText5).toContain("Dr.")

    // suffix
    expect(displayNameText5).toContain("PhD")

    // just phone number
    const phoneNumberCounter5 =
      await ContactsKompaktPage.phoneNumberCounterByRowIndex(5)
    const phoneNumberCounterText5 = await phoneNumberCounter5.getText()
    console.log(`Phone Number Counter: ${phoneNumberCounterText5}`)
    expect(phoneNumberCounterText5).toBe("+1")
  })

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
    const contactsTableCell = ContactsKompaktPage.contactsTableCell
    await contactsTableCell.click()
  })
})
