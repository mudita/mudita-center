/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { NewsEntry } from "App/news/dto"
import { sortByCreationDateInDescendingOrder } from "App/news/helpers"
import { NewsState } from "App/news/reducers"
import { newsStateSelector } from "App/news/selectors/news-state/news-state.selector"
import { ReduxRootState } from "App/__deprecated__/renderer/store"
import { createSelector } from "reselect"

export const newsSortedByCreationDateSelector = createSelector<
  ReduxRootState,
  NewsState,
  NewsEntry[]
>(newsStateSelector, (state) => {
  return sortByCreationDateInDescendingOrder(state.newsItems)
})
