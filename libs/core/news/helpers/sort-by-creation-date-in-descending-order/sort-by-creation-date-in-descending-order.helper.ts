/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { NewsEntry } from "Core/news/dto"

// AUTO DISABLED - fix me if you like :)
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const sortByDateInDescendingOrder = (newsItems: NewsEntry[]) => {
  return [...newsItems].sort((firstId, secondId) => {
    return Number(new Date(secondId.date)) - Number(new Date(firstId.date))
  })
}
