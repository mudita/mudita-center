/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createSelector } from "reselect"
import { MessagesState } from "Core/messages/reducers"
import { VisibilityFilter } from "Core/messages/constants"
import { messagesStateSelector } from "Core/messages/selectors/messages-state.selector"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"

export const visibilityFilterSelector = createSelector<
  ReduxRootState,
  MessagesState,
  VisibilityFilter
>(messagesStateSelector, ({ data: { visibilityFilter } }) => visibilityFilter)
