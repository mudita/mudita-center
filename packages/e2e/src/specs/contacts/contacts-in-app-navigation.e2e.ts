/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import NavigationTabs from "../../page-objects/tabs.page"
import ContactsPage from "../../page-objects/contacts.page"
import ModalGeneralPage from "../../page-objects/modal-general.page"

describe("Contacts screen check", () => {
  before(async () => {
    // Waiting for device connected through USB
    await browser.executeAsync((done) => {
      setTimeout(done, 10000)
    })
    ModalGeneralPage.closeModalButtonClick()
    NavigationTabs.contactsTabClick()
  })
  it("Should check Import button is displayed", async () => {
    const importBtn = await ContactsPage.importButton
    await expect(importBtn).toBeDisplayed()
  })

  it("Should close New Contact windw and check text display on no contacts screen", async () => {
    const noContactsTextLabel = await ContactsPage.noContactsTextLabel

    await noContactsTextLabel.waitForDisplayed()
    const noContactsH3Value = await noContactsTextLabel.$("<h3>")
    const noContactsPValue = await noContactsTextLabel.$("<p>")
    await expect(noContactsH3Value).toHaveText("No contacts found")
    await expect(noContactsPValue).toHaveText(
      "Search results do not match any contact."
    )
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

  it("Should check if 'Cancel button' field is displayed", async () => {
    const cancelButton = await ContactsPage.cancelButton
    await expect(cancelButton).toBeDisplayed()
  })

  it("Should check if 'save button' field is displayed", async () => {
    const saveButton = await ContactsPage.saveButton
    await expect(saveButton).toBeDisplayed()
  })

  it("Should close New Contact windw and check New contact UI elements are not displayed anymore", async () => {
    const closeButton = await ContactsPage.closeButton
    await closeButton.click()

    const cancelButton = await ContactsPage.cancelButton
    await expect(cancelButton).not.toBeDisplayed()

    const saveButton = await ContactsPage.saveButton
    await expect(saveButton).not.toBeDisplayed()

    const addFavourites = await ContactsPage.addToFavouritessCheckbox
    await expect(addFavourites).not.toBeDisplayed()

    const firstName = await ContactsPage.firstNameInput
    await expect(firstName).not.toBeDisplayed()

    const lastName = await ContactsPage.lastNameInput
    await expect(lastName).not.toBeDisplayed()

    const phoneNumber = await ContactsPage.phoneNumberInput
    await expect(phoneNumber).not.toBeDisplayed()

    const phoneNumber2 = await ContactsPage.secondPhoneNumberInput
    await expect(phoneNumber2).not.toBeDisplayed()

    const address1 = await ContactsPage.addressLine1Input
    await expect(address1).not.toBeDisplayed()

    const address2 = await ContactsPage.addressLine2Input
    await expect(address2).not.toBeDisplayed()
  })
})
