/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import Page from "./page"

class NewsPage extends Page {
  public get newsHeader() {
    return $('[data-testid="location"]')
  }

  public get moreNewsButton() {
    return $("p*=More news")
  }

  public get newsCardElements() {
    return $$('[data-testid="news-card"]')
  }

  public get newsCardElement() {
    return $('[data-testid="news-card"]')
  }

  public get sidebarMenuActiveItem() {
    return $("[aria-current=page]")
  }

  public get sidebarMenuActiveItemText() {
    return $("[aria-current=page] p")
  }
}

export default new NewsPage()
