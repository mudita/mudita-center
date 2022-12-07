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

    await ContactsPage.setFirstName("Henryk")
    await ContactsPage.setLastName("Zaskroniec")
    const phoneNumberInputValue = (
      Math.floor(Math.random() * 9000000) + 100000
    ).toString()
    await ContactsPage.setPhoneNumber1(phoneNumberInputValue)

    await ContactsPage.saveButtonClick()
    await browser.executeAsync((done) => {
      setTimeout(done, 5000)
    })

    const storedContacts = await ContactsPage.listOfContacts
    expect(storedContacts.length).toBeGreaterThan(0)
    const ContactData = await storedContacts[0].getText()
    expect(ContactData).toHaveText("Henryk Zaskroniec")

    const phoneNumber = await ContactsPage.phoneNumberOnContactList
    expect(phoneNumber).toHaveText(phoneNumberInputValue)
  })

  it("Should edit contact using options menu", async () => {
    await browser.saveScreenshot("./BeforeEditscreenshot.png")
    await ContactsPage.optionsButtonOnContactListClick()
    await browser.executeAsync((done) => {
      setTimeout(done, 2000)
    })
    const editOption = await ContactsPage.editContactOptionMenu
    await editOption.click()
    await browser.executeAsync((done) => {
      setTimeout(done, 5000)
    })

    await ContactsPage.setFirstName("Kazimierz")
    await ContactsPage.setLastName("Glonojad")
    const phoneNumberInputValue = (
      Math.floor(Math.random() * 9000000) + 100000
    ).toString()
    await ContactsPage.setPhoneNumber1(phoneNumberInputValue)

    await ContactsPage.saveButtonClick()
    await browser.executeAsync((done) => {
      setTimeout(done, 5000)
    })

    await ContactsPage.closeButtonClick()

    const storedContacts = await ContactsPage.listOfContacts
    expect(storedContacts.length).toBeGreaterThan(0)
    const ContactData = await storedContacts[0].getText()
    expect(ContactData).toHaveText("Kazimierz Glonojad")
  })

  it("Should delete single contact using options menu and check no concats screen is displayed", async () => {
    await browser.saveScreenshot("./BeforeDeletescreenshot.png")
    await ContactsPage.optionsButtonOnContactListClick()
    await browser.executeAsync((done) => {
      setTimeout(done, 2000)
    })
    const deleteOption = await ContactsPage.deleteContactOptionMenu
    await deleteOption.click()

    ModalContactsPage.confirmModalButtonClick()
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
