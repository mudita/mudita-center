import ContactsPage from "../page-objects/contacts.page"
import NavigationTabs from "../page-objects/tabs.page"

/** Add new contact */
export const addNewContact = async (
  firstNameText: string,
  lastNameText: string,
  primaryPhoneText: string,
  seondaryPhoneText?: string,
  firstLineAddressText?: string,
  secondLineAddressText?: string
) => {
  await NavigationTabs.clickContactsTab()

  await ContactsPage.clickNewContactButton()

  await ContactsPage.insertTextToFirstNameInput(firstNameText)
  await ContactsPage.insertTextToLastNameInput(lastNameText)
  await ContactsPage.insertTextToPrimaryPhoneNumberInput(primaryPhoneText)
  await ContactsPage.insertTextToSecondaryPhoneNumberInput(seondaryPhoneText)
  await ContactsPage.insertTextToAddressFirstLineInput(firstLineAddressText)
  await ContactsPage.insertTextToAddressSecondLineInput(secondLineAddressText)

  await ContactsPage.clickSaveContactButton()
}
