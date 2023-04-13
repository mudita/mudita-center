/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ChainablePromiseElement } from "webdriverio"
import Page from "./page"

const backspaceKey = "\ue003"

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
  public get selectionManagerIconDelete(): ChainablePromiseElement<
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

    const messagesContents: string[] = await browser.executeAsync((done) => {
      const messages = Array.from(
        document.querySelectorAll('p[data-testid="thread-last-message"]')
      )

      const messagesContents = messages.map((item) => {
        const styles = document.defaultView.getComputedStyle(item, "::after")
        return styles.getPropertyValue("content")
      })

      done(messagesContents)
    })

    const result = await Promise.all(
      allLastMessages.map(async (lastMessage, index) => {
        return {
          text: await lastMessage.getText(),
          dotDisplayed: messagesContents[index] !== "none",
        }
      })
    )

    return result
  }
  /** [Selector] Messages search input  */
  public get searchInput(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $('[data-testid="input-search"]')
  }

  async insertTextToSearchInput(searchText: string) {
    await this.searchInput.waitForClickable()

    const backSpaces = new Array(
      (await this.searchInput.getValue()).length
    ).fill("Backspace")

    await this.searchInput.setValue(backSpaces)
    await this.searchInput.setValue(searchText)
  }

  /** [Selector] Search result overlay list  */
  public get searchResultsOverlayList(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $('[data-testid="input-select-list"]')
  }
  /** [Selector] empty search results overlay list   */
  public get emptySearchResultsOverlayList(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return this.searchResultsOverlayList.$("li*=No results found")
  }
  /** [Selector] See all button on search results overlay  */
  public get seeAllSearchResultsButton(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $("button*=See all")
  }

  /** [Selector] Returns list of multiple elements - contact icon for threads without matching contact in phonebok */
  public get iconsContactFilled() {
    return $$('[data-testid="icon-ContactFilled"]')
  }

  /** [Selector] Returns list of multiple elements - contact icon for threads with matching contact in phonebok */
  public get avatarsText() {
    return $$('[data-testid="avatar-text"]')
  }
  /** [Selector] Selection manager- select all checkbox */
  public get selectAllCheckbox(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $('[data-testid="message-panel-selection-manager"]').$(
      '[type="checkbox"]'
    )
  }
  /** [Selector] Selection manager- select all checkbox */
  public get selectionManagerDeleteButton(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $('[data-testid="message-panel-selection-manager"]').$("p*=Delete")
  }

  /** [Selector] Search results for ' ' text displayed above the thread list*/
  public get searchResultsForText(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $("h4*=Search results")
  }

  /** [Selector] Returns list of multiple elements - contact icon for threads with matching contact in phonebok */
  public get searchOverlayItemsList() {
    return $$('[data-testid="input-select-list-item"]')
  }

  async clickByTextConversationOnSearchResultsOverlay(searchText: string) {
    for (let i = 0; i < (await this.searchOverlayItemsList.length); i++) {
      if (
        await this.searchOverlayItemsList[i].$(
          '[data-testid="icon-Conversation"]'
        )
      ) {
        if (
          (await this.searchOverlayItemsList[i].getText()).includes(searchText)
        ) {
          return this.searchOverlayItemsList[i].click()
        }
      }
    }
  }
  async clickByTextMessageOnSearchResultsOverlay(searchText: string) {
    for (let i = 0; i < (await this.searchOverlayItemsList.length); i++) {
      if (
        (await this.searchOverlayItemsList[i].getText()).includes(searchText)
      ) {
        return this.searchOverlayItemsList[i].click()
      }
    }
  }

  /** [Selector] Element containing contact number/name displayed on Search results for '' list  */
  public get nameFieldOnSearchResultsConversationList(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $('[data-testid="name-field"]')
  }
}

export default new MessagesPage()
