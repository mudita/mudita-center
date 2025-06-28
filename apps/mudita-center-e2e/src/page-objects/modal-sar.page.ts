/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import Page from "./page"

class AboutKompaktPage extends Page {
  public get sarHeader() {
    return $("//h3[contains(text(), 'SAR')]")
  }

  public get modalCloseButton() {
    return $("//*[@data-testid='icon-close']")
  }
}

export default new AboutKompaktPage()
