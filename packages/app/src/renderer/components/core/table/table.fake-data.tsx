/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import Faker from "faker"
import { groupBy, random, sample, times } from "lodash"
import { Call, Caller, CallStatus } from "Renderer/models/calls/calls.interface"
import { resolveCallType } from "Renderer/components/rest/calls/call-details.helpers"

const createCall = (): Call => {
  const status = sample([
    CallStatus.Missed,
    CallStatus.Incoming,
    CallStatus.Outgoing,
    CallStatus.Conference,
  ]) as CallStatus
  return {
    id: Faker.random.uuid(),
    caller: {
      id: Faker.random.uuid(),
      firstName: Math.random() < 0.6 ? Faker.name.firstName() : "",
      lastName: Math.random() < 0.6 ? Faker.name.lastName() : "",
      phoneNumber: Faker.phone.phoneNumber("+## ### ### ###"),
    },
    duration: status === CallStatus.Missed ? 0 : Faker.random.number(500),
    date: Math.random() < 0.6 ? Faker.date.past() : Faker.date.recent(),
    status,
    ...resolveCallType(status),
    timesMissed:
      status === CallStatus.Missed
        ? Faker.random.number({
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
  id: Faker.random.uuid(),
  content: Faker.lorem.paragraphs(random(1, 3)),
})

export const templates = times(random(15, 25), createText)

const generateEmptyCaller = (): Caller => ({
  id: Faker.random.uuid(),
  firstName: "",
  lastName: "",
  phoneNumber: Faker.phone.phoneNumber("+## ### ### ###"),
})

const createCaller = (): Caller => generateEmptyCaller()

const createMessages = ({ id }: Caller) => {
  const interlocutor = Faker.random.boolean()
  return {
    author: interlocutor
      ? { id }
      : {
          id: "123",
        },
    id: Faker.random.uuid(),
    date: Faker.date.past(),
    content: Faker.lorem.sentences(2),
    interlocutor,
  }
}

const createTopic = () => {
  const caller = createCaller()
  const createMessagesWithAuthor = () => createMessages(caller)
  return {
    id: Faker.random.uuid(),
    caller,
    unread: Faker.random.boolean(),
    messages: times(random(5, 15), createMessagesWithAuthor),
  }
}

export const rowsMessages = times(random(15, 25), createTopic)

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
    size: `${Faker.random.number(64)}.${Faker.random.number(
      9
    )}${Faker.random.number(9)} MB`,
  },
  {
    fileType: "Contacts",
    lastBackup: Faker.date.past(),
    size: `${Faker.random.number(64)}.${Faker.random.number(
      9
    )}${Faker.random.number(9)} MB`,
  },
  {
    fileType: "Files",
    lastBackup: Faker.date.past(),
    size: `${Faker.random.number(64)}.${Faker.random.number(
      9
    )}${Faker.random.number(9)} MB`,
    _children: [
      {
        fileType: "Music files",
        lastBackup: Faker.date.past(),
        size: `${Faker.random.number(64)}.${Faker.random.number(
          9
        )}${Faker.random.number(9)} MB`,
      },
      {
        fileType: "Recorded files",
        lastBackup: Faker.date.past(),
        size: `${Faker.random.number(64)}.${Faker.random.number(
          9
        )}${Faker.random.number(9)} MB`,
      },
      {
        fileType: "Storage files",
        lastBackup: Faker.date.past(),
        size: `${Faker.random.number(64)}.${Faker.random.number(
          9
        )}${Faker.random.number(9)} MB`,
      },
    ],
  },
  {
    fileType: "Notes",
    lastBackup: Faker.date.past(),
    size: `${Faker.random.number(64)}.${Faker.random.number(
      9
    )}${Faker.random.number(9)} MB`,
  },
  {
    fileType: "Meditation timer data",
    lastBackup: Faker.date.past(),
    size: `${Faker.random.number(64)}.${Faker.random.number(
      9
    )}${Faker.random.number(9)} MB`,
  },
]

export const sortedBasicRows = [...basicRows].sort((a, b) => {
  return a.firstName > b.firstName ? 1 : -1
})

export const labeledRows = groupBy(sortedBasicRows, (row) =>
  row.firstName.charAt(0)
)
