/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createSelector } from "reselect"
import { ReduxRootState } from "Renderer/store"
import { getContactMapSelector } from "App/messages/selectors/filtered-threads.selector"
import { threadsSelector } from "App/messages/selectors/threads.selector"
import { Receiver, Thread } from "App/messages/reducers"
import { PhoneContacts } from "App/contacts/store/contacts.interface"
import {
  mapContactsToReceivers,
  mapThreadsToReceivers,
} from "App/messages/helpers/threads.helpers"

export const getReceiversSelector = createSelector<
  ReduxRootState,
  Thread[],
  PhoneContacts["db"],
  Receiver[]
>([threadsSelector, getContactMapSelector], (threads, contactMap) => {
  const contactIds = Object.keys(contactMap)
  const uniqueThreadsReceivers = threads.filter(
    ({ contactId }) => !contactIds.includes(contactId)
  )
  const threadReceivers = mapThreadsToReceivers(uniqueThreadsReceivers)
  const contactReceivers = mapContactsToReceivers(
    Object.keys(contactMap).map((key) => contactMap[key])
  )
  return [...contactReceivers, ...threadReceivers]
})
