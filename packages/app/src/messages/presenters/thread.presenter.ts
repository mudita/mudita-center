/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Thread as PureThread } from "App/device/types/mudita-os"
import { MessageType as PureMessageType } from "App/device/constants"
import { Thread } from "App/messages/dto"
import { MessageType } from "App/messages/constants"

export class ThreadPresenter {
  static mapToThread(pureThread: PureThread, number: string = ""): Thread {
    const { isUnread, lastUpdatedAt, threadID, messageType } = pureThread

    return {
      messageSnippet: ThreadPresenter.buildMessageSnippet(pureThread),
      unread: isUnread,
      id: String(threadID),
      phoneNumber: String(number)?.replace(/[\s]/g, ""),
      lastUpdatedAt: new Date(lastUpdatedAt * 1000),
      messageType: ThreadPresenter.getMessageType(Number(messageType)),
      contactId: undefined,
      contactName: undefined,
    }
  }

  private static buildMessageSnippet(thread: PureThread): string {
    return [
      ...(thread.messageType === PureMessageType.DRAFT ? ["Draft"] : []),
      thread.messageSnippet,
    ].join(": ")
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
