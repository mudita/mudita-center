/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ChainablePromiseElement } from "webdriverio"
import Page from "./page";

class HomePage extends Page {
  get homeHeader(): ChainablePromiseElement<WebdriverIO.Element> {
    return $('h2*=Welcome to Mudita Center')
  }

  get notNowButton(): ChainablePromiseElement<WebdriverIO.Element> {
    return $('button*=Not now')
  }
}

export default new HomePage()
