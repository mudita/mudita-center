/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import Page from "./page"
import { HelpTestId } from "help/models"

class HelpArticlePage extends Page {
  public get articleBackButton() {
    return $(`[data-testid="${HelpTestId.ArticleBackButton}"]`)
  }

  public get articleTitle() {
    return $(`[data-testid="${HelpTestId.ArticleTitle}"]`)
  }
}

export default new HelpArticlePage()
