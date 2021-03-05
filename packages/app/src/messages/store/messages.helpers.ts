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

    // @ts-ignore
    prev.allIds = [...new Set(prev.allIds)]

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
      // @ts-ignore
    const newMessagesInThread = [...new Set(prevMessagesInThread)];
    prev[message.threadId] = newMessagesInThread
    return prev
  }, prevMessagesInThreads)
}
