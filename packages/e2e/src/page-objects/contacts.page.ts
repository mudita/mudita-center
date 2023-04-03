/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ChainablePromiseElement } from "webdriverio"
import Page from "./page"

class ContactsPage extends Page {
  /**[Selector] New contact button on Contacts screen */
  public get newContactButton(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $('[data-testid="new-contact-button"]')
  }

  /**Click New Contact button */
  async clickNewContactButton() {
    await this.newContactButton.waitForClickable()
    await this.newContactButton.click()
  }

  /**[Selector] Import button on Contacts screen*/
  public get importButton(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $('[data-testid="import-button"]')
  }

  /**[Selector] Search contacts input*/
  public get searchContactsInput(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $('[data-testid="contact-input-select-input"]')
  }

  /**[Selector] First name input*/
  public get firstNameInput(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $('[data-testid="first-name"]')
  }
  /**Insert provided text to First Name input field*/
  async insertTextToFirstNameInput(textValue: string) {
    await this.firstNameInput.waitForClickable()
    await this.firstNameInput.setValue(textValue)
  }

  /**[Selector] Last name input*/
  public get lastNameInput(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $('[data-testid="second-name"]')
  }

  /**Insert provided text to Last Name input field*/
  async insertTextToLastNameInput(textValue: string) {
    await this.lastNameInput.waitForClickable()
    await this.lastNameInput.setValue(textValue)
  }

  /**[Selector] Primary phone number input*/
  public get primaryPhoneNumberInput(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $('[data-testid="primary-number"]')
  }

  /**Insert provided text to Primary Phone input field*/
  async insertTextToPrimaryPhoneNumberInput(textValue: string) {
    await this.primaryPhoneNumberInput.waitForClickable()
    await this.primaryPhoneNumberInput.setValue(textValue)
  }

  /**[Selector] Secondary phone number input*/
  public get secondaryPhoneNumberInput(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $('[data-testid="secondary-number"]')
  }

  /**Insert provided text to Secondary Phone input field*/
  async insertTextToSecondaryPhoneNumberInput(textValue: string) {
    await this.secondaryPhoneNumberInput.waitForClickable()
    await this.secondaryPhoneNumberInput.setValue(textValue)
  }
  /**[Selector] Adress first line input*/
  public get addressFirstLineInput(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $('[data-testid="first-address-line"]')
  }

  /**Insert provided text to First Address line input field*/
  async insertTextToAddressFirstLineInput(textValue: string) {
    await this.addressFirstLineInput.waitForClickable()
    await this.addressFirstLineInput.setValue(textValue)
  }

  /**[Selector] Adress second line input*/
  public get addressSecondLineInput(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $('[data-testid="second-address-line"]')
  }

  /**Insert provided text to Second Address line input field*/
  async insertTextToAddressSecondLineInput(textValue: string) {
    await this.addressSecondLineInput.waitForClickable()
    await this.addressSecondLineInput.setValue(textValue)
  }

  /**[Selector] Close button on contact detail screen*/
  public get closeButton(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $('[data-testid="icon-Close"]')
  }

  /**Click Close button on contact detail screen */
  async closeButtonClick() {
    await this.closeButton.waitForClickable()
    await this.closeButton.click()
  }
  /**[Selector] add to favourites checkbox*/
  public get addToFavouritessCheckbox(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $('[name*="favourite"]')
  }
  /**[Selector] Cancel button on add/edit contact screen*/
  public get cancelButton(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $("p*=Cancel")
  }

  /** [Selector] Save contact button*/
  public get saveContactButton(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $('[data-testid="save-button"]')
  }
  /** Click on Save contact button */
  async clickSaveContactButton() {
    await this.saveContactButton.waitForClickable()
    await this.saveContactButton.click()
  }

  public get noContactsTextLabel(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $('[data-testid="contact-list-no-result"]')
  }

  public get listOfContacts() {
    return $$('[data-testid="contact-row"]')
  }

  public get singleContactRow(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $('[data-testid="contact-row"]')
  }

  public get phoneNumberOnContactList(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $('[data-testid="virtualized-contact-phone-number"]')
  }

  public get optionsButtonOnContactList(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $('[data-testid="icon-More"]')
  }
  async optionsButtonOnContactListClick() {
    await this.optionsButtonOnContactList.waitForDisplayed()
    await this.optionsButtonOnContactList.click()
  }

  public get editContactOptionMenu(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $('[data-testid="icon-Edit"]')
  }

  public get exportAsVCardOptionMenu(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $('[data-testid="icon-UploadDark"]')
  }

  public get deleteContactOptionMenu(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $('[data-testid="icon-Delete"]')
  }

  public get nameOnContactDetailScreen(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $('[data-testid="name"]')
  }

  public get phoneNumber1OnContactDetailScreen(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $('[data-testid="primary-phone-input"]')
  }

  public get phoneNumber2OnContactDetailScreen(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $('[data-testid="secondary-phone-input"]')
  }

  public get addressOnContactDetailScreen(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $('[data-testid="address-details"]')
  }

  public get buttonDeleteOnContactDetailScreen(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $('[data-testid="icon-Delete"]')
  }

  public get buttonExportOnContactDetailScreen(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $('[data-testid="icon-UploadDark"]')
  }

  public get editButtonOnContactDetailScreen(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $('[data-testid="icon-Edit"]')
  }

  public get checkboxSingleContact(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $('[type="checkbox"]')
  }

  public get checkboxesList() {
    return $$('[type="checkbox"]')
  }

  public get checkboxSelectAll(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $('[data-testid="selection-manager"]').$('[type="checkbox"]')
  }

  public get textSummaryOfContactsSelected(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $('[data-testid="info"]')
  }

  public get buttonDeleteSelectionManager(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $("p*=Delete")
  }

  public get inputHiddenVcfFile(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $('[data-testid="file-input"]')
  }

  public get buttonContinueWithGoogle(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $('[data-testid="google-button"]')
  }

  public get buttonOutlookImport(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $('[data-testid="outlook-button"]')
  }

  public get buttonImportFromVCFFileImport(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $('[data-testid="icon-Upload"]')
  }

  public get inputSearch(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $('[data-testid="contact-input-select-input"]')
  }

  public get dropDownSearchResultList(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $('[data-testid="input-select-list"]')
  }

  public get dropDownSearchResultListItems() {
    this.dropDownSearchResultList.waitForDisplayed()
    return this.dropDownSearchResultList.$$(
      '[data-testid="input-select-list-item"]'
    )
  }
}

export default new ContactsPage()
