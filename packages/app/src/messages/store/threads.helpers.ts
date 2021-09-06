/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  Message,
  MessagesState as MessagesProps,
  Receiver,
  ReceiverIdentification,
  Thread,
  VisibilityFilter,
} from "App/messages/store/messages.interface"
import { Contact, ContactID } from "App/contacts/store/contacts.type"

export const searchThreads = (
  threads: Thread[] = [],
  contactMap: Record<ContactID, Contact>,
  searchValue: MessagesProps["searchValue"]
) => {
  if (searchValue.length) {
    return threads?.filter(({ contactId, phoneNumber }) => {
      const search = searchValue.toLowerCase()
      const matchesForename = contactMap[contactId]?.firstName
        ?.toLowerCase()
        .includes(search)
      const matchesSurname = contactMap[contactId]?.lastName
        ?.toLowerCase()
        .includes(search)
      const matchesPhone = phoneNumber?.includes(search)

      return matchesForename || matchesSurname || matchesPhone
    })
  } else {
    return threads
  }
}

export const filterThreads = (
  threads: Thread[],
  visibilityFilter: MessagesProps["visibilityFilter"]
) =>
  threads?.filter(({ unread }) =>
    visibilityFilter === VisibilityFilter.Unread ? unread : true
  )

export const sortThreads = (threads: Thread[]) => {
  return threads?.sort((a, b) => {
    const x = a.lastUpdatedAt
    const y = b.lastUpdatedAt
    return x > y ? -1 : x < y ? 1 : 0
  })
}

export const sortMessages = (messages: Message[]): Message[] => {
  return messages.sort((a, b) => {
    return new Date(a.date).getTime() - new Date(b.date).getTime()
  })
}

export const mapThreadsToReceivers = (threads: Thread[]): Receiver[] => {
  return threads.map(({ contactId, phoneNumber }) => ({
    phoneNumber,
    contactId,
    identification: ReceiverIdentification.unknown,
  }))
}

const isPhoneNumberValid = (phoneNumber = ""): phoneNumber is string => {
  return phoneNumber !== ""
}

export const mapContactsToReceivers = (contacts: Contact[]): Receiver[] => {
  return contacts
    .map(
      ({
        primaryPhoneNumber,
        secondaryPhoneNumber,
        id,
        firstName = "",
        lastName = "",
      }) => {
        const contact = {
          contactId: id,
          firstName,
          lastName,
        }
        if (
          isPhoneNumberValid(primaryPhoneNumber) &&
          isPhoneNumberValid(secondaryPhoneNumber)
        ) {
          return [
            {
              phoneNumber: primaryPhoneNumber,
              identification: ReceiverIdentification.primary,
              ...contact,
            },
            {
              phoneNumber: secondaryPhoneNumber,
              identification: ReceiverIdentification.secondary,
              ...contact,
            },
          ]
        } else if (isPhoneNumberValid(primaryPhoneNumber)) {
          return [
            {
              phoneNumber: primaryPhoneNumber,
              identification: ReceiverIdentification.primary,
              ...contact,
            },
          ]
        } else if (isPhoneNumberValid(secondaryPhoneNumber)) {
          return [
            {
              phoneNumber: secondaryPhoneNumber,
              identification: ReceiverIdentification.secondary,
              ...contact,
            },
          ]
        } else {
          return [
            {
              phoneNumber: "",
              identification: ReceiverIdentification.unknown,
              ...contact,
            },
          ]
        }
      }
    )
    .reduce((flat, prev) => [...prev, ...flat], [])
}
