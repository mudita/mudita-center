/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { NewsItem } from "news/models"

export const sortByDateInDescendingOrder = (newsItems: NewsItem[]) => {
  return newsItems.sort((a, b) => {
    return Number(new Date(b.date)) - Number(new Date(a.date))
  })
}
