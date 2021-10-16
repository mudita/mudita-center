/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createSelector } from "reselect"
import { MessagesState, Thread, VisibilityFilter } from "App/messages/reducers"
import { messagesStateSelector } from "App/messages/selectors/messages-state.selector"
import { ReduxRootState } from "Renderer/store"
import { threadsSelector } from "App/messages/selectors/threads.selector"
import {
  filterThreads,
  searchThreads,
  sortThreads,
} from "App/messages/helpers/threads.helpers"
import { searchValueSelector } from "App/messages/selectors/search-value.selector"
import { PhoneContacts } from "App/contacts/store/contacts.interface"
import { visibilityFilterSelector } from "App/messages/selectors/visibility-filter.selector"

// TODO: write getContactMapSelector
export const getContactMapSelector = createSelector<
  ReduxRootState,
  MessagesState,
  PhoneContacts["db"]
>(messagesStateSelector, ({ threadMap }) => {
  return {}
})

export const filteredThreadsSelector = createSelector<
  ReduxRootState,
  Thread[],
  PhoneContacts["db"],
  string,
  VisibilityFilter,
  Thread[]
>(
  [
    threadsSelector,
    getContactMapSelector,
    searchValueSelector,
    visibilityFilterSelector,
  ],
  (threads, contactMap, searchValue, visibilityFilter) => {
    let list = searchThreads(threads, contactMap, searchValue)
    list = filterThreads(list, visibilityFilter)
    return sortThreads(list)
  }
)
