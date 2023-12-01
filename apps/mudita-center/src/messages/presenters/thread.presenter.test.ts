/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Thread as PureThread } from "App/device/types/mudita-os"
import { Thread } from "App/messages/dto"
import { ThreadPresenter } from "App/messages/presenters/thread.presenter"
import { MessageType } from "App/messages/constants"

const pureThread: PureThread = {
  contactID: 1,
  isUnread: true,
  lastUpdatedAt: 1617089558,
  messageCount: 1,
  messageSnippet:
    "Nulla itaque laborum delectus a id aliquam quod. Voluptas molestiae sit excepturi voluptas fuga cupiditate.",
  messageType: 1,
  number: "+48500600700",
  threadID: 1,
}

const thread: Thread = {
  id: "1",
  phoneNumber: "+48500600700",
  lastUpdatedAt: new Date(1617089558 * 1000),
  messageSnippet:
    "Draft: Nulla itaque laborum delectus a id aliquam quod. Voluptas molestiae sit excepturi voluptas fuga cupiditate.",
  unread: true,
  messageType: MessageType.INBOX,
  contactId: undefined,
  contactName: undefined,
}

describe("`ThreadPresenter`", () => {
  test("`mapToThreads` record properly", () => {
    const result = ThreadPresenter.mapToThread(pureThread)
    expect(result).toEqual(thread)
  })
})
