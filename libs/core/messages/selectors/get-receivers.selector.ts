/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createSelector } from "reselect"
import { ReduxRootState, RootState } from "Core/__deprecated__/renderer/store"
import { threadsSelector } from "Core/messages/selectors/threads.selector"
import { getContactMapSelector } from "Core/contacts/selectors/get-contact-map.selector"
import { Receiver } from "Core/messages/reducers"
import { Thread } from "Core/messages/dto"
import { PhoneContacts } from "Core/contacts/reducers/contacts.interface"
import {
  mapContactsToReceivers,
  mapThreadsToReceivers,
} from "Core/messages/helpers/threads.helpers"
import { isContactMatchingPhoneNumber } from "Core/contacts/helpers/is-contact-matching-phone-number/is-contact-matching-phone-number"
import { sortByLastNameAscending } from "Core/utils/sort-by-last-name-ascending"

export const getReceiversSelector = createSelector<
  RootState & ReduxRootState,
  Thread[],
  PhoneContacts["db"],
  Receiver[]
>([threadsSelector, getContactMapSelector], (threads, contactMap) => {
  const contacts = Object.keys(contactMap).map((key) => {
    return contactMap[key]
  })
  const uniqueThreadsReceivers = threads.filter(
    ({ phoneNumber }) =>
      !contacts.some((contact) => {
        return isContactMatchingPhoneNumber(contact, phoneNumber)
      })
  )
  const threadReceivers = mapThreadsToReceivers(uniqueThreadsReceivers)
  const contactReceivers = mapContactsToReceivers(contacts)

  return [...contactReceivers, ...threadReceivers].sort(sortByLastNameAscending)
})
