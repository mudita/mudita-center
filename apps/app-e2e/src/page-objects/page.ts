/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FullscreenLayoutTestIds } from "../all-test-ids"

/**
 * main page object containing all methods, selectors and functionality
 * that is shared across all page objects
 */

export default class Page {
  public getInstancePath() {
    return browser.electron.execute((electron) => {
      return electron.app.getPath("userData")
    })
  }

  public async getPageUrl() {
    const path = await browser.getUrl()
    return path.split("index.html#")[1]
  }

  public get appHeader() {
    return $('//div[@data-testid="dashboard-header-title"]')
  }

  public get appHeaderTabs() {
    return $('//nav[@data-testid="dashboard-header-tabs"]')
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
      await browser.pause(5000)
    }
  }

  public async scrollIntoView(element: ChainablePromiseElement) {
    await browser.execute((el) => el.scrollIntoView(), element)
  }
}
