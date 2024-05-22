/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { NewsEntry } from "Core/news/dto"
import { sortByDateInDescendingOrder } from "Core/news/helpers"
import { NewsState } from "Core/news/reducers"
import { newsStateSelector } from "Core/news/selectors/news-state/news-state.selector"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import { createSelector } from "reselect"

export const newsSortedByCreationDateSelector = createSelector<
  ReduxRootState,
  NewsState,
  NewsEntry[]
>(newsStateSelector, (state) => {
  return sortByDateInDescendingOrder(state.newsItems)
})
