/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  Thread as PureThread,
  MessageType as PureMessageType,
} from "@mudita/pure"
import { Thread } from "App/messages/dto"
import { MessageType } from "App/messages/constants"
import { Feature, flags } from "App/feature-flags"

export class ThreadPresenter {
  static mapToThread(pureThread: PureThread): Thread {
    const {
      isUnread,
      lastUpdatedAt,
      messageSnippet,
      threadID,
      number = "",
      messageType,
    } = pureThread
    return {
      messageSnippet,
      unread: flags.get(Feature.ReadAndUnreadMessages) ? isUnread : false,
      id: String(threadID),
      phoneNumber: String(number),
      lastUpdatedAt: new Date(lastUpdatedAt * 1000),
      messageType: ThreadPresenter.getMessageType(Number(messageType)),
    }
  }

  private static getMessageType(messageType: PureMessageType): MessageType {
    if (
      messageType === PureMessageType.QUEUED ||
      messageType === PureMessageType.OUTBOX
    ) {
      return MessageType.OUTBOX
    } else if (messageType === PureMessageType.FAILED) {
      return MessageType.FAILED
    } else {
      return MessageType.INBOX
    }
  }
}
