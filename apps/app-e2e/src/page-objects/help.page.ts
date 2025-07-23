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

  public get categoriesTitle() {
    return $(`//h2[@data-testid='${HelpTestId.CategoriesTitle}']`)
  }

  public get categoriesListItems() {
    return $$(`//a[@data-testid='${HelpTestId.CategoriesListItem}']`)
  }

  public get contactSupportButton() {
    return $(
      `//button[@data-testid='${HelpTestId.MainFooterContactSupportButton}']`
    )
  }
}

export default new HelpPage()
