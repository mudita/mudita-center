/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ChainablePromiseElement } from "webdriverio"
import Page from "./page"

class MessagesPage extends Page {
  public get buttonNewMessage(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $('[data-testid="message-panel-new-message-button"]')
  }

  public get inputSearchContacts(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $('[data-testid="receiver-input-select-input"]')
  }

  public get inputMessage(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $('[data-testid="thread-details-text-area-input"]')
  }

  public get buttonSendMessage(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $('[data-testid="thread-details-text-area-send-button"]')
  }

  public get iconNotSendMessage(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $('[data-testid="message-bubble-not-send-icon"]')
  }

  public get iconNotSendThread(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $('[data-testid="thread-not-send-message-icon"]')
  }

  public get buttonDeleteOnThreadDetailScreen(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $('[data-testid="icon-Delete"]')
  }

  public get buttonAddContactThreadDetailScreen(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $('[data-testid="icon-NewContact"]')
  }

  public get buttonCloseThreadDetailScreen(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $('[data-testid="icon-Close"]')
  }

  public get buttonMarkUnreadThreadDetailScreen(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $('[data-testid="icon-Close"]')
  }

  public get sendingStatus(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $('[data-testid="dot"]')
  }

  public get containerMessage(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $('[data-testid="message-bubble-container"]')
  }

  public get containerMessageContent(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $('[data-testid="message-bubble-message-content"]')
  }

  async hoverOverMessage() {
    await this.containerMessageContent.moveTo()
  }

  public get dropdownMessageAction(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $('[data-testid="message-bubble-dropdown-action-button"]')
  }

  //
  public get buttonSingleMessageOptions(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return this.containerMessage.$('[data-testid="icon-More"]')
  }

  async clickMessageOptionsButton() {
    await this.buttonSingleMessageOptions.waitForClickable()
    await this.buttonSingleMessageOptions.click()
  }

  public get listEmptyThread(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $('[data-testid="messages-empty-thread-list-state"]')
  }

  public get dropdownListMessage(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $('[data-testid="dropdown"]')
  }

  public get optionDeleteMessageDropdown(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return this.dropdownListMessage.$(
      '[data-testid="message-bubble-delete-message-button"]'
    )
  }

  async clickDeleteMessage() {
    await this.optionDeleteMessageDropdown.waitForClickable()
    await this.optionDeleteMessageDropdown.click()
  }

  public get buttonOptionsThreadListScreen(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $('[data-testid="icon-More"]')
  }

  public get optionDeleteDropdown(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $('[data-testid="dropdown-delete"]')
  }

  async clickNewMessageButton() {
    await this.buttonNewMessage.waitForClickable({ timeout: 7000 })
    await this.buttonNewMessage.click()
  }

  async insertTextToSearchContactInput(phoneNumber: string) {
    await this.inputSearchContacts.waitForDisplayed()
    await this.inputSearchContacts.setValue(phoneNumber)
  }

  async insertTextToMessageInput(messageText: string) {
    await this.inputMessage.waitForDisplayed()
    await this.inputMessage.setValue(messageText)
  }

  async sendMessage(phoneNumber: string, messageText: string) {
    // click NEW MESSAGE button
    await this.clickNewMessageButton()
    //input phone number into contact search field
    await this.insertTextToSearchContactInput(phoneNumber)
    //input message text into message input
    await this.insertTextToMessageInput(messageText)
    //send by pressing Send button

    await this.buttonSendMessage.waitForClickable()
    await this.buttonSendMessage.click()
  }

  async clickCloseThreadDetailsScreen() {
    await this.buttonCloseThreadDetailScreen.waitForClickable({ timeout: 7000 })
    await this.buttonCloseThreadDetailScreen.click()
  }

  async clickThreadOptionsButton() {
    await this.buttonOptionsThreadListScreen.waitForClickable({ timeout: 7000 })
    await this.buttonOptionsThreadListScreen.click()
  }

  async clickDropdownThreadOptionDelete() {
    await this.optionDeleteDropdown.waitForClickable({ timeout: 7000 })
    await this.optionDeleteDropdown.click()
  }

  async clickDeleteButtonOnConversationDetailsScreen() {
    await this.buttonDeleteOnThreadDetailScreen.waitForClickable({
      timeout: 7000,
    })
    await this.buttonDeleteOnThreadDetailScreen.click()
  }

  public get singleThreadRow(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $('[data-testid="message-row"]')
  }

  async hoverOverSingleThreadRow() {
    await this.singleThreadRow.waitForDisplayed()
    await this.singleThreadRow.moveTo()
  }

  public get checkboxThread(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $('[data-testid="checkbox"]')
  }

  async clickThreadCheckbox() {
    await this.checkboxThread.waitForClickable()
    await this.checkboxThread.click()
  }

  public get buttonDeleteSelectionManager(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $('[data-testid="icon-Delete"]')
  }

  async clickDeleteButtonSelectionMaanager() {
    await this.buttonDeleteSelectionManager.waitForClickable()
    await this.buttonDeleteSelectionManager.click()
  }
}

export default new MessagesPage()
