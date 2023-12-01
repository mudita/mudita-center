/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ChainablePromiseElement } from "webdriverio"
import Page from "./page"

class NewsPage extends Page {
  public get moreNewsButton(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $("p*=More news")
  }

  public get newsCardElement(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $('[data-testid="news-card"]')
  }
}

export default new NewsPage()
