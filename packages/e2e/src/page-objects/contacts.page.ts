/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ChainablePromiseElement } from "webdriverio"
import Page from "./page"

class ContactsPage extends Page {
  public get newContactButton(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $('[data-testid="new-contact-button"]')
  }

  public get importButton(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $('[data-testid="import-button"]')
  }

  public get searchContactsInput(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $('[data-testid="contact-input-select-input"]')
  }

  public get firstNameInput(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $('[data-testid="first-name"]')
  }

  async firstNameSetValue(inputValue) {
    await this.firstNameInput.waitForDisplayed()
    await this.firstNameInput.setValue(inputValue)
  }

  public get lastNameInput(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $('[data-testid="second-name"]')
  }

  async lastNameSetValue(inputValue) {
    await this.lastNameInput.waitForDisplayed()
    await this.lastNameInput.setValue(inputValue)
  }

  public get phoneNumberInput(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $('[data-testid="primary-number"]')
  }

  async phoneNumber1SetValue(inputValue) {
    await this.phoneNumberInput.waitForDisplayed()
    await this.phoneNumberInput.setValue(inputValue)
  }

  public get secondPhoneNumberInput(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $('[data-testid="secondary-number"]')
  }

  async phoneNumber2SetValue(inputValue) {
    await this.secondPhoneNumberInput.waitForDisplayed()
    await this.secondPhoneNumberInput.setValue(inputValue)
  }

  public get addressLine1Input(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $('[data-testid="first-address-line"]')
  }

  async addressLine1SetValue(inputValue) {
    await this.addressLine1Input.waitForDisplayed()
    await this.addressLine1Input.setValue(inputValue)
  }

  public get addressLine2Input(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $('[data-testid="second-address-line"]')
  }

  async addressLine2SetValue(inputValue) {
    await this.addressLine2Input.waitForDisplayed()
    await this.addressLine2Input.setValue(inputValue)
  }

  public get closeButton(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $('[data-testid="icon-Close"]')
  }

  async closeButtonClick() {
    await this.closeButton.waitForDisplayed()
    await this.closeButton.click()
  }

  public get addToFavouritessCheckbox(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $('[name="favourite"]')
  }

  public get cancelButton(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $("p=Cancel")
  }

  public get saveButton(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $('[data-testid="save-button"]')
  }

  async saveButtonClick() {
    await this.saveButton.waitForDisplayed()
    await this.saveButton.click()
  }

  public get noContactsTextLabel(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $('[data-testid="contact-list-no-result"]')
  }

  public get listOfContacts() {
    return $$('[data-testid="contact-row"]')
  }

  public get singleContact(): ChainablePromiseElement<
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

  public get deleteButtonOnContactDetailScreen(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $('[data-testid="icon-Delete"]')
  }

  public get exportButtonOnContactDetailScreen(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $('[data-testid="icon-UploadDark"]')
  }

  public get editButtonOnContactDetailScreen(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $('[data-testid="icon-Edit"]')
  }
}

export default new ContactsPage()
