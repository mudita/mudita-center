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
  await console.log("****CONTACT ADD****")
  await console.log(firstNameText)

  await waitForClickableAndClick(await NavigationTabs.messagesTab)
  await waitForClickableAndClick(await NavigationTabs.contactsTab)

  await waitForClickableAndClick(await ContactsPage.newContactButton)

  await ContactsPage.insertTextToFirstNameInput(firstNameText)

  await ContactsPage.insertTextToLastNameInput(lastNameText)
  if (primaryPhoneText != undefined) {
    await ContactsPage.insertTextToPrimaryPhoneNumberInput(primaryPhoneText)
  }
  if (secondaryPhoneText != undefined) {
    await ContactsPage.insertTextToSecondaryPhoneNumberInput(secondaryPhoneText)
  }
  if (firstLineAddressText != undefined) {
    await ContactsPage.insertTextToAddressFirstLineInput(firstLineAddressText)
  }
  if (secondLineAddressText != undefined) {
    await ContactsPage.insertTextToAddressSecondLineInput(secondLineAddressText)
  }

  await waitForClickableAndClick(await ContactsPage.saveContactButton)
  try {
    await ContactsPage.newContactButton.waitForEnabled({ timeout: 9000 })
  } catch (error) {
    console.log(error)
    await browser.saveScreenshot("./waitForEnabledError.png")
  }
}

export const deleteContact = async () => {
  await waitForClickableAndClick(await ContactsPage.optionsButtonOnContactList)
  await waitForClickableAndClick(await ContactsPage.deleteContactOptionMenu)
  await waitForClickableAndClick(await ModalContactsPage.buttonConfirmDelete)

  await ModalContactsPage.buttonConfirmDeleteClick()

  const noContactsTextLabel = await ContactsPage.noContactsTextLabel

  await noContactsTextLabel.waitForDisplayed()
}

export const deleteContactsWithSelectionManager = async () => {
  //hover over data-testid="contact-row" to make checkbox display=true
  const contactRow = await ContactsPage.singleContactRow
  await contactRow.moveTo()

  await waitForClickableAndClick(await ContactsPage.checkboxSingleContact)

  //select all contacts
  await waitForClickableAndClick(await ContactsPage.checkboxSelectAll)

  await waitForClickableAndClick(
    await ContactsPage.buttonDeleteSelectionManager
  )
  await ModalContactsPage.buttonConfirmDeleteClick()
  const noContactsTextLabel = await ContactsPage.noContactsTextLabel

  await noContactsTextLabel.waitForDisplayed()
}
