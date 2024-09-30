/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import Page from "./page"

class HelpPage extends Page {
  public get listElement() {
    return $('[data-testid="help-component-question"]')
  }

  public get listElements() {
    return $$('[data-testid="help-component-question"]')
  }

  public get windowTitle() {
    return $('[data-testid="help-component-title"]')
  }

  public get searchIcon() {
    return $('[data-testid="icon-Magnifier"]')
  }

  public get searchPlaceholder() {
    return $('[type="search"]')
  }

  public get topicContent() {
    return $('[data-testid="content"]')
  }

  public get articleBackLink() {
    return $('[data-testid="back-link"]')
  }

  public get contactSupportButton() {
    return $('[data-testid="help-support-button"]')
  }

  public get contactSupportButtonTooltip() {
    return $('[data-testid="icon-button-with-tooltip-description"]')
  }

  public get helpMainFooterContactSupportButton() {
    return $('[data-testid="help-main-footer-contact-support-button"]')
  }
}

export default new HelpPage()
