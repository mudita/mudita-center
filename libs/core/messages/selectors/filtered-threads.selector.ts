/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createSelector } from "reselect"
import { Thread } from "Core/messages/dto"
import { VisibilityFilter } from "Core/messages/constants"
import { ReduxRootState, RootState } from "Core/__deprecated__/renderer/store"
import { threadsSelector } from "Core/messages/selectors/threads.selector"
import {
  filterThreads,
  searchThreads,
  sortThreads,
} from "Core/messages/helpers/threads.helpers"
import { searchValueSelector } from "Core/messages/selectors/search-value.selector"
import { PhoneContacts } from "Core/contacts/reducers/contacts.interface"
import { visibilityFilterSelector } from "Core/messages/selectors/visibility-filter.selector"
import { getContactMapSelector } from "Core/contacts/selectors/get-contact-map.selector"

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
