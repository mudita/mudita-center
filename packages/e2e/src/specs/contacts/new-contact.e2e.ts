/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import NavigationTabs from "../../page-objects/tabs.page"
import ContactsPage from "../../page-objects/contacts.page"
import ModalGeneralPage from "../../page-objects/modal-general.page"
import ModalContactsPage from "../../page-objects/modal-contacts.page"

describe("Add, edit, delete single contact scenarios", () => {
  before(async () => {
    // Waiting for device connected through USB
    await browser.executeAsync((done) => {
      setTimeout(done, 13000)
    })
    await ModalGeneralPage.clickUpdateAvailableModalCloseButton()
    await NavigationTabs.clickContactsTab()
    await browser.executeAsync((done) => {
      setTimeout(done, 1000)
    })
  })

  it("Should press new contact button, add contact data and save it", async () => {
    const newContactButton = await ContactsPage.newContactButton
    await expect(newContactButton).toBeDisplayed()
    await newContactButton.click()
    await expect(newContactButton).toBeDisabled()

    await ContactsPage.insertTextToFirstNameInput("Henryk")
    await ContactsPage.insertTextToLastNameInput("Zaskroniec")
    await ContactsPage.insertTextToPrimaryPhoneNumberInput("602900000")
    await ContactsPage.insertTextToSecondaryPhoneNumberInput("510100100")
    await ContactsPage.insertTextToAddressFirstLineInput(
      "Al. Ujazdowskie 100/19"
    )
    await ContactsPage.insertTextToAddressSecondLineInput("00-675 Warszawa")

    await ContactsPage.clickSaveContactButton()
    await browser.executeAsync((done) => {
      setTimeout(done, 2000)
    })

    const storedContacts = await ContactsPage.listOfContacts
    expect(storedContacts.length).toBeGreaterThan(0)
    const ContactData = await storedContacts[0].getText()
    expect(ContactData).toHaveText("Henryk Zaskroniec")

    const phoneNumber = await ContactsPage.phoneNumberOnContactList
    expect(phoneNumber).toHaveTextContaining(["602900000", "510100100"])
  })

  it("Should click on contact and check contact details screen", async () => {
    const singleContact = await ContactsPage.singleContactRow
    await singleContact.click()
    const nameDetails = await ContactsPage.nameOnContactDetailScreen
    await nameDetails.waitForDisplayed()
    await expect(nameDetails).toHaveText("Henryk Zaskroniec")

    const number1Details = await ContactsPage.phoneNumber1OnContactDetailScreen
    await number1Details.waitForDisplayed()
    const number1DetailsValue = await number1Details.getValue()
    expect(number1DetailsValue).toHaveValue("602900000")

    const number2Details = await ContactsPage.phoneNumber2OnContactDetailScreen
    await number2Details.waitForDisplayed()

    expect(number2Details).toHaveValue("510100100")

    await ContactsPage.closeButtonClick()
  })

  it("Should edit contact using options menu", async () => {
    await ContactsPage.optionsButtonOnContactListClick()
    await browser.executeAsync((done) => {
      setTimeout(done, 2000)
    })
    const editOption = await ContactsPage.editContactOptionMenu
    await editOption.click()
    await browser.executeAsync((done) => {
      setTimeout(done, 2000)
    })

    await ContactsPage.insertTextToFirstNameInput("Kazimierz")
    await ContactsPage.insertTextToFirstNameInput("Glonojad")

    await ContactsPage.insertTextToPrimaryPhoneNumberInput("601100601")

    await ContactsPage.clickSaveContactButton()
    await browser.executeAsync((done) => {
      setTimeout(done, 2000)
    })

    await ContactsPage.closeButtonClick()

    const storedContacts = await ContactsPage.listOfContacts
    expect(storedContacts.length).toBeGreaterThan(0)
    const ContactData = await storedContacts[0].getText()
    expect(ContactData).toHaveText("Kazimierz Glonojad")
  })

  it("Should delete single contact using options menu and check no contacts screen is displayed", async () => {
    await ContactsPage.optionsButtonOnContactListClick()
    await browser.executeAsync((done) => {
      setTimeout(done, 2000)
    })
    const deleteOption = await ContactsPage.deleteContactOptionMenu
    await deleteOption.click()

    ModalContactsPage.buttonConfirmDeleteClick()
    await browser.executeAsync((done) => {
      setTimeout(done, 3000)
    })

    const noContactsTextLabel = await ContactsPage.noContactsTextLabel

    await noContactsTextLabel.waitForDisplayed()
    const noContactsH3Value = await noContactsTextLabel.$("<h3>")
    const noContactsPValue = await noContactsTextLabel.$("<p>")
    await expect(noContactsH3Value).toHaveText("No contacts found")
    await expect(noContactsPValue).toHaveText(
      "Search results do not match any contact."
    )
  })
})
