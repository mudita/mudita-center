/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FullscreenLayoutTestIds } from "../all-test-ids"
import AppInitPage from "./app-init.page"

/**
 * main page object containing all methods, selectors and functionality
 * that is shared across all page objects
 */

export default class Page {
  public async getPageUrl() {
    const path = await browser.getUrl()
    return path.split("index.html#")[1]
  }

  public get appHeader() {
    return $('[data-testid="dashboard-header-title"]')
  }

  public get activeMenuItem() {
    return $("[aria-current=page]")
  }

  public get fullscreenLayout() {
    return $(
      `//div[@data-testid="${FullscreenLayoutTestIds.FullScreenLayout}"]`
    )
  }

  public get fullscreenLayoutCloseButton() {
    return this.fullscreenLayout.$(`.//header/button`)
  }

  public async closeFullscreenLayout() {
    if (await this.fullscreenLayout.isDisplayed()) {
      await this.fullscreenLayoutCloseButton.click()
      await this.fullscreenLayout.waitForExist({
        reverse: true,
        timeout: 5000,
      })
    }
  }

  public async scrollIntoView(element: ChainablePromiseElement) {
    await browser.execute((el) => el.scrollIntoView(), element)
  }

  public async reloadApp({
    skipPrivacyPolicy = false,
    skipWelcomeScreen = false,
  } = {}) {
    await browser.reloadSession()
    await this.ensureAppIsOpen()

    if (skipPrivacyPolicy) {
      await AppInitPage.acceptPrivacyPolicy()
    }
    if (skipWelcomeScreen) {
      await this.closeFullscreenLayout()
    }
  }

  public ensureAppIsOpen() {
    return browser.waitUntil(
      async () => {
        try {
          await browser.getTitle()
          return true
        } catch {
          return false
        }
      },
      {
        timeout: 10000,
        timeoutMsg: "App did not open in expected time",
      }
    )
  }
}
