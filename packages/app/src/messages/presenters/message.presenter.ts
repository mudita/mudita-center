/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  Message as PureMessage,
  MessagesCategory as PureMessagesCategory,
  MessageType as PureMessageType,
  PostMessagesBody,
  Thread as PureThread,
} from "@mudita/pure"
import { Message, MessageType, NewMessage, Thread } from "App/messages/reducers"
import { Feature, flags } from "App/feature-flags"

export type AcceptablePureMessageType =
  | PureMessageType.FAILED
  | PureMessageType.QUEUED
  | PureMessageType.INBOX
  | PureMessageType.OUTBOX

export class MessagePresenter {
  static mapToPureMessageMessagesBody(
    newMessage: NewMessage
  ): PostMessagesBody {
    return {
      number: newMessage.phoneNumber,
      messageBody: newMessage.content,
      category: PureMessagesCategory.message,
    }
  }

  static mapToThreads(pureThread: PureThread): Thread {
    const {
      isUnread,
      lastUpdatedAt,
      messageSnippet,
      threadID,
      number = "",
    } = pureThread
    return {
      messageSnippet,
      // TODO: turn on in https://appnroll.atlassian.net/browse/PDA-802
      unread: flags.get(Feature.ProductionAndAlpha) ? false : isUnread,
      id: String(threadID),
      phoneNumber: String(number),
      lastUpdatedAt: new Date(lastUpdatedAt * 1000),
    }
  }

  static mapToMessages(
    pureMessage: PureMessage & { messageType: AcceptablePureMessageType }
  ): Message {
    const { messageBody, messageID, messageType, createdAt, threadID, number } =
      pureMessage
    return {
      phoneNumber: number,
      id: String(messageID),
      date: new Date(createdAt * 1000),
      content: messageBody,
      threadId: String(threadID),
      messageType: MessagePresenter.getMessageType(messageType),
    }
  }

  private static getMessageType(
    messageType: AcceptablePureMessageType
  ): MessageType {
    if (
      messageType === PureMessageType.FAILED ||
      messageType === PureMessageType.QUEUED ||
      messageType === PureMessageType.OUTBOX
    ) {
      return MessageType.OUTBOX
    } else {
      return MessageType.INBOX
    }
  }
}
