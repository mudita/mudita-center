/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ChainablePromiseElement } from "webdriverio"
import Page from "./page"

class HelpArticlePage extends Page {
  public get helpTabTitle() {
    return $('[data-testid="location"]')
  }
  public get helpArticleBackButton() {
    return $('[data-testid="help-article-back-button"]')
  }
  public get helpArticleItems() {
    return $$('[data-testid="help-subcategory-articles-list-item"]')
  }
  public get helpArticleTitle() {
    return $('[data-testid="help-article-title"]')
  }
  public get helpArticleWarningIcon() {
    return $('[data-testid="help-article-warning-icon"]')
  }
  public get helpArticleWarning() {
    return $('[data-testid="help-article-warning"]')
  }
  public get helpArticleContent() {
    return $('[data-testid="help-article-content"]')
  }
  public get helpArticleContentBlocks() {
    return $$('[data-testid="help-article-content-block"]')
  }
  getHelpArticleContentBlock(index: number) {
    return $$('[data-testid="help-article-content-block"]')[index]
  }
  getHelpArticleContentBlockTitle(index: number) {
    return $$('[data-testid="help-article-content-block-title"]')[index]
  }
  public get helpArticleContentBlockText() {
    return $$('[data-testid="help-article-content-block-text"]')
  }
  getHelpArticleContentBlockText(index: number) {
    return $$('[data-testid="help-article-content-block"]')[index].$(
      '[data-testid="help-article-content-block-text"]'
    )
  }
  public get helpArticleFeedback() {
    return $('[data-testid="help-article-feedback"]')
  }
  public get helpArticleFeedbackTitle() {
    return $('[data-testid="help-article-feedback-title"]')
  }
  public get helpArticleFeedbackYesButton() {
    return $('[data-testid="help-article-feedback-yes-button"]')
  }
  public get helpArticleFeedbackNoButton() {
    return $('[data-testid="help-article-feedback-no-button"]')
  }
  public get iconNamaste() {
    return $('[data-testid="icon-namaste"]')
  }
  public get feedbackThanksText() {
    return $('[data-testid="help-article-feedback-thanks"]')
  }
  public get helpArticleFooter() {
    return $('[data-testid="help-article-footer"]')
  }
  public get helpArticleFooterTitle() {
    return $('[data-testid="help-article-footer-title"]')
  }
  public get helpArticleFooterButton() {
    return $('[data-testid="help-article-footer-button"]')
  }
  public get helpArticleFooterVisitSupportButton() {
    return $('[data-testid="help-article-footer-button"]')
  }
}

export default new HelpArticlePage()
