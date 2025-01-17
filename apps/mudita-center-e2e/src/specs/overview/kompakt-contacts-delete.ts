import { E2EMockClient } from "../../../../../libs/e2e-mock/client/src"
import tabsPage from "../../page-objects/tabs.page"
import ContactsKompaktPage from "../../page-objects/contacts-kompakt"
import { mockEntityDownloadProcess } from "../../helpers"
import { mockEntityDeleteProcess } from "../../helpers/mock-entity-delete-process"
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

  it("Select first contact to open contact details", async () => {
    const contactsList = await ContactsKompaktPage.allContactsTableRows
    await contactsList[0].click()
  })
  it("Click Delete contact", async () => {
    const contactDetailsDeleteButton =
      ContactsKompaktPage.contactDetailsDeleteButton
    await expect(contactDetailsDeleteButton).toBeClickable()
    await contactDetailsDeleteButton.click()

    const contactDeleteModal = ContactsKompaktPage.contactDeleteModal
    await expect(contactDeleteModal).toBeDisplayed()

    //check modal cancellation
    const deleteContactCancelButton =
      ContactsKompaktPage.deleteContactCancelButton
    await expect(deleteContactCancelButton).toBeClickable()
    await deleteContactCancelButton.click()

    //mock delete action
    mockEntityDeleteProcess({
      entityType: "contacts",
      totalEntities: selectedContactsEntities.length - 1,
    })
    //click again to open modal again
    await contactDetailsDeleteButton.click()

    const deleteContactConfirmButton =
      ContactsKompaktPage.deleteContactConfirmButton
    await expect(deleteContactConfirmButton).toBeClickable()
    await deleteContactConfirmButton.click()

    //verify if counter is updated after deleting
    const contactsCounter = ContactsKompaktPage.contactsCounter
    await expect(contactsCounter).toBeDisplayed()
    await expect(contactsCounter).toHaveText("Contacts (16)")
  })
})
