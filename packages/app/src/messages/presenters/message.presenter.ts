/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  Message as PureMessage,
  MessagesCategory as PureMessagesCategory,
  MessageType as PureMessageType,
  PostMessagesBody,
  PutMessageBody,
} from "@mudita/pure"
import { Message, NewMessage } from "App/messages/dto"
import { MessageType } from "App/messages/constants"

export type AcceptablePureMessageType =
  | PureMessageType.FAILED
  | PureMessageType.QUEUED
  | PureMessageType.INBOX
  | PureMessageType.OUTBOX
  | PureMessageType.DRAFT

export class MessagePresenter {
  static mapToCreatePureMessageBody(newMessage: NewMessage): PostMessagesBody {
    return {
      number: newMessage.phoneNumber,
      messageBody: newMessage.content,
      category: PureMessagesCategory.message,
      ...(newMessage.messageType
        ? {
            messageType: MessagePresenter.mapToPureMessageType(
              newMessage.messageType
            ),
          }
        : {}),
    }
  }

  static mapToUpdatePureMessagesBody(message: Message): PutMessageBody {
    return {
      category: PureMessagesCategory.message,
      messageBody: message.content,
      messageID: Number(message.id),
      messageType: MessagePresenter.mapToPureMessageType(message.messageType),
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
    if (messageType === PureMessageType.OUTBOX) {
      return MessageType.OUTBOX
    } else if (messageType === PureMessageType.FAILED) {
      return MessageType.FAILED
    } else if (messageType === PureMessageType.DRAFT) {
      return MessageType.DRAFT
    } else if (messageType === PureMessageType.QUEUED) {
      return MessageType.QUEUED
    } else {
      return MessageType.INBOX
    }
  }

  private static mapToPureMessageType(
    messageType: MessageType
  ): PureMessageType {
    return {
      [MessageType.DRAFT]: PureMessageType.DRAFT,
      [MessageType.FAILED]: PureMessageType.FAILED,
      [MessageType.INBOX]: PureMessageType.INBOX,
      [MessageType.OUTBOX]: PureMessageType.OUTBOX,
      [MessageType.QUEUED]: PureMessageType.QUEUED,
    }[messageType]
  }
}
