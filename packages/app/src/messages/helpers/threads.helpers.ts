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
import { isContactMatchingPhoneNumberId } from "App/contacts/helpers/is-contact-matching-phone-number/is-contact-matching-phone-number"
import { phoneNumberRegexp } from "App/__deprecated__/renderer/utils/form-validators"

// AUTO DISABLED - fix me if you like :)
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const searchThreads = (
  threads: Thread[] = [],
  contactMap: Record<ContactID, Contact>,
  searchValue: MessagesProps["data"]["searchValue"]
) => {
  if (searchValue.length) {
    return threads?.filter(({ phoneNumberId }) => {
      const search = searchValue.toLowerCase()
      const contacts = Object.keys(contactMap).map((key) => {
        return contactMap[key]
      })
      const contact = contacts.find((contact) => {
        return isContactMatchingPhoneNumberId(contact, phoneNumberId)
      })
      const matchesForename = contact?.firstName?.toLowerCase().includes(search)
      const matchesSurname = contact?.lastName?.toLowerCase().includes(search)
      //TODO CP-1873
      // const matchesPhone = phoneNumber?.includes(search)

      return matchesForename || matchesSurname // || matchesPhone
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
  return threads.map(({ phoneNumberId }) => ({
    phoneNumberId,
    identification: ReceiverIdentification.unknown,
  }))
}

const isContactWithAnyNumber = (contact: Contact): contact is Contact => {
  return (
    isPhoneNumberNotEmpty(contact.primaryPhoneNumberId) ||
    isPhoneNumberNotEmpty(contact.secondaryPhoneNumberId)
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
        primaryPhoneNumberId = "",
        secondaryPhoneNumberId = "",
        firstName = "",
        lastName = "",
      }) => {
        const contact = {
          firstName,
          lastName,
        }
        if (
          isPhoneNumberNotEmpty(primaryPhoneNumberId) &&
          isPhoneNumberNotEmpty(secondaryPhoneNumberId)
        ) {
          return [
            {
              phoneNumberId: primaryPhoneNumberId,
              identification: ReceiverIdentification.primary,
              ...contact,
            },
            {
              phoneNumberId: secondaryPhoneNumberId,
              identification: ReceiverIdentification.secondary,
              ...contact,
            },
          ]
        } else if (isPhoneNumberNotEmpty(primaryPhoneNumberId)) {
          return [
            {
              phoneNumberId: primaryPhoneNumberId,
              identification: ReceiverIdentification.unknown,
              ...contact,
            },
          ]
        } else {
          return [
            {
              phoneNumberId: secondaryPhoneNumberId,
              identification: ReceiverIdentification.unknown,
              ...contact,
            },
          ]
        }
      }
    )
    .reduce((flat, prev) => [...prev, ...flat], [])
}
