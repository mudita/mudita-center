/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import Page from "./page"

class HelpPage extends Page {
  public get helpTabTitle() {
    return $('[data-testid="location"]')
  }
  public get helpMainHeader() {
    return $('[data-testid="help-main-header"]')
  }
  public get helpMainSubHeader() {
    return $('[data-testid="help-main-subheader"]')
  }
  public get iconSearch() {
    return $('[data-testid="icon-search"]')
  }
  public get helpSearchInput() {
    return $('[data-testid="help-search-input"]')
  }
  public get helpSearchResults() {
    return $('[data-testid="help-search-results"]')
  }
  public get iconSearchHelpSearchResults() {
    return $('[data-testid="help-search-results"] [data-testid="icon-search"]')
  }
  public get helpSearchResultsParagraph() {
    return $('[data-testid="help-search-results"] p')
  }
  public get helpSearchResultsList() {
    return $('[data-testid="help-search-results"] ul')
  }
  public get helpSearchResultsItems() {
    return $$('[data-testid="help-search-result-item"]')
  }
  public get helpCategoriesTitle() {
    return $('[data-testid="help-categories-title"]')
  }
  public get helpCategoriesList() {
    return $('[data-testid="help-categories-list"]')
  }
  public get helpCategoriesListItems() {
    return $$('[data-testid="help-categories-list-item"]')
  }
  public get helpSubCategoriesList() {
    return $('[data-testid="help-subcategories-list"]')
  }
  public get helpSubCategoriesListItems() {
    return $$('[data-testid="help-subcategories-list-item"]')
  }
  public get helpSubCategoriesListItemsLeftColumn() {
    return $$('[data-testid="help-subcategories-list"]>div')[0].$$(
      '[data-testid="help-subcategories-list-item"]'
    )
  }
  public get helpSubCategoriesListItemsRightColumn() {
    return $$('[data-testid="help-subcategories-list"]>div')[1].$$(
      '[data-testid="help-subcategories-list-item"]'
    )
  }
  public get helpMainFooterDescription() {
    return $('[data-testid="help-main-footer-description"]')
  }
  public get helpMainFooterContactSupportButton() {
    return $('[data-testid="help-main-footer-contact-support-button"]')
  }
}

export default new HelpPage()
