/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createSelector } from "reselect"
import { ReduxRootState, RootState } from "App/__deprecated__/renderer/store"
import { threadsSelector } from "App/messages/selectors/threads.selector"
import { getContactMapSelector } from "App/contacts/selectors/get-contact-map.selector"
import { Receiver } from "App/messages/reducers"
import { Thread } from "App/messages/dto"
import { PhoneContacts } from "App/contacts/reducers/contacts.interface"
import {
  mapContactsToReceivers,
  mapThreadsToReceivers,
} from "App/messages/helpers/threads.helpers"
import { isContactMatchingPhoneNumberId } from "App/contacts/helpers/is-contact-matching-phone-number/is-contact-matching-phone-number"

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
    ({ phoneNumberId }) =>
      !contacts.some((contact) => {
        return isContactMatchingPhoneNumberId(contact, phoneNumberId)
      })
  )
  const threadReceivers = mapThreadsToReceivers(uniqueThreadsReceivers)
  const contactReceivers = mapContactsToReceivers(contacts)
  return [...contactReceivers, ...threadReceivers]
})
