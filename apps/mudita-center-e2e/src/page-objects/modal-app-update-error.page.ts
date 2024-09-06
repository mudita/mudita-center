/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import Page from "./page"

class ModalAppUpdateError extends Page {
  public get infoIcon() {
    return $('[data-testid="icon-Info"]')
  }

  public get errorLabel() {
    return $("h4*=Error")
  }

  public get pleaseRestartParagraph() {
    return $("p*=Please restart the app")
  }

  public get closeButton() {
    return $('[data-testid="close-bottom-button"]')
  }
}

export default new ModalAppUpdateError()
