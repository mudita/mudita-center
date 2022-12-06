/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import NavigationTabs from "../../page-objects/tabs.page"
import ContactsPage from "../../page-objects/contacts.page"
import ModalGeneralPage from "../../page-objects/modal-general.page"
import { contactsListSeed } from "./seeds/contacts-list.seed"

describe("Add contact scenarios", () => {
  before(async () => {
    // Waiting for device connected through USB
    await browser.executeAsync((done) => {
      setTimeout(done, 10000)
    })
    ModalGeneralPage.closeModalButtonClick()
    NavigationTabs.contactsTabClick()
  })

  it("Should press new contact button, add contact data and save it", async () => {
    const newContactBtn = await ContactsPage.newContactButton
    await expect(newContactBtn).toBeDisplayed()
    await newContactBtn.click()
    await expect(newContactBtn).toBeDisabled()

    const firstNameInput = ContactsPage.firstNameInput
    await firstNameInput.setValue("Henryk")

    const lastNameInput = ContactsPage.lastNameInput
    await lastNameInput.setValue("Zaskroniec")

    const phonenNumberInput = ContactsPage.phoneNumberInput
    const phoneNumberInputValue = (
      Math.floor(Math.random() * 9000000) + 100000
    ).toString()
    await phonenNumberInput.setValue(phoneNumberInputValue)

    const saveButton = ContactsPage.saveButton
    await saveButton.click()
    await browser.executeAsync((done) => {
      setTimeout(done, 5000)
    })
    await browser.saveScreenshot("./screenshot.png")
    const storedContacts = await ContactsPage.listOfContacts
    console.log(storedContacts.length)
    expect(storedContacts.length).toBeGreaterThan(0)
    console.log(await storedContacts[0])
    const ContactData = await storedContacts[0].getText()
    expect(ContactData).toHaveText("Henryk Zaskroniec")

    const phoneNumber = await ContactsPage.phoneNumberOnContactList
    expect(phoneNumber).toHaveText(phoneNumberInputValue)
  })
})
