/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import navigationTabs from "../../page-objects/tabs.page"
import contactsPage from "../../page-objects/contacts.page"
import modalGeneralPage from "../../page-objects/modal-general.page"
import modalContactsPage from "../../page-objects/modal-contacts.page"

import { contacts } from "../../test-data/contacts-only-test-data"
import { waitForClickableAndClick } from "../../helpers/general.helper"

describe("Add, edit, delete single contact scenarios", () => {
  before(async () => {
    // Waiting for device connected through USB
    await browser.pause(10000)
    await modalGeneralPage.clickUpdateAvailableModalCloseButton()
    await navigationTabs.clickContactsTab()
  })

  it("Should press new contact button, add contact data and save it", async () => {
    const newContactButton = await contactsPage.newContactButton
    await waitForClickableAndClick(newContactButton)
    await expect(newContactButton).toBeDisabled()

    await contactsPage.insertTextToFirstNameInput(contacts[1].firstName)
    await contactsPage.insertTextToLastNameInput(contacts[1].lastName)
    await contactsPage.insertTextToPrimaryPhoneNumberInput(
      contacts[1].primaryNumber
    )
    await contactsPage.insertTextToSecondaryPhoneNumberInput(
      contacts[1].secondaryNumber
    )
    await contactsPage.insertTextToAddressFirstLineInput(
      contacts[1].addressFirstLine
    )
    await contactsPage.insertTextToAddressSecondLineInput(
      contacts[1].addressSecondLine
    )
    if (contacts[1].addToFavourites) {
      await contactsPage.addToFavouritessCheckbox.click()
    }
    await contactsPage.clickSaveContactButton()
    await browser.pause(4000)

    const storedContacts = await contactsPage.listOfContacts
    expect(storedContacts.length).toBeGreaterThan(0)
    const ContactData = await storedContacts[0].getText()
    expect(ContactData).toHaveText(
      `${contacts[1].firstName} ${contacts[1].lastName}`
    )

    const phoneNumber = await contactsPage.phoneNumberOnContactList
    expect(phoneNumber).toHaveTextContaining([
      contacts[1].primaryNumber,
      contacts[1].secondaryNumber,
    ])
  })

  it("Should click on contact and check contact details screen", async () => {
    const singleContact = await contactsPage.singleContactRow
    await singleContact.click()
    const nameDetails = await contactsPage.nameOnContactDetailScreen
    await nameDetails.waitForDisplayed()
    await expect(nameDetails).toHaveText(
      `${contacts[1].firstName} ${contacts[1].lastName}`
    )

    const number1Details = await contactsPage.phoneNumber1OnContactDetailScreen
    await number1Details.waitForDisplayed()
    const number1DetailsValue = await number1Details.getValue()
    expect(number1DetailsValue).toHaveValue(contacts[1].primaryNumber)

    const number2Details = await contactsPage.phoneNumber2OnContactDetailScreen
    await number2Details.waitForDisplayed()

    expect(number2Details).toHaveValue(contacts[1].secondaryNumber)

    await contactsPage.closeButtonClick()
  })

  it("Should edit contact using options menu", async () => {
    await contactsPage.optionsButtonOnContactListClick()
    await browser.pause(2000)
    const editOption = await contactsPage.editContactOptionMenu
    await editOption.click()
    await browser.pause(2000)

    await contactsPage.insertTextToFirstNameInput(contacts[3].firstName)
    await contactsPage.insertTextToLastNameInput(contacts[3].lastName)

    await contactsPage.insertTextToPrimaryPhoneNumberInput(
      contacts[2].primaryNumber
    )

    await contactsPage.clickSaveContactButton()
    await browser.pause(4000)

    await contactsPage.closeButtonClick()

    const storedContacts = await contactsPage.listOfContacts
    expect(storedContacts.length).toBeGreaterThan(0)
    const ContactData = await storedContacts[0].getText()
    expect(ContactData).toHaveText(
      `${contacts[3].firstName} ${contacts[3].lastName}`
    )
  })

  it("Should delete single contact using options menu and check no contacts screen is displayed", async () => {
    await contactsPage.optionsButtonOnContactListClick()
    await browser.pause(2000)
    const deleteOption = await contactsPage.deleteContactOptionMenu
    await deleteOption.click()

    modalContactsPage.buttonConfirmDeleteClick()
    await browser.pause(3000)

    const noContactsTextLabel = await contactsPage.noContactsTextLabel

    await noContactsTextLabel.waitForDisplayed()
    await expect(noContactsTextLabel).toBeDisplayed()
    await expect(noContactsTextLabel).toHaveTextContaining([
      "You don't have any contacts yet",
      "Press New Contact to add one.",
    ])
  })
})
describe("Favourites contact scenarios", () => {
  const contactToAdd = contacts[0]
  const contactToEdit = contacts[2]

  before(async () => {
    // Waiting for device connected through USB
    await browser.pause(10000)
    await modalGeneralPage.clickUpdateAvailableModalCloseButton()
    await navigationTabs.clickContactsTab()
  })

  it("Should press new contact button, add contact data and save it", async () => {
    const newContactButton = await contactsPage.newContactButton
    await waitForClickableAndClick(newContactButton)
    await expect(newContactButton).toBeDisabled()

    await contactsPage.insertTextToFirstNameInput(contactToAdd.firstName)
    await contactsPage.insertTextToLastNameInput(contactToAdd.lastName)
    await contactsPage.insertTextToPrimaryPhoneNumberInput(
      contactToAdd.primaryNumber
    )
    await contactsPage.insertTextToSecondaryPhoneNumberInput(
      contactToAdd.secondaryNumber
    )
    await contactsPage.insertTextToAddressFirstLineInput(
      contactToAdd.addressFirstLine
    )
    await contactsPage.insertTextToAddressSecondLineInput(
      contactToAdd.addressSecondLine
    )
    if (contactToAdd.addToFavourites) {
      await contactsPage.addToFavouritessCheckbox.click()
    }
    await contactsPage.clickSaveContactButton()
    await browser.pause(2000)
    const storedContacts = await contactsPage.listOfContacts
    expect(storedContacts.length).toBeGreaterThan(0)
    const ContactData = await storedContacts[0].getText()
    expect(ContactData).toHaveText(
      `${contacts[0].firstName} ${contacts[0].lastName}`
    )

    const phoneNumber = await contactsPage.phoneNumberOnContactList
    expect(phoneNumber).toHaveTextContaining([
      contacts[0].primaryNumber,
      contacts[0].secondaryNumber,
    ])
  })

  it("Should click on contact and check contact details screen (including favourites icon)", async () => {
    const singleContact = await contactsPage.singleContactRow
    await singleContact.click()
    const nameDetails = await contactsPage.nameOnContactDetailScreen
    await nameDetails.waitForDisplayed()
    await expect(nameDetails).toHaveText(
      `${contactToAdd.firstName} ${contactToAdd.lastName}`
    )

    const number1Details = await contactsPage.phoneNumber1OnContactDetailScreen
    await number1Details.waitForDisplayed()
    const number1DetailsValue = await number1Details.getValue()
    expect(number1DetailsValue).toHaveValue(contactToAdd.primaryNumber)

    const number2Details = await contactsPage.phoneNumber2OnContactDetailScreen
    await number2Details.waitForDisplayed()

    expect(number2Details).toHaveValue(contactToAdd.secondaryNumber)

    const favIcon = await contactsPage.contactDetailsFavouritesIcon
    await expect(favIcon).toBeDisplayed()
    await contactsPage.closeButtonClick()
  })

  it("Should edit contact using options menu (without changing add to favourites settings", async () => {
    await contactsPage.optionsButtonOnContactListClick()
    await browser.pause(2000)
    const editOption = await contactsPage.editContactOptionMenu
    await editOption.click()
    await browser.pause(2000)

    await contactsPage.insertTextToFirstNameInput(contactToEdit.firstName)
    await contactsPage.insertTextToLastNameInput(contactToEdit.lastName)

    await contactsPage.insertTextToPrimaryPhoneNumberInput(
      contactToEdit.primaryNumber
    )

    await contactsPage.clickSaveContactButton()
    await browser.pause(2000)
    await contactsPage.closeButtonClick()

    const storedContacts = await contactsPage.listOfContacts
    expect(storedContacts.length).toBeGreaterThan(0)
    const ContactData = await storedContacts[0].getText()
    expect(ContactData).toHaveText(
      `${contactToEdit.firstName} ${contactToEdit.lastName}`
    )
  })
  it("Should click on contact and check contact details screen (including favourites icon)", async () => {
    const singleContact = await contactsPage.singleContactRow
    await singleContact.click()
    const nameDetails = await contactsPage.nameOnContactDetailScreen
    await nameDetails.waitForDisplayed()
    await expect(nameDetails).toHaveText(
      `${contactToEdit.firstName} ${contactToEdit.lastName}`
    )

    const number1Details = await contactsPage.phoneNumber1OnContactDetailScreen
    await number1Details.waitForDisplayed()
    const number1DetailsValue = await number1Details.getValue()
    expect(number1DetailsValue).toHaveValue(contactToEdit.primaryNumber)

    const number2Details = await contactsPage.phoneNumber2OnContactDetailScreen
    await number2Details.waitForDisplayed()

    expect(number2Details).toHaveValue(contactToEdit.secondaryNumber)

    const favIcon = await contactsPage.contactDetailsFavouritesIcon
    await expect(favIcon).toBeDisplayed()

    await contactsPage.closeButtonClick()
  })
  it("Should edit contact using options menu (remove from favourites)", async () => {
    await contactsPage.optionsButtonOnContactListClick()
    await browser.pause(2000)
    const editOption = await contactsPage.editContactOptionMenu
    await editOption.click()
    await browser.pause(2000)

    await waitForClickableAndClick(await contactsPage.addToFavouritessCheckbox)
    await contactsPage.clickSaveContactButton()
    await browser.pause(4000)

    await contactsPage.closeButtonClick()

    const storedContacts = await contactsPage.listOfContacts
    expect(storedContacts.length).toBeGreaterThan(0)
    const ContactData = await storedContacts[0].getText()
    expect(ContactData).toHaveText(
      `${contactToEdit.firstName} ${contactToEdit.lastName}`
    )
  })

  it("Should click on contact and check contact was removed from favourites", async () => {
    const singleContact = await contactsPage.singleContactRow
    await singleContact.click()
    const nameDetails = await contactsPage.nameOnContactDetailScreen
    await nameDetails.waitForDisplayed()
    await expect(nameDetails).toHaveText(
      `${contactToEdit.firstName} ${contactToEdit.lastName}`
    )
    const favIcon = await contactsPage.contactDetailsFavouritesIcon
    await expect(favIcon).not.toBeDisplayed()

    await contactsPage.closeButtonClick()
  })

  it("Should delete single contact using options menu and check no contacts screen is displayed", async () => {
    await contactsPage.optionsButtonOnContactListClick()
    await browser.pause(2000)
    const deleteOption = await contactsPage.deleteContactOptionMenu
    await deleteOption.click()

    modalContactsPage.buttonConfirmDeleteClick()
    await browser.pause(3000)

    const noContactsTextLabel = await contactsPage.noContactsTextLabel

    await noContactsTextLabel.waitForDisplayed()
    await expect(noContactsTextLabel).toBeDisplayed()
    await expect(noContactsTextLabel).toHaveTextContaining([
      "You don't have any contacts yet",
      "Press New Contact to add one.",
    ])
  })
})
