/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import { NewsEntry } from "Renderer/models/mudita-news/mudita-news.interface"

export const sortByCreationDateInDescendingOrder = (newsItems: NewsEntry[]) => {
  return newsItems.sort((firstId, secondId) => {
    return (
      Number(new Date(secondId.createdAt)) - Number(new Date(firstId.createdAt))
    )
  })
}
