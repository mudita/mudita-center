/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import Faker from "faker"
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
    id: Faker.datatype.uuid(),
    caller: {
      id: Faker.datatype.uuid(),
      firstName: Math.random() < 0.6 ? Faker.name.firstName() : "",
      lastName: Math.random() < 0.6 ? Faker.name.lastName() : "",
      phoneNumber: Faker.phone.phoneNumber("+## ### ### ###"),
    },
    duration: status === CallStatus.Missed ? 0 : Faker.datatype.number(500),
    date: Math.random() < 0.6 ? Faker.date.past() : Faker.date.recent(),
    status,
    ...resolveCallType(status),
    timesMissed:
      status === CallStatus.Missed
        ? Faker.datatype.number({
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
  id: Faker.datatype.uuid(),
  content: Faker.lorem.paragraphs(random(1, 3)),
})

export const templates = times(random(15, 25), createText)

const createMessage = ({ id }: Thread): Message => {
  return {
    id: Faker.datatype.uuid(),
    date: Faker.date.past(),
    content: Faker.lorem.sentences(2),
    threadId: id,
    phoneNumber: id,
    messageType: Faker.datatype.boolean()
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
    unread: Faker.datatype.boolean(),
    lastUpdatedAt: Faker.date.past(),
    messageSnippet: Faker.lorem.paragraphs(random(1, 3)),
    messageType: Faker.datatype.boolean()
      ? MessageType.OUTBOX
      : MessageType.INBOX,
  }
}

export const rowThreads: Thread[] = times(random(15, 25), createThread)
export const rowMessages: Message[] = rowThreads.reduce((prev, thread) => {
  return [...prev, ...times(random(1, 5), () => createMessage(thread))]
}, [] as Message[])

export const basicRows = Array.from({
  length: Math.round(15 + Math.random() * 25),
}).map(() => {
  const firstName = Faker.name.firstName()
  return {
    firstName,
    lastName: Faker.name.lastName(),
    phoneNumber: Faker.phone.phoneNumber(),
    address: {
      zip: Faker.address.zipCode(),
      city: Faker.address.city(),
      country: Faker.address.country(),
    },
  }
})

export const nestedRows = [
  {
    fileType: "Messages",
    lastBackup: Faker.date.past(),
    size: `${Faker.datatype.number(64)}.${Faker.datatype.number(
      9
    )}${Faker.datatype.number(9)} MB`,
  },
  {
    fileType: "Contacts",
    lastBackup: Faker.date.past(),
    size: `${Faker.datatype.number(64)}.${Faker.datatype.number(
      9
    )}${Faker.datatype.number(9)} MB`,
  },
  {
    fileType: "Files",
    lastBackup: Faker.date.past(),
    size: `${Faker.datatype.number(64)}.${Faker.datatype.number(
      9
    )}${Faker.datatype.number(9)} MB`,
    _children: [
      {
        fileType: "Music files",
        lastBackup: Faker.date.past(),
        size: `${Faker.datatype.number(64)}.${Faker.datatype.number(
          9
        )}${Faker.datatype.number(9)} MB`,
      },
      {
        fileType: "Recorded files",
        lastBackup: Faker.date.past(),
        size: `${Faker.datatype.number(64)}.${Faker.datatype.number(
          9
        )}${Faker.datatype.number(9)} MB`,
      },
      {
        fileType: "Storage files",
        lastBackup: Faker.date.past(),
        size: `${Faker.datatype.number(64)}.${Faker.datatype.number(
          9
        )}${Faker.datatype.number(9)} MB`,
      },
    ],
  },
  {
    fileType: "Notes",
    lastBackup: Faker.date.past(),
    size: `${Faker.datatype.number(64)}.${Faker.datatype.number(
      9
    )}${Faker.datatype.number(9)} MB`,
  },
  {
    fileType: "Meditation timer data",
    lastBackup: Faker.date.past(),
    size: `${Faker.datatype.number(64)}.${Faker.datatype.number(
      9
    )}${Faker.datatype.number(9)} MB`,
  },
]

export const sortedBasicRows = [...basicRows].sort((a, b) => {
  return a.firstName > b.firstName ? 1 : -1
})

export const labeledRows = groupBy(sortedBasicRows, (row) =>
  row.firstName.charAt(0)
)
