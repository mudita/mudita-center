/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import { Contact } from "App/contacts/store/contacts.type"
import {
  Message,
  MessagesInThreads,
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

// export const createFullMessagesCollection = (state: {
//   messages: MessagesState
//   contacts: { db: ContactsCollection }
// }): Thread[] => {
//   const {
//     messages: { threads, messages, messagesInThreads },
//     contacts: { db: baseContacts },
//   } = state
//
//   return Object.keys(threads.byId).map(
//     (key: string): Thread => {
//       const messagesInThread = messagesInThreads[key]
//       const thread = {
//         ...threads.byId[key],
//         messages: messagesInThread.map((id) => messages.byId[id]),
//       }
//       const id = thread.contactId
//       const phoneNumber = thread.id
//
//   const contact: Contact = baseContacts[id]
//
//       if (contact) {
//         const { firstName, lastName, secondaryPhoneNumber } = contact
//
//         return {
//           ...thread,
//           caller: {
//             id,
//             phoneNumber,
//             firstName,
//             lastName,
//             secondaryPhoneNumber,
//           },
//         }
//       }
//
//       return thread
//     }
//   )
// }

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
    const prevMessagesInThread = prev[message.threadId] ?? []
    prevMessagesInThread.push(message.id)
    prev[message.threadId] = prevMessagesInThread
    return prev
  }, prevMessagesInThreads)
}
