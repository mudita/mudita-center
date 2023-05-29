/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createSelector } from "reselect"
import { Thread } from "App/messages/dto"
import { VisibilityFilter } from "App/messages/constants"
import { ReduxRootState, RootState } from "App/__deprecated__/renderer/store"
import { threadsSelector } from "App/messages/selectors/threads.selector"
import {
  filterThreads,
  sortThreads,
} from "App/messages/helpers/threads.helpers"
import { visibilityFilterSelector } from "App/messages/selectors/visibility-filter.selector"

export const filteredThreadsSelector = createSelector<
  RootState & ReduxRootState,
  Thread[],
  VisibilityFilter,
  Thread[]
>([threadsSelector, visibilityFilterSelector], (threads, visibilityFilter) => {
  const list = filterThreads(threads, visibilityFilter)
  const result = sortThreads(list)

  return result
})
