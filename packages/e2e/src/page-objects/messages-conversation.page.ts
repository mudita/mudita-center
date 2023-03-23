/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ChainablePromiseElement } from "webdriverio"
import Page from "./page"

class MessagesConversationPage extends Page {
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

  /** [Selector] Delete button visible on open thread (thread details) screen*/
  public get threadDetailScreenDeleteButton(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $('[data-testid="right-sidebar-delete-button"]')
  }

  /** [Selector] Add contact button visible on open thread (thread details) screen*/
  public get threadDetailScreenAddContactButton(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $('[data-testid="right-sidebar-contact-button"]')
  }

  /** [Selector] Close button visible on open thread (thread details) screen*/
  public get threadDetailScreenCloseButton(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $('[data-testid="icon-Close"]').parentElement()
  }

  /** [Selector] Mark as unread button visible on open thread (thread details) screen*/
  public get threadDetailScreenMarkAsUnreadButton(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $('[data-testid="right-sidebar-mark-as-unread-button"]')
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

  /** Click Close button on thread details screen*/
  async clickCloseThreadDetailsScreen() {
    await this.threadDetailScreenCloseButton.waitForClickable({
      timeout: 7000,
    })
    await this.threadDetailScreenCloseButton.click()
  }

  /** Click Delete button on thread details screen*/
  async clickThreadDetailScreenDeleteButton() {
    await this.threadDetailScreenDeleteButton.waitForClickable({
      timeout: 7000,
    })
    await this.threadDetailScreenDeleteButton.click()
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

  /** [Selector] Browse contacts button*/
  public get browseContactsButton(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $('[data-testid="new-message-form-browse-contacts"]')
  }

  /** [Selector] Conversation recipient name text*/
  public get conversationRecipientNameText(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $('[data-testid="sidebar-fullname"]')
  }

  /** [Selector] Conversation recipient number text*/
  public get conversationRecipientPhoneText(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $('[data-testid="sidebar-phone-number"]')
  }

  /** [Selector] Contact search result item*/
  public get contactSearchResultItem(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $('[data-testid="input-select-list-item"]')
  }
}

export default new MessagesConversationPage()
