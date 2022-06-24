/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createSelector } from "reselect"
import { MessagesState, VisibilityFilter } from "App/messages/reducers"
import { messagesStateSelector } from "App/messages/selectors/messages-state.selector"
import { ReduxRootState } from "App/__deprecated__/renderer/store"

export const visibilityFilterSelector = createSelector<
  ReduxRootState,
  MessagesState,
  VisibilityFilter
>(messagesStateSelector, ({ visibilityFilter }) => visibilityFilter)
