/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import Page from "./page"

class HelpPage extends Page {

  //Getters
  public get helpTabTitle() {
    return $('//h4[@data-testid="location"]')
  }
  public get helpMainHeader() {
    return $('//h3[@data-testid="help-main-header"]')
  }
  public get helpMainSubHeader() {
    return $('//p[@data-testid="help-main-subheader"]')
  }
  public get iconSearch() {
    return $('//div[@data-testid="icon-search"]')
  }
  public get helpSearchInput() {
    return $('//input[@data-testid="help-search-input"]')
  }
  public get helpSearchResults() {
    return $('//div[@data-testid="help-search-results"]')
  }
  public get iconSearchHelpSearchResults() {
    return $('//div[@data-testid="help-search-results"]//div[@data-testid="icon-search"]')
  }
  public get helpSearchResultsParagraph() {
    return $('//div[@data-testid="help-search-results"]//p')
  }
  public get helpSearchResultsList() {
    return $('//div[@data-testid="help-search-results"]//ul')
  }
  public get helpSearchResultsItems() {
    return $$('//a[@data-testid="help-search-result-item"]')
  }
  public get helpCategoriesTitle() {
    return $('//h2[@data-testid="help-categories-title"]')
  }
  public get helpCategoriesList() {
    return $('//nav[@data-testid="help-categories-list"]')
  }
  public get helpCategoriesListItems() {
    return $$('//a[@data-testid="help-categories-list-item"]')
  }
  public get helpSubCategoriesList() {
    return $('//div[@data-testid="help-subcategories-list"]')
  }
  public get helpSubCategoriesListItems() {
    return $$('//div[@data-testid="help-subcategories-list-item"]')
  }
  public getHelpSubCategoriesListItemsFromColumn(columnIndex: number){
    return $$(`(//div[@data-testid="help-subcategories-list"]/div)[${columnIndex + 1}]//div[@data-testid="help-subcategories-list-item"]`)   
  }
  public get helpSubCategoriesListItemsLeftColumn() {
    return this.getHelpSubCategoriesListItemsFromColumn(0)
  }
  public get helpSubCategoriesListItemsRightColumn() {
    return this.getHelpSubCategoriesListItemsFromColumn(1)
  }
  public get helpMainFooterDescription() {
    return $('//p[@data-testid="help-main-footer-description"]')
  }
  public get helpMainFooterContactSupportButton() {
    return $('//button[@data-testid="help-main-footer-contact-support-button"]')
  }
  public get ContactSupportButton() {
    return $('[data-testid="button-text_undefined"]')
  }
  public get iconContactSupport() {
    return $('[data-testid="icon-support"]')
  }
  public async searchForArticle(text:string) {
    const searchInput = await this.helpSearchInput
    await searchInput.setValue(text)
  }
}

export default new HelpPage()
