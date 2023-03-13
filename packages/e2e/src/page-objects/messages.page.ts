/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ChainablePromiseElement } from "webdriverio"
import Page from "./page"

class MessagesPage extends Page {
  /** [Selector] NEW MESSAGE button selector */
  public get newMessageButton(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $('[data-testid="message-panel-new-message-button"]')
  }

  /** [Selector] Search Contacts input field (visible after NEW MESSAGE button is clicked) */
  public get searchContactsInput(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $('[data-testid="receiver-input-select-input"]')
  }

  /** [Selector] Input field for message text */
  public get messageTextInput(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $('[data-testid="thread-details-text-area-input"]')
  }

  /** [Selector] Send message button (visible after message text is entered) */
  public get sendMessageButton(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $('[data-testid="thread-details-text-area-send-button"]')
  }

  /** [Selector] Message not sent icon displayed next to the message */
  public get messageNotSentIcon(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $('[data-testid="message-bubble-not-send-icon"]')
  }

  /** [Selector] Message not sent icon displayed on the thread list */
  public get messageNotSentThreadIcon(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $('[data-testid="thread-not-send-message-icon"]')
  }

  /** [Selector] Delete button visible on open thread (thread details) screen*/
  public get threadDetailScreenDeleteButton(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $('[data-testid="icon-Delete"]')
  }

  /** [Selector] Add contact button visible on open thread (thread details) screen*/
  public get threadDetailScreenAddContactButton(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $('[data-testid="icon-NewContact"]')
  }

  /** [Selector] Close button visible on open thread (thread details) screen*/
  public get threadDetailScreenCloseButton(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $('[data-testid="icon-Close"]')
  }

  /** [Selector] Mark as unread button visible on open thread (thread details) screen*/
  public get threadDetailScreenMarkAsUnreadButton(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $('[data-testid="icon-MarkAsUnread"]')
  }

  /** [Selector] Single sending status   */
  public get sendingStatusIcon(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $('[data-testid="dot"]')
  }

  /** [Selector] Single message container */
  public get messageContainer(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $('[data-testid="message-bubble-container"]')
  }
  /** [Selector] Single message content element*/
  public get messageContent(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $('[data-testid="message-bubble-message-content"]')
  }
  /** Hover over Message content element to display options button*/
  async hoverOverMessageContent() {
    await this.messageContent.waitForDisplayed({ timeout: 9000 })
    await this.messageContent.moveTo()
  }

  /** [Selector] Single message options button (...) visible on hover over message. Same purpose as messageDropdownIcon */
  public get messageDropdownButton(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return this.messageContainer.$(
      '[data-testid="message-bubble-dropdown-action-button"]'
    )
  }

  /** [Selector] Single message options icon (...) visible on hover over message*/
  public get messageDropdownIcon(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return this.messageContainer.$('[data-testid="icon-More"]')
  }

  /** Clicks single message options icon(...) */
  async clickMessageDropdownIcon() {
    await this.messageDropdownIcon.waitForClickable()
    await this.messageDropdownIcon.click()
  }

  /** Empty thread list screen:
   * You don't have any messages yet
   * Don’t hesitate - let your friends know you’re thinking about them */
  public get threadScreenEmptyList(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $('[data-testid="messages-empty-thread-list-state"]')
  }

  /** Dropdown element displayed after message options button/icon is clicked*/
  public get messageDropdown(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $('[data-testid="dropdown"]')
  }

  /** [Selector] Delete message button on message dropodown list */
  public get messageDropdownDeleteButton(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return this.messageDropdown.$(
      '[data-testid="message-bubble-delete-message-button"]'
    )
  }

  /** Clicks Delete from single message dropdown list */
  async clickMessageDropdownDeleteButton() {
    await this.messageDropdownDeleteButton.waitForClickable()
    await this.messageDropdownDeleteButton.click()
  }

  /** [Selector] Thread options icon (...) */
  public get threadDropdownIcon(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $('[data-testid="icon-More"]')
  }

  /** [Selector] Delete conversation button on therad dropodown list */
  public get threadDropdownDeleteButton(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $('[data-testid="dropdown-delete"]')
  }

  /** Click NEW MESSAGE button*/
  async clickNewMessageButton() {
    await this.newMessageButton.waitForClickable({ timeout: 7000 })
    await this.newMessageButton.click()
  }

  /** Insert text to Search Contacts input field*/
  async insertTextToSearchContactInput(recipientText: string) {
    await this.searchContactsInput.waitForDisplayed()
    await this.searchContactsInput.setValue(recipientText)
  }

  /** Insert text to message input field*/
  async insertTextToMessageInput(messageText: string) {
    await this.messageTextInput.waitForDisplayed()
    await this.messageTextInput.setValue(messageText)
  }

  /** Send message using send button */
  async sendMessage(recipientText: string, messageText: string) {
    // click NEW MESSAGE button
    await this.clickNewMessageButton()
    //input phone number into contact search field
    await this.insertTextToSearchContactInput(recipientText)
    //input message text into message input
    await this.insertTextToMessageInput(messageText)
    //send by pressing Send button

    await this.sendMessageButton.waitForClickable()
    await this.sendMessageButton.click()
  }

  /** Click Close button on thread details screen*/
  async clickCloseThreadDetailsScreen() {
    await this.threadDetailScreenCloseButton.waitForClickable({
      timeout: 7000,
    })
    await this.threadDetailScreenCloseButton.click()
  }

  /** Click thread options icon (...)*/
  async clickThreadDropdownIcon() {
    await this.threadDropdownIcon.waitForClickable({ timeout: 7000 })
    await this.threadDropdownIcon.click()
  }

  /** Click Delete conversation on thread dropdown list*/
  async clickThreadDropdownDeleteButton() {
    await this.threadDropdownDeleteButton.waitForClickable({ timeout: 7000 })
    await this.threadDropdownDeleteButton.click()
  }

  /** Click Delete button on thread details screen*/
  async clickThreadDetailScreenDeleteButton() {
    await this.threadDetailScreenDeleteButton.waitForClickable({
      timeout: 7000,
    })
    await this.threadDetailScreenDeleteButton.click()
  }

  /** [Selector] Thread row element */
  public get threadRow(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $('[data-testid="message-row"]')
  }

  /** Hover over Thread row to make selection manager checkbox visible*/
  async hoverOverThreadRow() {
    await this.threadRow.waitForDisplayed()
    await this.threadRow.moveTo()
  }

  /** [Selector] Thread checkbox*/
  public get threadCheckbox(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $('[data-testid="checkbox"]')
  }

  /** Click on therad checkbox to activate selection manager*/
  async clickThreadCheckbox() {
    await this.threadCheckbox.waitForClickable()
    await this.threadCheckbox.click()
  }

  /** [Selector] Delete button available when selection manager is active */
  public get selectionManagerDeleteButton(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $('[data-testid="icon-Delete"]')
  }

  /** Click Delete button (visible when selection manager is active) */
  async clickSelectionManagerDeleteButton() {
    await this.selectionManagerDeleteButton.waitForClickable()
    await this.selectionManagerDeleteButton.click()
  }

  /** Wait 30s for sending status icon to disappear*/
  async waitToDisappearSendingStatusIcon() {
    await this.sendingStatusIcon.waitForDisplayed({
      timeout: 30000,
      reverse: true,
    })
  }

  /** Click Mark as unread button on thread details screen*/
  async clickThreadDetailScreenMarkAsUnreadButton() {
    await this.threadDetailScreenMarkAsUnreadButton.waitForClickable()
    await this.threadDetailScreenMarkAsUnreadButton.click()
  }

  /** [Selector] Thread details top level element*/
  public get threadDetailsContainer(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $('[data-testid="messages-thread-details"]')
  }

  /** [Selector] Mark as read on thread dropdown */
  public get threadDropdownMarkAsReadButton(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $('[data-testid="dropdown-mark-as-read"]')
  }

  /** Click Mark as read on thread dropdown*/
  async clickDropdownMarkAsReadButton() {
    await this.threadDropdownMarkAsReadButton.waitForClickable({
      timeout: 7000,
    })
    await this.threadDropdownMarkAsReadButton.click()
  }

  /** [Selector] Text of dropdownMarkAsReadButton, depending on the message status can be 'Mark as read' or 'Mark as unread' */
  public get textOptionMarkAsReadDropdown(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return this.threadDropdownMarkAsReadButton.$("p")
  }
}

export default new MessagesPage()
