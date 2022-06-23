/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  Message as PureMessage,
  MessagesCategory as PureMessagesCategory,
  MessageType as PureMessageType,
  PostMessagesBody,
} from "@mudita/pure"
import { Message, NewMessage } from "App/messages/dto"
import { MessageType } from "App/messages/constants"

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

  static mapToMessage(
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
