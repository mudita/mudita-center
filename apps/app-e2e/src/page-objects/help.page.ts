/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { HelpTestId } from "help/models"
import Page from "./page"

class HelpPage extends Page {
  public get contactSupportButton() {
    return $(`[data-testid="${HelpTestId.MainFooterContactSupportButton}"]`)
  }
}

export default new HelpPage()
