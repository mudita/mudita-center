/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ChainablePromiseElement } from "webdriverio"
import Page from "./page"

class HelpPage extends Page {
  public get listElement(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $('[data-testid="help-component-question"]')
  }

  public get windowTitle(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $('[data-testid="help-component-title"]')
  }

  public get searchIcon(): ChainablePromiseElement<
  Promise<WebdriverIO.Element>
  > {
    return $('[data-testid="icon-Magnifier"]')
  }

  public get topicContent(): ChainablePromiseElement<
  Promise<WebdriverIO.Element>
  > {
    return $('[data-testid="content"]')
  }
  
  public get articleBackLink(): ChainablePromiseElement<
  Promise<WebdriverIO.Element>
  > {
    return $('[data-testid="back-link"]')
  }

  /**[Selector]  Contact support button  */
  public get contactSupportButton(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $('[data-testid="help-support-button"]')
  }
}

export default new HelpPage()
