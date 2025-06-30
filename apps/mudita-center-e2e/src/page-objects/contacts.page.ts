/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import Page from "./page"

class ContactsPage extends Page {
  public get newContactButton() {
    return $("//*[@data-testid='new-contact-button']")
  }

  async clickNewContactButton() {
    await this.newContactButton.waitForClickable()
    await this.newContactButton.click()
  }

  public get importButton() {
    return $("//*[@data-testid='import-button']")
  }

  public get searchContactsInput() {
    return $("//*[@data-testid='contact-input-select-input']")
  }

  public get firstNameInput() {
    return $("//*[@data-testid='first-name']")
  }

  async insertTextToFirstNameInput(textValue: string) {
    await this.firstNameInput.waitForDisplayed()
    await this.firstNameInput.setValue(textValue)
  }

  public get lastNameInput() {
    return $("//*[@data-testid='second-name']")
  }

  async insertTextToLastNameInput(textValue: string) {
    await this.lastNameInput.waitForDisplayed()
    await this.lastNameInput.setValue(textValue)
  }

  public get primaryPhoneNumberInput() {
    return $("//*[@data-testid='primary-number']")
  }

  async insertTextToPrimaryPhoneNumberInput(textValue: string) {
    await this.primaryPhoneNumberInput.waitForDisplayed()
    await this.primaryPhoneNumberInput.setValue(textValue)
  }

  public get secondaryPhoneNumberInput() {
    return $("//*[@data-testid='secondary-number']")
  }

  async insertTextToSecondaryPhoneNumberInput(textValue: string) {
    await this.secondaryPhoneNumberInput.waitForDisplayed()
    await this.secondaryPhoneNumberInput.setValue(textValue)
  }

  public get addressFirstLineInput() {
    return $("//*[@data-testid='first-address-line']")
  }

  async insertTextToAddressFirstLineInput(textValue: string) {
    await this.addressFirstLineInput.waitForDisplayed()
    await this.addressFirstLineInput.setValue(textValue)
  }

  public get addressSecondLineInput() {
    return $("//*[@data-testid='second-address-line']")
  }

  async insertTextToAddressSecondLineInput(textValue: string) {
    await this.addressSecondLineInput.waitForDisplayed()
    await this.addressSecondLineInput.setValue(textValue)
  }

  public get closeButton() {
    return $("//*[@data-testid='icon-Close']")
  }

  async closeButtonClick() {
    await this.closeButton.waitForClickable()
    await this.closeButton.click()
  }

  public get addToFavouritessCheckbox() {
    return $("//*[contains(@name, 'favourite')]")
  }

  public get cancelButton() {
    return $("//p[contains(text(), 'Cancel')]")
  }

  public get saveContactButton() {
    return $("//*[@data-testid='save-button']")
  }

  async clickSaveContactButton() {
    await this.saveContactButton.waitForClickable()
    await this.saveContactButton.click()
  }

  public get noContactsTextLabel() {
    return $("//*[@data-testid='contact-list-no-result']")
  }

  public get listOfContacts() {
    return $$("//*[@data-testid='virtualized-contact-list-item-contact-row']")
  }

  public get singleContactRow() {
    return $("//*[@data-testid='virtualized-contact-list-item-contact-row']")
  }

  public get phoneNumberOnContactList() {
    return $("//*[@data-testid='virtualized-contact-phone-number']")
  }

  public get optionsButtonOnContactList() {
    return $("//*[@data-testid='icon-More']")
  }

  async optionsButtonOnContactListClick() {
    await this.optionsButtonOnContactList.waitForDisplayed()
    await this.optionsButtonOnContactList.click()
  }

  public get editContactOptionMenu() {
    return $("//*[@data-testid='icon-Edit']")
  }

  public get exportAsVCardOptionMenu() {
    return $("//*[@data-testid='icon-UploadDark']")
  }

  public get deleteContactOptionMenu() {
    return $("//*[@data-testid='icon-Delete']")
  }

  public get nameOnContactDetailScreen() {
    return $("//*[@data-testid='name']")
  }

  public get phoneNumber1OnContactDetailScreen() {
    return $("//*[@data-testid='primary-phone-input']")
  }

  public get phoneNumber2OnContactDetailScreen() {
    return $("//*[@data-testid='secondary-phone-input']")
  }

  public get addressOnContactDetailScreen() {
    return $("//*[@data-testid='address-details']")
  }

  public get buttonDeleteOnContactDetailScreen() {
    return $("//*[@data-testid='icon-Delete']")
  }

  public get buttonExportOnContactDetailScreen() {
    return $("//*[@data-testid='icon-UploadDark']")
  }

  public get editButtonOnContactDetailScreen() {
    return $("//*[@data-testid='icon-Edit']")
  }

  public get checkboxSingleContact() {
    return $("//*[@type='checkbox']")
  }

  public get checkboxesList() {
    return $$("//*[@type='checkbox']")
  }

  public get checkboxSelectAll() {
    return $("//*[@data-testid='selection-manager']//*[@type='checkbox']")
  }

  public get textSummaryOfContactsSelected() {
    return $("//*[@data-testid='info']")
  }

  public get buttonDeleteSelectionManager() {
    return $("//p[contains(text(), 'Delete')]")
  }

  public get inputHiddenVcfFile() {
    return $("//*[@data-testid='file-input']")
  }

  public get buttonContinueWithGoogle() {
    return $("//*[@data-testid='google-button']")
  }

  public get buttonOutlookImport() {
    return $("//*[@data-testid='outlook-button']")
  }

  public get buttonImportFromVCFFileImport() {
    return $("//*[@data-testid='icon-Upload']")
  }

  public get inputSearch() {
    return $("//*[@data-testid='contact-input-select-input']")
  }

  public get dropDownSearchResultList() {
    return $("//*[@data-testid='input-select-list']")
  }

  public get dropDownSearchResultListItems() {
    this.dropDownSearchResultList.waitForDisplayed()
    return this.dropDownSearchResultList.$$(
      "//*[@data-testid='input-select-list-item']"
    )
  }

  public get contactDetailsFavouritesIcon() {
    return $("//*[@data-testid='icon-Favourites']")
  }
}

export default new ContactsPage()
