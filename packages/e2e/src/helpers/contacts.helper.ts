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
  await browser.saveScreenshot("./" + firstNameText + "_1.png")
  //await ContactsPage.clickNewContactButton()

  await ContactsPage.insertTextToFirstNameInput(firstNameText)
  await browser.saveScreenshot("./" + firstNameText + "_2.png")
  await ContactsPage.insertTextToLastNameInput(lastNameText)
  if (primaryPhoneText != undefined) {
    await browser.saveScreenshot("./" + firstNameText + "_3.png")
    await ContactsPage.insertTextToPrimaryPhoneNumberInput(primaryPhoneText)
  }
  if (secondaryPhoneText != undefined) {
    await browser.saveScreenshot("./" + firstNameText + "_4.png")
    await ContactsPage.insertTextToSecondaryPhoneNumberInput(secondaryPhoneText)
  }
  if (firstLineAddressText != undefined) {
    await browser.saveScreenshot("./" + firstNameText + "_5.png")
    await ContactsPage.insertTextToAddressFirstLineInput(firstLineAddressText)
  }
  if (secondLineAddressText != undefined) {
    await browser.saveScreenshot("./" + firstNameText + "_6.png")
    await ContactsPage.insertTextToAddressSecondLineInput(secondLineAddressText)
  }

  //await ContactsPage.clickSaveContactButton()
  await waitForClickableAndClick(await ContactsPage.saveContactButton)
  await browser.saveScreenshot("./" + firstNameText + "_7.png")
  await browser.pause(2000)
}

export const deleteContact = async () => {
  await waitForClickableAndClick(await ContactsPage.optionsButtonOnContactList)
  await waitForClickableAndClick(await ContactsPage.deleteContactOptionMenu)
  await waitForClickableAndClick(await ModalContactsPage.buttonConfirmDelete)

  ModalContactsPage.buttonConfirmDeleteClick()

  const noContactsTextLabel = await ContactsPage.noContactsTextLabel

  await noContactsTextLabel.waitForDisplayed()
}
