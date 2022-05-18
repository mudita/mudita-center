/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Thread as PureThread } from "@mudita/pure"
import { Thread } from "App/messages/reducers"

export class ThreadPresenter {
  static mapToThread(pureThread: PureThread): Thread {
    const {
      isUnread,
      lastUpdatedAt,
      messageSnippet,
      threadID,
      number = "",
    } = pureThread
    return {
      messageSnippet,
      unread: isUnread,
      id: String(threadID),
      phoneNumber: String(number),
      lastUpdatedAt: new Date(lastUpdatedAt * 1000),
    }
  }
}
