/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import Page from "./page"
import { NewsTestId } from "../all-test-ids"

class NewsPage extends Page {
  public get moreNewsButton() {
    return $(`[data-testid="${NewsTestId.MoreNewsButton}"]`)
  }

  public get newsCardElements() {
    return $$(`[data-testid="${NewsTestId.Card}"]`)
  }
}

export default new NewsPage()
