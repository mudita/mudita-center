/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import Page from "./page"

class ContactsPage extends Page {
  /**[Selector] New contact button on Contacts screen */
  public get newContactButton() {
    return $('[data-testid="new-contact-button"]')
  }

  /**Click New Contact button */
  async clickNewContactButton() {
    await this.newContactButton.waitForClickable()
    await this.newContactButton.click()
  }

  /**[Selector] Import button on Contacts screen*/
  public get importButton() {
    return $('[data-testid="import-button"]')
  }

  /**[Selector] Search contacts input*/
  public get searchContactsInput() {
    return $('[data-testid="contact-input-select-input"]')
  }

  /**[Selector] First name input*/
  public get firstNameInput() {
    return $('[data-testid="first-name"]')
  }
  /**Insert provided text to First Name input field*/
  async insertTextToFirstNameInput(textValue: string) {
    await this.firstNameInput.waitForDisplayed()
    await this.firstNameInput.setValue(textValue)
  }

  /**[Selector] Last name input*/
  public get lastNameInput() {
    return $('[data-testid="second-name"]')
  }

  /**Insert provided text to Last Name input field*/
  async insertTextToLastNameInput(textValue: string) {
    await this.lastNameInput.waitForDisplayed()
    await this.lastNameInput.setValue(textValue)
  }

  /**[Selector] Primary phone number input*/
  public get primaryPhoneNumberInput() {
    return $('[data-testid="primary-number"]')
  }

  /**Insert provided text to Primary Phone input field*/
  async insertTextToPrimaryPhoneNumberInput(textValue: string) {
    await this.primaryPhoneNumberInput.waitForDisplayed()
    await this.primaryPhoneNumberInput.setValue(textValue)
  }

  /**[Selector] Secondary phone number input*/
  public get secondaryPhoneNumberInput() {
    return $('[data-testid="secondary-number"]')
  }

  /**Insert provided text to Secondary Phone input field*/
  async insertTextToSecondaryPhoneNumberInput(textValue: string) {
    await this.secondaryPhoneNumberInput.waitForDisplayed()
    await this.secondaryPhoneNumberInput.setValue(textValue)
  }
  /**[Selector] Adress first line input*/
  public get addressFirstLineInput() {
    return $('[data-testid="first-address-line"]')
  }

  /**Insert provided text to First Address line input field*/
  async insertTextToAddressFirstLineInput(textValue: string) {
    await this.addressFirstLineInput.waitForDisplayed()
    await this.addressFirstLineInput.setValue(textValue)
  }

  /**[Selector] Adress second line input*/
  public get addressSecondLineInput() {
    return $('[data-testid="second-address-line"]')
  }

  /**Insert provided text to Second Address line input field*/
  async insertTextToAddressSecondLineInput(textValue: string) {
    await this.addressSecondLineInput.waitForDisplayed()
    await this.addressSecondLineInput.setValue(textValue)
  }

  /**[Selector] Close button on contact detail screen*/
  public get closeButton() {
    return $('[data-testid="icon-Close"]')
  }

  /**Click Close button on contact detail screen */
  async closeButtonClick() {
    await this.closeButton.waitForClickable()
    await this.closeButton.click()
  }
  /**[Selector] add to favourites checkbox*/
  public get addToFavouritessCheckbox() {
    return $('[name*="favourite"]')
  }
  /**[Selector] Cancel button on add/edit contact screen*/
  public get cancelButton() {
    return $("p*=Cancel")
  }

  /** [Selector] Save contact button*/
  public get saveContactButton() {
    return $('[data-testid="save-button"]')
  }
  /** Click on Save contact button */
  async clickSaveContactButton() {
    await this.saveContactButton.waitForClickable()
    await this.saveContactButton.click()
  }

  public get noContactsTextLabel() {
    return $('[data-testid="contact-list-no-result"]')
  }

  public get listOfContacts() {
    return $$('[data-testid="virtualized-contact-list-item-contact-row"]')
  }

  public get singleContactRow() {
    return $('[data-testid="virtualized-contact-list-item-contact-row"]')
  }

  public get phoneNumberOnContactList() {
    return $('[data-testid="virtualized-contact-phone-number"]')
  }

  public get optionsButtonOnContactList() {
    return $('[data-testid="icon-More"]')
  }
  async optionsButtonOnContactListClick() {
    await this.optionsButtonOnContactList.waitForDisplayed()
    await this.optionsButtonOnContactList.click()
  }

  public get editContactOptionMenu() {
    return $('[data-testid="icon-Edit"]')
  }

  public get exportAsVCardOptionMenu() {
    return $('[data-testid="icon-UploadDark"]')
  }

  public get deleteContactOptionMenu() {
    return $('[data-testid="icon-Delete"]')
  }

  public get nameOnContactDetailScreen() {
    return $('[data-testid="name"]')
  }

  public get phoneNumber1OnContactDetailScreen() {
    return $('[data-testid="primary-phone-input"]')
  }

  public get phoneNumber2OnContactDetailScreen() {
    return $('[data-testid="secondary-phone-input"]')
  }

  public get addressOnContactDetailScreen() {
    return $('[data-testid="address-details"]')
  }

  public get buttonDeleteOnContactDetailScreen() {
    return $('[data-testid="icon-Delete"]')
  }

  public get buttonExportOnContactDetailScreen() {
    return $('[data-testid="icon-UploadDark"]')
  }

  public get editButtonOnContactDetailScreen() {
    return $('[data-testid="icon-Edit"]')
  }

  public get checkboxSingleContact() {
    return $('[type="checkbox"]')
  }

  public get checkboxesList() {
    return $$('[type="checkbox"]')
  }

  public get checkboxSelectAll() {
    return $('[data-testid="selection-manager"]').$('[type="checkbox"]')
  }

  public get textSummaryOfContactsSelected() {
    return $('[data-testid="info"]')
  }

  public get buttonDeleteSelectionManager() {
    return $("p*=Delete")
  }

  public get inputHiddenVcfFile() {
    return $('[data-testid="file-input"]')
  }

  public get buttonContinueWithGoogle() {
    return $('[data-testid="google-button"]')
  }

  public get buttonOutlookImport() {
    return $('[data-testid="outlook-button"]')
  }

  public get buttonImportFromVCFFileImport() {
    return $('[data-testid="icon-Upload"]')
  }

  public get inputSearch() {
    return $('[data-testid="contact-input-select-input"]')
  }

  public get dropDownSearchResultList() {
    return $('[data-testid="input-select-list"]')
  }

  public get dropDownSearchResultListItems() {
    this.dropDownSearchResultList.waitForDisplayed()
    return this.dropDownSearchResultList.$$(
      '[data-testid="input-select-list-item"]'
    )
  }

  public get contactDetailsFavouritesIcon() {
    return $('[data-testid="icon-Favourites"]')
  }
}

export default new ContactsPage()
