/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Page } from "./page"
import { formatMessage } from "app-localize/utils"

class NewsPage extends Page {
  public get moreNewsButton() {
    return $(`a*=${formatMessage({ id: "page.news.headerButton.text" })}`)
  }

  public get moreNewsButtonHref() {
    return $('a[href="https://www.mudita.com/#news"]')
  }

  public get newsCardElements() {
    return $$('[data-testid="news-card"]')
  }

  public get newsCardElement() {
    return $('[data-testid="news-card"]')
  }

  public get sidebarMenuActiveItem() {
    return $("[aria-current=page]")
  }

  public get sidebarMenuActiveItemText() {
    return $("[aria-current=page] p")
  }
}

export default new NewsPage()
