/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { NewsData } from "news/models"

export const sortByDateInDescendingOrder = (newsItems: NewsData[]) => {
  return [...newsItems].sort((firstId, secondId) => {
    return Number(new Date(secondId.date)) - Number(new Date(firstId.date))
  })
}
