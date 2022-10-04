/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { EventEmitter } from "events"
import elasticlunr from "elasticlunr"
import { DataIndex } from "App/index-storage/constants"
import { MessageType } from "App/messages/constants"
import { Thread, Message } from "App/messages/dto"
import { ThreadModel } from "App/messages/models/thread.model"
import { IndexFactory } from "App/index-storage/factories"

const eventEmitter = new EventEmitter()
const dataIndex = new IndexFactory().create()

const subject = new ThreadModel(dataIndex, eventEmitter)

let clearThreadIndex: () => void | undefined
let clearMessageIndex: () => void | undefined

const thread: Thread = {
  id: "1",
  phoneNumber: "+48 755 853 216",
  lastUpdatedAt: new Date("2020-06-01T13:53:27.087Z"),
  messageSnippet:
    "Exercitationem vel quasi doloremque. Enim qui quis quidem eveniet est corrupti itaque recusandae.",
  unread: true,
  messageType: MessageType.INBOX,
  contactId: undefined,
  contactName: undefined,
}

const messageOne: Message = {
  id: "1",
  date: new Date("2019-10-18T11:27:15.256Z"),
  content:
    "Adipisicing non qui Lorem aliqua officia laboris ad reprehenderit dolor mollit.",
  threadId: "1",
  phoneNumber: "+48 755 853 216",
  messageType: MessageType.INBOX,
}

const messageTwo: Message = {
  id: "2",
  date: new Date("2019-10-18T11:27:15.256Z"),
  content:
    "Adipisicing non qui Lorem aliqua officia laboris ad reprehenderit dolor mollit.",
  threadId: "2",
  phoneNumber: "+48 744 122 544",
  messageType: MessageType.INBOX,
}

const createThreadIndex = (records: Thread[]): (() => void) => {
  const threadIndex = elasticlunr<Thread>()
  threadIndex.setRef("id")
  threadIndex.addField("phoneNumber")
  threadIndex.addField("lastUpdatedAt")
  threadIndex.addField("messageSnippet")
  threadIndex.addField("unread")
  threadIndex.addField("messageType")

  records.forEach((record) => {
    threadIndex.addDoc(record)
  })

  dataIndex.set(DataIndex.Thread, threadIndex)

  return () => {
    dataIndex.delete(DataIndex.Thread)
  }
}

const createMessageIndex = (records: Message[]): (() => void) => {
  const messageIndex = elasticlunr<Message>()
  messageIndex.setRef("id")
  messageIndex.addField("phoneNumber")
  messageIndex.addField("date")
  messageIndex.addField("content")
  messageIndex.addField("threadId")
  messageIndex.addField("messageType")

  records.forEach((record) => {
    messageIndex.addDoc(record)
  })

  dataIndex.set(DataIndex.Message, messageIndex)

  return () => {
    dataIndex.delete(DataIndex.Message)
  }
}

describe("Method: afterDelete", () => {
  beforeAll(() => {
    clearThreadIndex = createThreadIndex([thread])
    clearMessageIndex = createMessageIndex([messageOne, messageTwo])
  })

  afterAll(() => {
    clearThreadIndex()
    clearMessageIndex()
  })

  test("`delete` method triggers `afterDelete` callback and remove messages from thread", () => {
    expect(
      dataIndex.get(DataIndex.Message)?.documentStore.getDoc(messageOne.id)
    ).toEqual(messageOne)
    expect(
      dataIndex.get(DataIndex.Message)?.documentStore.getDoc(messageTwo.id)
    ).toEqual(messageTwo)

    subject.delete(thread.id)

    expect(
      dataIndex.get(DataIndex.Message)?.documentStore.getDoc(messageOne.id)
    ).toBeNull()
    expect(
      dataIndex.get(DataIndex.Message)?.documentStore.getDoc(messageTwo.id)
    ).toEqual(messageTwo)
    expect(
      dataIndex.get(DataIndex.Thread)?.documentStore.getDoc(thread.id)
    ).toBeNull()
  })
})
