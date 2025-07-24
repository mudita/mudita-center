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

  public get articleItems() {
    return $$(`[data-testid="${HelpTestId.SubcategoryArticlesListItem}"]`)
  }

  public get articleTitle() {
    return $(`[data-testid="${HelpTestId.ArticleTitle}"]`)
  }

  public get articleFeedback() {
    return $(`[data-testid="${HelpTestId.ArticleFeedback}"]`)
  }

  public get articleFeedbackTitle() {
    return $(`[data-testid="${HelpTestId.ArticleFeedbackTitle}"]`)
  }

  public get articleFeedbackYesButton() {
    return $(`[data-testid="${HelpTestId.ArticleFeedbackYesButton}"]`)
  }

  public get articleFeedbackNoButton() {
    return $(`[data-testid="${HelpTestId.ArticleFeedbackNoButton}"]`)
  }

  public get feedbackThanksText() {
    return $(`[data-testid="${HelpTestId.ArticleFeedbackThanks}"]`)
  }
}

export default new HelpArticlePage()
