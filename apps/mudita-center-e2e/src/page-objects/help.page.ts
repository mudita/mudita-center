/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ChainablePromiseElement } from "webdriverio"
import Page from "./page"

class HelpPage extends Page {
  public get listElement(): ChainablePromiseElement<WebdriverIO.Element> {
    return $('[data-testid="help-component-question"]')
  }

  public get listElements(): ChainablePromiseElement<WebdriverIO.ElementArray> {
    return $$('[data-testid="help-component-question"]')
  }

  public get windowTitle(): ChainablePromiseElement<WebdriverIO.Element> {
    return $('[data-testid="help-component-title"]')
  }

  public get searchIcon(): ChainablePromiseElement<WebdriverIO.Element> {
    return $('[data-testid="icon-Magnifier"]')
  }

  public get searchPlaceholder(): ChainablePromiseElement<WebdriverIO.Element> {
    return $('[type="search"]')
  }

  public get topicContent(): ChainablePromiseElement<WebdriverIO.Element> {
    return $('[data-testid="content"]')
  }

  public get articleBackLink(): ChainablePromiseElement<WebdriverIO.Element> {
    return $('[data-testid="back-link"]')
  }

  public get contactSupportButton(): ChainablePromiseElement<WebdriverIO.Element> {
    return $('[data-testid="help-support-button"]')
  }

  public get contactSupportButtonTooltip(): ChainablePromiseElement<WebdriverIO.Element> {
    return $('[data-testid="icon-button-with-tooltip-description"]')
  }
}

export default new HelpPage()
