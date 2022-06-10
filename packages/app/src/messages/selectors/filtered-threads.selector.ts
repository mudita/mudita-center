/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createSelector } from "reselect"
import { Thread, VisibilityFilter } from "App/messages/reducers"
import { ReduxRootState, RootState } from "App/__deprecated__/renderer/store"
import { threadsSelector } from "App/messages/selectors/threads.selector"
import {
  filterThreads,
  searchThreads,
  sortThreads,
} from "App/messages/helpers/threads.helpers"
import { searchValueSelector } from "App/messages/selectors/search-value.selector"
import { PhoneContacts } from "App/contacts/reducers/contacts.interface"
import { visibilityFilterSelector } from "App/messages/selectors/visibility-filter.selector"
import { getContactMapSelector } from "App/contacts/selectors/get-contact-map.selector"

export const filteredThreadsSelector = createSelector<
  RootState & ReduxRootState,
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
