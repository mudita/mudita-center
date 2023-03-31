/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */
import ContactsPage from "../page-objects/contacts.page"
import NavigationTabs from "../page-objects/tabs.page"
import ModalContactsPage from "../page-objects/modal-contacts.page"
import { waitForClickableAndClick } from "../helpers/general.helper"
/** Add new contact */
export const addNewContact = async (
  firstNameText: string,
  lastNameText: string,
  primaryPhoneText: string,
  secondaryPhoneText?: string,
  firstLineAddressText?: string,
  secondLineAddressText?: string
) => {
  await NavigationTabs.clickContactsTab()

  await ContactsPage.clickNewContactButton()

  await ContactsPage.insertTextToFirstNameInput(firstNameText)
  await ContactsPage.insertTextToLastNameInput(lastNameText)
  await ContactsPage.insertTextToPrimaryPhoneNumberInput(primaryPhoneText)
  await ContactsPage.insertTextToSecondaryPhoneNumberInput(secondaryPhoneText)
  await ContactsPage.insertTextToAddressFirstLineInput(firstLineAddressText)
  await ContactsPage.insertTextToAddressSecondLineInput(secondLineAddressText)

  await ContactsPage.clickSaveContactButton()
}

export const deleteContact = async () => {
  await waitForClickableAndClick(await ContactsPage.optionsButtonOnContactList)
  await waitForClickableAndClick(await ContactsPage.deleteContactOptionMenu)
  await waitForClickableAndClick(await ModalContactsPage.buttonConfirmDelete)

  ModalContactsPage.buttonConfirmDeleteClick()

  const noContactsTextLabel = await ContactsPage.noContactsTextLabel

  await noContactsTextLabel.waitForDisplayed()
}
