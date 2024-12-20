/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import Page from "./page"

class NavigationTabs extends Page {
  public get muditaNewsTab() {
    return $('[data-testid="icon-MenuNews"]')
  }

  public get overviewTab() {
    return $('[data-testid="overview-link"]')
  }

  async overviewTabClick() {
    await this.overviewTab.click()
  }

  public get overviewKompaktTab() {
    return $('[data-testid="icon-MenuOverview"]')
  }

  public get messagesTab() {
    return $('[data-testid="overview-menu-link"]')
  }

  async clickMessagesTab() {
    await this.messagesTab.waitForClickable({ timeout: 5000 })
    await this.messagesTab.click()
  }

  public get contactsTab() {
    return $('[data-testid="contacts-menu-link"]')
  }

  public get contactsKompaktTab() {
    return $('[data-testid="icon-MenuContacts"]')
  }

  public get settingsTab() {
    return $('[data-testid="icon-MenuSettings"]')
  }

  public get helpTab() {
    return $('[data-testid="help-menu-button"]')
  }

  public async openHelpPage() {
    const helpTab = await this.helpTab
    await helpTab.waitForDisplayed({ timeout: 15000 })
    await helpTab.click()
  }
}

export default new NavigationTabs()
