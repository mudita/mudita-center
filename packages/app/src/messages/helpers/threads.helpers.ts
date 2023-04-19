/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  MessagesState as MessagesProps,
  Receiver,
  ReceiverIdentification,
} from "App/messages/reducers/messages.interface"
import { Message, Thread } from "App/messages/dto"
import { VisibilityFilter } from "App/messages/constants"
import { Contact, ContactID } from "App/contacts/reducers/contacts.interface"
import { isContactMatchingPhoneNumber } from "App/contacts/helpers/is-contact-matching-phone-number/is-contact-matching-phone-number"
import { phoneNumberRegexp } from "App/__deprecated__/renderer/utils/form-validators"

// AUTO DISABLED - fix me if you like :)
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const searchThreads = (
  threads: Thread[] = [],
  contactMap: Record<ContactID, Contact>,
  searchValue: MessagesProps["data"]["searchValue"]
) => {
  if (searchValue.length) {
    return threads?.filter(({ phoneNumber }) => {
      const search = searchValue.toLowerCase()
      const contacts = Object.keys(contactMap).map((key) => {
        return contactMap[key]
      })
      const contact = contacts.find((contact) => {
        return isContactMatchingPhoneNumber(contact, phoneNumber)
      })
      const matchesForename = contact?.firstName?.toLowerCase().includes(search)
      const matchesSurname = contact?.lastName?.toLowerCase().includes(search)
      const matchesPhone = phoneNumber?.includes(search)

      return matchesForename || matchesSurname || matchesPhone
    })
  } else {
    return threads
  }
}

// AUTO DISABLED - fix me if you like :)
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const filterThreads = (
  threads: Thread[],
  visibilityFilter: MessagesProps["data"]["visibilityFilter"]
) =>
  threads?.filter(({ unread }) =>
    visibilityFilter === VisibilityFilter.Unread ? unread : true
  )

// AUTO DISABLED - fix me if you like :)
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
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
  return threads.map(({ phoneNumber }) => ({
    phoneNumber,
    identification: ReceiverIdentification.unknown,
  }))
}

const isContactWithAnyNumber = (
  contact: Contact
): contact is
  | (Contact & { primaryPhoneNumber: string })
  | (Contact & { secondaryPhoneNumber: string }) => {
  return (
    isPhoneNumberNotEmpty(contact.primaryPhoneNumber) ||
    isPhoneNumberNotEmpty(contact.secondaryPhoneNumber)
  )
}

const isPhoneNumberNotEmpty = (phoneNumber = ""): phoneNumber is string => {
  return phoneNumber !== ""
}

export const isPhoneNumberValid = (phoneNumber: string): boolean => {
  return phoneNumberRegexp.test(phoneNumber)
}

export const mapContactsToReceivers = (contacts: Contact[]): Receiver[] => {
  return contacts
    .filter(isContactWithAnyNumber)
    .map(
      ({
        primaryPhoneNumber = "",
        secondaryPhoneNumber = "",
        firstName = "",
        lastName = "",
      }) => {
        const contact = {
          firstName,
          lastName,
        }
        if (
          isPhoneNumberNotEmpty(primaryPhoneNumber) &&
          isPhoneNumberNotEmpty(secondaryPhoneNumber)
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
        } else if (isPhoneNumberNotEmpty(primaryPhoneNumber)) {
          return [
            {
              phoneNumber: primaryPhoneNumber,
              identification: ReceiverIdentification.unknown,
              ...contact,
            },
          ]
        } else {
          return [
            {
              phoneNumber: secondaryPhoneNumber,
              identification: ReceiverIdentification.unknown,
              ...contact,
            },
          ]
        }
      }
    )
    .reduce((flat, prev) => [...prev, ...flat], [])
}
