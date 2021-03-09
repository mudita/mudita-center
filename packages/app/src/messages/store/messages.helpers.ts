/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import { Contact } from "App/contacts/store/contacts.type"
import { Thread } from "App/messages/store/messages.interface"

export type ContactsCollection = Record<string, Contact>
export type Getter = (
  id: string,
  collection: ContactsCollection
) => Contact | undefined

export const getContactDetails = (
  id: string,
  collection: ContactsCollection
): Contact | undefined => {
  if (id in collection) {
    return collection[id]
  }

  return undefined
}

export const expandThread = (
  thread: Thread,
  collection: ContactsCollection,
  getter: Getter
) => {
  const { messages } = thread

  return {
    ...thread,
    messages: messages.map((msg) => {
      const author = getter(msg.author.id, collection)

      if (author) {
        return {
          ...msg,
          author,
        }
      }

      return msg
    }),
  }
}

export const createFullMessagesCollection = (state: {
  messages: { threads: Thread[] }
  contacts: { db: ContactsCollection }
}): Thread[] => {
  const {
    messages: { threads },
    contacts: { db: baseContacts },
  } = state

  return threads.map(
    (thread: Thread): Thread => {
      const { id, phoneNumber } = thread.caller

      const contact: Contact = baseContacts[id]

      if (contact) {
        const { firstName, lastName, secondaryPhoneNumber } = contact

        return {
          ...expandThread(thread, baseContacts, getContactDetails),
          caller: {
            id,
            phoneNumber,
            firstName,
            lastName,
            secondaryPhoneNumber,
          },
        }
      }

      return thread
    }
  )
}
