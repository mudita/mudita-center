/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { faker } from "@faker-js/faker"
import { groupBy, random, times } from "lodash"
import { Message, Thread } from "Core/messages/dto"
import { MessageType } from "Core/messages/constants/message-type.constant"
import { createFakeContact } from "Core/messages/helpers/create-fake-contact"

const createMessage = ({ id }: Thread): Message => {
  return {
    id: faker.datatype.uuid(),
    date: faker.date.past(),
    content: faker.lorem.sentences(2),
    threadId: id,
    phoneNumber: id,
    messageType: faker.datatype.boolean()
      ? MessageType.OUTBOX
      : MessageType.INBOX,
  }
}

const createThread = (): Thread => {
  const contact = createFakeContact()
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const threadId = contact.primaryPhoneNumber!
  return {
    id: threadId,
    phoneNumber: threadId,
    unread: faker.datatype.boolean(),
    lastUpdatedAt: faker.date.past(),
    messageSnippet: faker.lorem.paragraphs(random(1, 3)),
    messageType: faker.datatype.boolean()
      ? MessageType.OUTBOX
      : MessageType.INBOX,
    contactId: undefined,
    contactName: undefined,
  }
}

export const rowThreads: Thread[] = times(random(15, 25), createThread)
export const rowMessages: Message[] = rowThreads.reduce((prev, thread) => {
  return [...prev, ...times(random(1, 5), () => createMessage(thread))]
}, [] as Message[])

export const basicRows = Array.from({
  length: Math.round(15 + Math.random() * 25),
}).map(() => {
  const firstName = faker.name.firstName()
  return {
    firstName,
    lastName: faker.name.lastName(),
    phoneNumber: faker.phone.number(),
    address: {
      zip: faker.address.zipCode(),
      city: faker.address.city(),
      country: faker.address.country(),
    },
  }
})

export const nestedRows = [
  {
    fileType: "Messages",
    lastBackup: faker.date.past(),
    size: `${faker.datatype.number(64)}.${faker.datatype.number(
      9
    )}${faker.datatype.number(9)} MB`,
  },
  {
    fileType: "Contacts",
    lastBackup: faker.date.past(),
    size: `${faker.datatype.number(64)}.${faker.datatype.number(
      9
    )}${faker.datatype.number(9)} MB`,
  },
  {
    fileType: "Files",
    lastBackup: faker.date.past(),
    size: `${faker.datatype.number(64)}.${faker.datatype.number(
      9
    )}${faker.datatype.number(9)} MB`,
    _children: [
      {
        fileType: "Music files",
        lastBackup: faker.date.past(),
        size: `${faker.datatype.number(64)}.${faker.datatype.number(
          9
        )}${faker.datatype.number(9)} MB`,
      },
      {
        fileType: "Recorded files",
        lastBackup: faker.date.past(),
        size: `${faker.datatype.number(64)}.${faker.datatype.number(
          9
        )}${faker.datatype.number(9)} MB`,
      },
      {
        fileType: "Storage files",
        lastBackup: faker.date.past(),
        size: `${faker.datatype.number(64)}.${faker.datatype.number(
          9
        )}${faker.datatype.number(9)} MB`,
      },
    ],
  },
  {
    fileType: "Notes",
    lastBackup: faker.date.past(),
    size: `${faker.datatype.number(64)}.${faker.datatype.number(
      9
    )}${faker.datatype.number(9)} MB`,
  },
  {
    fileType: "Meditation timer data",
    lastBackup: faker.date.past(),
    size: `${faker.datatype.number(64)}.${faker.datatype.number(
      9
    )}${faker.datatype.number(9)} MB`,
  },
]

export const sortedBasicRows = [...basicRows].sort((a, b) => {
  return a.firstName > b.firstName ? 1 : -1
})

export const labeledRows = groupBy(sortedBasicRows, (row) =>
  row.firstName.charAt(0)
)
