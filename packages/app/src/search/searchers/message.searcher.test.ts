/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import elasticlunr from "elasticlunr"
import { Message } from "App/messages/dto"
import { MessageType } from "App/messages/constants"
import { IndexFactory } from "App/index-storage/factories"
import { DataIndex } from "App/index-storage/constants"
import { MessageSearcher } from "App/search/searchers/message.searcher"

const indexMessageMock = elasticlunr<Message>()
const messageMock: Message = {
  id: "27a7108d-d5b8-4bb5-87bc-2cfebcecd571",
  date: new Date("2019-10-18T11:27:15.256Z"),
  content:
    "Adipisicing non qui Lorem aliqua officia laboris ad reprehenderit dolor mollit.",
  threadId: "1",
  phoneNumber: "+48 755 853 216",
  messageType: MessageType.INBOX,
}

const index = new IndexFactory().create()
const subject = new MessageSearcher(index)

beforeAll(() => {
  index.set(DataIndex.Message, indexMessageMock)

  indexMessageMock.setRef("id")
  indexMessageMock.addField("content")
  indexMessageMock.addField("date")
  indexMessageMock.addField("messageType")
  indexMessageMock.addField("phoneNumber")
  indexMessageMock.addField("threadId")

  indexMessageMock.addDoc(messageMock)
})

describe("Method: search", () => {
  test("returns hydrated `message` list if query match to string in fields", () => {
    expect(subject.search("Adipisicing")).toEqual([messageMock])
  })

  test("returns empty array if query doesn't match to string in fields", () => {
    expect(subject.search("Hello")).toEqual([])
  })
})
