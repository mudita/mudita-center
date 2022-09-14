/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { faker } from "@faker-js/faker"
import { groupBy, random, sample, times } from "lodash"
import {
  Call,
  CallStatus,
} from "App/__deprecated__/renderer/models/calls/calls.interface"
import { resolveCallType } from "App/__deprecated__/renderer/components/rest/calls/call-details.helpers"
import { Message, Thread } from "App/messages/dto"
import { MessageType } from "App/messages/constants/message-type.constant"
import { createFakeContact } from "App/messages/helpers/create-fake-contact"

const createCall = (): Call => {
  const status = sample([
    CallStatus.Missed,
    CallStatus.Incoming,
    CallStatus.Outgoing,
    CallStatus.Conference,
  ]) as CallStatus
  return {
    id: faker.datatype.uuid(),
    caller: {
      id: faker.datatype.uuid(),
      firstName: Math.random() < 0.6 ? faker.name.firstName() : "",
      lastName: Math.random() < 0.6 ? faker.name.lastName() : "",
      phoneNumber: faker.phone.number("+## ### ### ###"),
    },
    duration: status === CallStatus.Missed ? 0 : faker.datatype.number(500),
    date: Math.random() < 0.6 ? faker.date.past() : faker.date.recent(),
    status,
    ...resolveCallType(status),
    timesMissed:
      status === CallStatus.Missed
        ? faker.datatype.number({
            min: 2,
            max: 20,
          })
        : 0,
  }
}

export const calls = times(random(5, 15), createCall)
export const unknownCalls = calls.map(
  ({ caller: { id, phoneNumber }, ...rest }) => ({
    caller: { id, phoneNumber },
    ...rest,
  })
)

const createText = () => ({
  id: faker.datatype.uuid(),
  content: faker.lorem.paragraphs(random(1, 3)),
})

export const templates = times(random(15, 25), createText)

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
