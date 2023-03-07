/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ChainablePromiseElement } from "webdriverio"
import Page from "./page"

class MessagesPage extends Page {
  public get newMessageButton(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $('[data-testid="message-panel-new-message-button"]')
  }

  public get searchContactsInput(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $('[data-testid="receiver-input-select-input"]')
  }

  public get messageTextInput(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $('[data-testid="thread-details-text-area-input"]')
  }

  public get sendMessageButton(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $('[data-testid="thread-details-text-area-send-button"]')
  }

  public get messageNotSentIcon(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $('[data-testid="message-bubble-not-send-icon"]')
  }

  public get messageNotSentThreadIcon(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $('[data-testid="thread-not-send-message-icon"]')
  }

  public get deleteButtonOnThreadDetailScreen(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $('[data-testid="icon-Delete"]')
  }

  public get addContactButtonOnThreadDetailScreen(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $('[data-testid="icon-NewContact"]')
  }

  public get closeButtonOnThreadDetailScreen(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $('[data-testid="icon-Close"]')
  }

  public get markUnreadButtonOnThreadDetailScreen(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $('[data-testid="icon-Close"]')
  }

  public get sendingStatus(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $('[data-testid="dot"]')
  }

  public get messageContainer(): ChainablePromiseElement<
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
    await this.containerMessageContent.waitForDisplayed({ timeout: 9000 })
    await this.containerMessageContent.moveTo()
  }

  public get messageOptionsDropdownList(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $('[data-testid="message-bubble-dropdown-action-button"]')
  }

  //
  public get optionsButtonSingleMessage(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return this.messageContainer.$('[data-testid="icon-More"]')
  }

  async clickSingleMessageOptionsButton() {
    await this.optionsButtonSingleMessage.waitForClickable()
    await this.optionsButtonSingleMessage.click()
  }

  public get threadScreenEmptyList(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $('[data-testid="messages-empty-thread-list-state"]')
  }

  public get threadScreenThreadDropdownOptions(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $('[data-testid="dropdown"]')
  }

  public get deleteOnThreadDropdownOptions(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return this.threadScreenThreadDropdownOptions.$(
      '[data-testid="message-bubble-delete-message-button"]'
    )
  }

  async clickDeleteMessageOnThreadScreen() {
    await this.deleteOnThreadDropdownOptions.waitForClickable()
    await this.deleteOnThreadDropdownOptions.click()
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
    await this.newMessageButton.waitForClickable({ timeout: 7000 })
    await this.newMessageButton.click()
  }

  async insertTextToSearchContactInput(phoneNumber: string) {
    await this.searchContactsInput.waitForDisplayed()
    await this.searchContactsInput.setValue(phoneNumber)
  }

  async insertTextToMessageInput(messageText: string) {
    await this.messageTextInput.waitForDisplayed()
    await this.messageTextInput.setValue(messageText)
  }

  async sendMessage(phoneNumber: string, messageText: string) {
    // click NEW MESSAGE button
    await this.clickNewMessageButton()
    //input phone number into contact search field
    await this.insertTextToSearchContactInput(phoneNumber)
    //input message text into message input
    await this.insertTextToMessageInput(messageText)
    //send by pressing Send button

    await this.sendMessageButton.waitForClickable()
    await this.sendMessageButton.click()
  }

  async clickCloseThreadDetailsScreen() {
    await this.closeButtonOnThreadDetailScreen.waitForClickable({
      timeout: 7000,
    })
    await this.closeButtonOnThreadDetailScreen.click()
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
    await this.deleteButtonOnThreadDetailScreen.waitForClickable({
      timeout: 7000,
    })
    await this.deleteButtonOnThreadDetailScreen.click()
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

  public get threadCheckbox(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $('[data-testid="checkbox"]')
  }

  async clickThreadCheckbox() {
    await this.threadCheckbox.waitForClickable()
    await this.threadCheckbox.click()
  }

  public get deleteButtonSelectionManager(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $('[data-testid="icon-Delete"]')
  }

  async clickDeleteButtonSelectionMaanager() {
    await this.deleteButtonSelectionManager.waitForClickable()
    await this.deleteButtonSelectionManager.click()
  }

  async waitForSendingIconToDisappear() {
    await this.sendingStatus.waitForDisplayed({ timeout: 30000, reverse: true })
  }
}

export default new MessagesPage()
