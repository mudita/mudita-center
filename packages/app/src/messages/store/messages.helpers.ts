/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import { Contact } from "App/contacts/store/contacts.type"
import {
  Message,
  MessagesInThreads,
  MessagesState,
  NormalizedObjects,
  Thread,
} from "App/messages/store/messages.interface"

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
  messages: MessagesState
  contacts: { db: ContactsCollection }
}): Thread[] => {
  const {
    messages: { threads, messages, messagesInThreads },
    contacts: { db: baseContacts },
  } = state

  return Object.keys(threads.byId).map(
    (key: string): Thread => {
      const messagesInThread = messagesInThreads[key]
      const thread = {
        ...threads.byId[key],
        messages: messagesInThread.map((id) => messages.byId[id]),
      }
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

export const updateNormalizeMessages = (
  prevNormalizeMessages: NormalizedObjects<Message>,
  messages: Message[]
): NormalizedObjects<Message> => {
  return messages.reduce((prev, thread) => {
    prev.byId[thread.id] = thread
    prev.allIds.push(thread.id)

    return prev
  }, prevNormalizeMessages)
}

export const updateNormalizeThreads = (
  prevNormalizeThreads: NormalizedObjects<Thread>,
  threads: Thread[]
): NormalizedObjects<Thread> => {
  return threads.reduce((prev, thread) => {
    prev.byId[thread.id] = thread
    prev.allIds.push(thread.id)

    return prev
  }, prevNormalizeThreads)
}

export const updateMessagesInThreads = (
  prevMessagesInThreads: MessagesInThreads,
  messages: Message[]
): MessagesInThreads => {
  return messages.reduce((prev, message) => {
    const prevMessagesInThread = prev[message.threadID] ?? []
    prevMessagesInThread.push(message.id)
    prev[message.threadID] = prevMessagesInThread
    return prev
  }, prevMessagesInThreads)
}
