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

  /** [Selector] Message not sent icon displayed on the thread list */
  public get messageNotSentThreadIcon(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $('[data-testid="thread-not-send-message-icon"]')
  }

  /** Empty thread list screen:
   * You don't have any messages yet
   * Don’t hesitate - let your friends know you’re thinking about them */
  public get threadScreenEmptyList(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $('[data-testid="messages-empty-thread-list-state"]')
  }

  /** [Selector] Thread options icon (...) */
  public get threadDropdownIcon(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $('[data-testid="icon-More"]')
  }

  /** [Selector] Thread options icon (...) */
  public get threadDropdownButton(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $('[data-testid="thread-row-toggler"]')
  }
  /** Click Thread options button*/
  async clickThreadDropdownButton() {
    await this.threadDropdownButton.waitForClickable({ timeout: 7000 })
    await this.threadDropdownButton.click()
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

  /** Click thread options icon (...)*/
  async clickThreadDropdownIcon() {
    await this.threadDropdownIcon.waitForDisplayed({ timeout: 7000 })
    await this.threadDropdownIcon.click()
  }

  /** Click Delete conversation on thread dropdown list*/
  async clickThreadDropdownDeleteButton() {
    await this.threadDropdownDeleteButton.waitForClickable({ timeout: 7000 })
    await this.threadDropdownDeleteButton.click()
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
  async clickThreadDropdownMarkAsReadButton() {
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
  /** Returns list of last message text displayed on the conversation list and true/false depending on message unread/read status*/
  async getLastMessages() {
    const allLastMessages = await $$('//*[@data-testid="thread-last-message"]')

    const messagesContent: string[] = await browser.executeAsync((done) => {
      const messages = Array.from(
        document.querySelectorAll('p[data-testid="thread-last-message"]')
      )

      const pseudoElements = messages.map((item) => {
        const styles = document.defaultView.getComputedStyle(item, "::after")
        return styles.getPropertyValue("content")
      })

      done(pseudoElements)
    })

    const result = await Promise.all(
      allLastMessages.map(async (lastMessage, index) => {
        return {
          text: await lastMessage.getText(),
          dotDisplayed: messagesContent[index] !== "none",
        }
      })
    )

    return result
  }
}

export default new MessagesPage()
