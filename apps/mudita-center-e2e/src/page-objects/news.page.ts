/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ChainablePromiseElement } from "webdriverio"
import Page from "./page"

class NewsPage extends Page {
  public get newsHeader() {
    return $('[data-testid="location"]')
  }

  public get moreNewsButton() {
    return $("p*=More news")
  }

  public get newsCardElement() {
    return $('[data-testid="news-card"]')
  }
}

export default new NewsPage()
