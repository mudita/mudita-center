import NavigationTabs from "../../page-objects/tabs.page"
import ContactsPage from "../../page-objects/contacts.page"

describe("Contacts screen check", () => {
  before(async () => {
    // Waiting for device connected through USB
    await browser.executeAsync((done) => {
      setTimeout(done, 10000)
    })
  })

  it("Should click Contacts tab and check Import button is displayed", async () => {
    const contactsTab = await NavigationTabs.contactsTab
    await contactsTab.click()
    await browser.executeAsync((done) => {
      setTimeout(done, 2000)
    })
    const importBtn = await ContactsPage.importButton
    await expect(importBtn).toBeDisplayed()
  })
  it("Should click 'new contact' button and check it will become disabled", async () => {
    const newContactBtn = await ContactsPage.newContactButton
    await expect(newContactBtn).toBeDisplayed()
    await newContactBtn.click()
    await expect(newContactBtn).toBeDisabled()
  })
  it("Should check 'first name' input field is displayed", async () => {
    const firstName = await ContactsPage.firstNameInput

    await expect(firstName).toBeDisplayed()
  })

  it("Should check if 'last name' input field is displayed", async () => {
    const lastName = await ContactsPage.lastNameInput
    await expect(lastName).toBeDisplayed()
  })

  it("Should check if 'phone number' input field is displayed", async () => {
    const phoneNumber = await ContactsPage.phoneNumberInput
    await expect(phoneNumber).toBeDisplayed()
  })

  it("Should check if 'second phone number' input field is displayed", async () => {
    const phoneNumber2 = await ContactsPage.secondPhoneNumberInput
    await expect(phoneNumber2).toBeDisplayed()
  })

  it("Should check if 'address1' input field is displayed", async () => {
    const address1 = await ContactsPage.addressLine1Input
    await expect(address1).toBeDisplayed()
  })

  it("Should check if 'address2' input field is displayed", async () => {
    const address2 = await ContactsPage.addressLine2Input
    await expect(address2).toBeDisplayed()
  })

  it("Should check if 'add to favourites' checkbox field is displayed", async () => {
    const addFavourites = await ContactsPage.addToFavouritessCheckbox
    await expect(addFavourites).toBeDisplayed()
  })

  it("Should check if 'cancel button' field is displayed", async () => {
    const cancel = await ContactsPage.cancelButton
    await expect(cancel).toBeDisplayed()
  })

  it("Should check if 'save button' field is displayed", async () => {
    const save = await ContactsPage.saveButton
    await expect(save).toBeDisplayed()
  })
})
