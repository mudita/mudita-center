/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ChainablePromiseElement } from "webdriverio"
import Page from "./page"

class NavigationTabs extends Page {
  public get muditaNewsTab(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $('[data-testid="icon-MenuNews"]')
  }

  public get overviewTab(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $('[data-testid="overview-link"]')
  }

  async overviewTabClick() {
    await this.overviewTab.click()
  }

  public get overviewKompaktTab(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $('[data-testid="icon-MenuOverview"]')
  }

  public get messagesTab(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $('[data-testid="overview-menu-link"]')
  }

  async clickMessagesTab() {
    await this.messagesTab.waitForClickable({ timeout: 5000 })
    await this.messagesTab.click()
  }

  public get contactsTab(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $('[data-testid="contacts-menu-link"]')
  }

  async clickContactsTab() {
    await this.contactsTab.waitForClickable()
    await this.contactsTab.click()
  }

  public get settingsTab(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $('[data-testid="icon-MenuSettings"]')
  }

  async settingsTabClick() {
    await this.settingsTab.click()
  }

  public get helpTab(): ChainablePromiseElement<Promise<WebdriverIO.Element>> {
    return $('[data-testid="help-menu-button"]')
  }

  async helpTabClick() {
    await this.helpTab.click()
  }
}

export default new NavigationTabs()
