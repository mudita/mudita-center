/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Contact } from "App/contacts/reducers/contacts.interface"
import { TextEncoder } from "util"

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

type MessageWithSizeInBytes = { letters: string[]; currentSize: number }

export const splitMessageByBytesSize = (
  message: string,
  expectedMessageByteSize: number
): string[] => {
  const messages: MessageWithSizeInBytes[] = [
    {
      letters: [],
      currentSize: 0,
    },
  ]

  // has to be done with for-of, it really iterates over the letter
  // with e.g. for loop it can treat special chars like two chars (e.g. 𐍈 = '\ud800', '\udf48')
  for (const currentChar of message) {
    const letterSize = getStringSizeInBytes(currentChar)
    const currentMessageIndex = messages.length - 1
    const shouldCreateNewMessage =
      messages[currentMessageIndex].currentSize + letterSize >
      expectedMessageByteSize

    if (shouldCreateNewMessage) {
      messages.push({
        letters: [],
        currentSize: 0,
      })
    }

    const newCurrentMessageIndex = messages.length - 1
    messages[newCurrentMessageIndex] = {
      currentSize: messages[newCurrentMessageIndex].currentSize + letterSize,
      letters: [...messages[newCurrentMessageIndex].letters, currentChar],
    }
  }

  return messages.map((message) => message.letters.join(""))
}

export const getStringSizeInBytes = (content: string) => {
  return new TextEncoder().encode(content).length
}
