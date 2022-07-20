/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { NewsEntry } from "App/news/dto"

export const sortByCreationDateInDescendingOrder = (newsItems: NewsEntry[]) => {
  return [...newsItems].sort((firstId, secondId) => {
    return (
      Number(new Date(secondId.createdAt)) - Number(new Date(firstId.createdAt))
    )
  })
}
