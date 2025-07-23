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

  public get iconSearch() {
    return $("//span[@data-testid='icon-search']")
  }

  public get searchInput() {
    return $(`//input[@data-testid='${HelpTestId.SearchInput}']`)
  }

  public get searchResults() {
    return $(`//div[@data-testid='${HelpTestId.SearchResults}']`)
  }

  public get searchResultsItems() {
    return $$(`//a[@data-testid='${HelpTestId.SearchResultsItem}']`)
  }

  public get categoriesTitle() {
    return $(`//h2[@data-testid='${HelpTestId.CategoriesTitle}']`)
  }

  public get categoriesList() {
    return $(`//nav[@data-testid='${HelpTestId.CategoriesList}']`)
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

  public async searchForArticle(text: string) {
    const searchInput = await this.searchInput
    await searchInput.setValue(text)
  }
}

export default new HelpPage()
