/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

/**
 * main page object containing all methods, selectors and functionality
 * that is shared across all page objects
 */

export class Page {
  public get appHeader() {
    return $('[data-testid="dashboard-header-title"]')
  }
}

export default new Page()
