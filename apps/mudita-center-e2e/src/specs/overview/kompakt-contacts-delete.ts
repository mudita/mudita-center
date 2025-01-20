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
  it("Check delete modal", async () => {
    const contactDetailsDeleteButton =
      ContactsKompaktPage.contactDetailsDeleteButton
    await expect(contactDetailsDeleteButton).toBeClickable()
    await contactDetailsDeleteButton.click()

    //check delete modal
    const contactDeleteModal = ContactsKompaktPage.contactDeleteModal
    await expect(contactDeleteModal).toBeDisplayed()

    const contactDeleteModalIcon = ContactsKompaktPage.contactDeleteModalIcon
    await expect(contactDeleteModalIcon).toBeDisplayed()

    const contactDeleteModalTitle = ContactsKompaktPage.contactDeleteModalTitle
    await expect(contactDeleteModalTitle).toHaveText("Delete contact")

    const contactDeleteModalText = ContactsKompaktPage.contactDeleteModalText
    await expect(contactDeleteModalText).toHaveText(
      "This can't be undone so please make a copy of any important information first."
    )
  })
  it("Check if clicking on background is impossible, check modal cancellation", async () => {
    //check if backgroud is not working while delete modal is open <- check if user is able to click Settings tab
    const settingsTabKompaktTab = tabsPage.settingsTab
    const isClickable = await settingsTabKompaktTab.isClickable()
    expect(isClickable).toBe(false)

    //check modal cancellation
    const deleteContactCancelButton =
      ContactsKompaktPage.deleteContactCancelButton
    await expect(deleteContactCancelButton).toBeClickable()
    await deleteContactCancelButton.click()
  })
  it("Check contact deletion and counter update", async () => {
    //click again to open modal again
    const contactDetailsDeleteButton =
      ContactsKompaktPage.contactDetailsDeleteButton
    await contactDetailsDeleteButton.click()

    //mock deletion of contacts process
    mockEntityDeleteProcess({
      entityType: "contacts",
      totalEntities: selectedContactsEntities.length - 1,
    })
    const deleteContactConfirmButton =
      ContactsKompaktPage.deleteContactConfirmButton
    await expect(deleteContactConfirmButton).toBeClickable()
    await deleteContactConfirmButton.click()

    //verify if counter is updated after deleting (number should be deducted by 1)
    const contactsCounter = ContactsKompaktPage.contactsCounter
    await expect(contactsCounter).toBeDisplayed()
    await expect(contactsCounter).toHaveText("Contacts (16)")
  })
})
