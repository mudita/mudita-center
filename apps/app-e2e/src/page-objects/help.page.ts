/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { HelpTestId } from "help/models"
import Page from "./page"

class HelpPage extends Page {
  public get mainHeader() {
    return $(`//h3[@data-testid='${HelpTestId.MainHeader}']`)
  }

  public get mainSubHeader() {
    return $(`//p[@data-testid='${HelpTestId.MainSubheader}']`)
  }

  public get searchInputWrapper() {
    return $(`[data-testid="${HelpTestId.SearchInput}"]`)
  }

  public get searchInput() {
    return $(`//input[@data-testid='${HelpTestId.SearchInput}']`)
  }

  public get searchInputIconSearch() {
    return this.searchInput.$("//span[@data-testid='icon-search']")
  }

  public get searchInputIconClose() {
    return this.searchInput.$("//span[@data-testid='icon-close']")
  }

  public get searchResults() {
    return $(`//div[@data-testid='${HelpTestId.SearchResults}']`)
  }

  public get searchResultsParagraph() {
    return $(`//div[@data-testid='${HelpTestId.SearchResults}']//p`)
  }

  public get searchResultsItems() {
    return $$(`//a[@data-testid='${HelpTestId.SearchResultsItem}']`)
  }

  public get categoriesTitle() {
    return $(`//h2[@data-testid='${HelpTestId.CategoriesTitle}']`)
  }

  public get categoriesListItems() {
    return $$(`//a[@data-testid='${HelpTestId.CategoriesListItem}']`)
  }

  public get subCategoriesListItems() {
    return $$(`//div[@data-testid='${HelpTestId.SubcategoriesListItem}']`)
  }

  public getSubCategoriesListItemsFromColumn(columnIndex: number) {
    return $$(
      `(//div[@data-testid='${HelpTestId.SubcategoriesList}']/div)[${
        columnIndex + 1
      }]//div[@data-testid='${HelpTestId.SubcategoriesListItem}']`
    )
  }

  public get subCategoriesListItemsLeftColumn() {
    return this.getSubCategoriesListItemsFromColumn(0)
  }

  public get subCategoriesListItemsRightColumn() {
    return this.getSubCategoriesListItemsFromColumn(1)
  }

  public get contactSupportButton() {
    return $(
      `//button[@data-testid='${HelpTestId.MainFooterContactSupportButton}']`
    )
  }
}

export default new HelpPage()
