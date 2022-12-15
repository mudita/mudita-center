/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import NavigationTabs from "../../page-objects/tabs.page"
import ContactsPage from "../../page-objects/contacts.page"
import ModalGeneralPage from "../../page-objects/modal-general.page"
import ModalContactsPage from "../../page-objects/modal-contacts.page"

describe(" search, selection manager, delete", () => {
  before(async () => {
    // Waiting for device connected through USB
    await browser.executeAsync((done) => {
      setTimeout(done, 13000)
    })
    ModalGeneralPage.closeModalButtonClick()
    await browser.executeAsync((done) => {
      setTimeout(done, 3000)
    })
    NavigationTabs.contactsTabClick()
    await browser.executeAsync((done) => {
      setTimeout(done, 1000)
    })
  })

  it("Should search (without pressing Enter) in search input", async () => {
    // values to be searched and expeted results
    const searchText = "Tomkiewicz"
    const expectedName = "Aleshia Tomkiewicz"
    const expectedEmail = "atomkiewicz@hotmail.com"

    //click the search input and input the surname 'Tomkiewicz' which should match a contact imported from packages/e2e/src/specs/contacts/vcf-files/52Contacts-E2E-tests.vcf
    const searchinput = ContactsPage.searchContactsInput
    await searchinput.click()
    await searchinput.setValue(searchText)

    //get the dropdown list with the results
    const searchResultDropDown = ContactsPage.dropDownSearchResultList
    await searchResultDropDown.waitForDisplayed()
    //check number of results on dropdown (should be equal 1 in this test)
    const searchResultList = ContactsPage.dropDownSearchResultListItems
    expect(await searchResultList.length).toEqual(1)

    //check search result details are matching the contact reference data & expect two item: name and email address
    const resultDetails1List = await searchResultList[0].$$("p")

    //final expects (the results must have two items name and email and these to be equal to expected results defined at teh beginning)
    expect(await resultDetails1List.length).toEqual(2)
    expect(await resultDetails1List[0]).toHaveText(expectedName)
    expect(await resultDetails1List[1]).toHaveText(expectedEmail)
    //clear search input
    await searchinput.click()
    await searchinput.setValue("")
  })

  it("Should trigger selection manager", async () => {
    //hover over data-testid="contact-row" to make checkbox display=true
    const contactRow = ContactsPage.singleContactRow
    await contactRow.moveTo()

    //click the first checkbox (at this point the first one belongs to first contact listed (select all contacts is not displayed yet))
    const checkbox = ContactsPage.checkboxSingleContact
    await checkbox.waitForDisplayed()
    await checkbox.click()

    //select all contacts
    const selectAllContacts = ContactsPage.checkboxSelectAll
    await selectAllContacts.waitForDisplayed()
    await selectAllContacts.click()

    const allContactsSelectText = ContactsPage.textSummaryOfContactsSelected
    const allContactSelectedReferenceText = "All Contacts selected"
    await expect(allContactsSelectText).toHaveText(
      allContactSelectedReferenceText
    )

    // get all checkboxes list and uncheck the odd ones on the list
    const checkboxesList = ContactsPage.checkboxesList
    for (let i = 0; i < (await checkboxesList.length); i++) {
      if (i % 2 !== 0) {
        checkboxesList[i].click()
      }
    }
    await expect(allContactsSelectText).not.toHaveText(
      allContactSelectedReferenceText
    )

    //select all contacts again

    await selectAllContacts.waitForDisplayed()
    await selectAllContacts.click()
    await expect(allContactsSelectText).toHaveText(
      allContactSelectedReferenceText
    )

    //uncheck all contacts
    await selectAllContacts.waitForDisplayed()
    await selectAllContacts.click()
    await expect(checkbox).not.toBeDisplayed()
    await expect(allContactsSelectText).not.toBeDisplayed()
  })

  it("Should delete single contact using selection manager", async () => {
    //expeted text on modal
    const allContactSelectedReferenceText = "1 Contact selected"

    //hover over data-testid="contact-row" to make checkbox display=true
    const contactRow = ContactsPage.singleContactRow
    await contactRow.moveTo()

    //click the first checkbox (at this point the first one belongs to first contact listed (select all contacts is not displayed yet))
    const checkbox = ContactsPage.checkboxSingleContact
    await checkbox.waitForDisplayed()
    await checkbox.click()

    const textSelectionSummary = ContactsPage.textSummaryOfContactsSelected

    await textSelectionSummary.waitForDisplayed()
    await expect(textSelectionSummary).toHaveText(
      allContactSelectedReferenceText
    )
    // click delete button
    const deleteButton = ContactsPage.buttonDeleteSelectionManager
    await deleteButton.waitForDisplayed()
    await deleteButton.click()

    //check delete icon is displayed
    const deleteIcon = ModalContactsPage.iconDelete
    await deleteIcon.waitForDisplayed()
    expect(deleteIcon).toBeDisplayed()
    const deleteText = ModalContactsPage.textOnModal
    await expect(deleteText).toHaveTextContaining(
      "Do you really want to delete"
    )
    ModalContactsPage.confirmDeleteButtonClick()
    //add timeout for delete operation to complete
    await contactRow.waitForDisplayed({ timeout: 6000 })
    await expect(checkbox).not.toBeDisplayed()
    await expect(textSelectionSummary).not.toBeDisplayed()
  })

  it("Should delete all contacts using selection manager", async () => {
    //test customizations
    const textExpectedSelectionSummary = "All Contacts selected"
    const textExpectedOnModal = "Do you really want to delete all contacts?"

    //hover over data-testid="contact-row" to make checkbox display=true
    const contactRow = ContactsPage.singleContactRow
    await contactRow.moveTo()

    //click the first checkbox (at this point the first one belongs to first contact listed (select all contacts is not displayed yet))
    const checkbox = ContactsPage.checkboxSingleContact
    await checkbox.waitForDisplayed()
    await checkbox.click()

    //select all contacts
    const selectAllContacts = ContactsPage.checkboxSelectAll
    await selectAllContacts.waitForDisplayed()
    await selectAllContacts.click()

    const textSelectionSummary = ContactsPage.textSummaryOfContactsSelected

    await expect(textSelectionSummary).toHaveText(textExpectedSelectionSummary)
    // click delete button
    const deleteButton = ContactsPage.buttonDeleteSelectionManager
    await deleteButton.waitForDisplayed()
    await deleteButton.click()

    //check delete icon is displayed
    const deleteIcon = ModalContactsPage.iconDelete
    await deleteIcon.waitForDisplayed()
    expect(deleteIcon).toBeDisplayed()
    const deleteText = ModalContactsPage.textOnModal
    await expect(deleteText).toHaveText(textExpectedOnModal)
    ModalContactsPage.confirmDeleteButtonClick()
    //add timeout for delete operation to complete
    const noContactsTextLabel = await ContactsPage.noContactsTextLabel

    await noContactsTextLabel.waitForDisplayed({ timeout: 60000 })
    const noContactsH3Value = await noContactsTextLabel.$("<h3>")
    const noContactsPValue = await noContactsTextLabel.$("<p>")
    await expect(noContactsH3Value).toHaveText("No contacts found")
    await expect(noContactsPValue).toHaveText(
      "Search results do not match any contact."
    )

    await expect(checkbox).not.toBeDisplayed()
    await expect(textSelectionSummary).not.toBeDisplayed()
  })
})
