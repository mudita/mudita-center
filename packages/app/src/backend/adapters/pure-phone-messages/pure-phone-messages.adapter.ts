/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import PurePhoneMessagesAdapter, {
  GetMessagesBody,
  GetMessagesByThreadIdResponse,
  GetThreadsResponse,
} from "Backend/adapters/pure-phone-messages/pure-phone-messages.class"
import {
  Message,
  MessageType,
  NewMessage,
  Thread,
} from "App/messages/reducers/messages.interface"
import DeviceResponse, {
  DeviceResponseStatus,
} from "Backend/adapters/device-response.interface"
import DeviceService from "Backend/device-service"
import {
  Endpoint,
  GetMessagesBody as PureGetMessagesBody,
  GetThreadsBody,
  Message as PureMessage,
  MessagesCategory as PureMessagesCategory,
  MessageType as PureMessageType,
  Method,
  PaginationBody,
  Thread as PureThread,
} from "@mudita/pure"

type AcceptablePureMessageType =
  | PureMessageType.FAILED
  | PureMessageType.QUEUED
  | PureMessageType.INBOX
  | PureMessageType.OUTBOX

class PurePhoneMessages extends PurePhoneMessagesAdapter {
  constructor(private deviceService: DeviceService) {
    super()
  }

  public async getThreads(
    pagination: PaginationBody
  ): Promise<DeviceResponse<GetThreadsResponse>> {
    const body: GetThreadsBody = {
      category: PureMessagesCategory.thread,
      ...pagination,
    }

    const { status, data } = await this.deviceService.request({
      body,
      endpoint: Endpoint.Messages,
      method: Method.Get,
    })

    if (status === DeviceResponseStatus.Ok && data?.entries !== undefined) {
      return {
        status: DeviceResponseStatus.Ok,
        data: {
          data: data.entries.map(PurePhoneMessages.mapToThreads),
          nextPage: data.nextPage,
        },
      }
    } else {
      return {
        status: DeviceResponseStatus.Error,
        error: { message: "Get messages by threadId: Something went wrong" },
      }
    }
  }

  public async getMessagesByThreadId({
    threadId,
    nextPage,
  }: GetMessagesBody): Promise<DeviceResponse<GetMessagesByThreadIdResponse>> {
    const body: PureGetMessagesBody = {
      category: PureMessagesCategory.message,
      threadID: Number(threadId),
      ...nextPage,
    }

    const { status, data } = await this.deviceService.request({
      body,
      endpoint: Endpoint.Messages,
      method: Method.Get,
    })

    if (status === DeviceResponseStatus.Ok && data?.entries !== undefined) {
      return {
        status: DeviceResponseStatus.Ok,
        data: {
          data: data.entries
            .filter(PurePhoneMessages.isAcceptablePureMessageType)
            .map(PurePhoneMessages.mapToMessages),
          nextPage: data.nextPage,
        },
      }
    } else {
      return {
        status: DeviceResponseStatus.Error,
        error: { message: "Get messages by threadId: Something went wrong" },
      }
    }
  }

  public async addMessage(
    newMessage: NewMessage
  ): Promise<DeviceResponse<Message>> {
    const { status, data } = await this.deviceService.request({
      body: {
        number: newMessage.phoneNumber,
        messageBody: newMessage.content,
        category: PureMessagesCategory.message,
      },
      endpoint: Endpoint.Messages,
      method: Method.Post,
    })

    if (
      status === DeviceResponseStatus.Ok &&
      data !== undefined &&
      PurePhoneMessages.isAcceptablePureMessageType(data)
    ) {
      return {
        status: DeviceResponseStatus.Ok,
        data: PurePhoneMessages.mapToMessages(data),
      }
    } else {
      return {
        status: DeviceResponseStatus.Error,
        error: { message: "Add message: Something went wrong" },
      }
    }
  }

  private static mapToThreads(pureThread: PureThread): Thread {
    const {
      contactID,
      isUnread,
      lastUpdatedAt,
      messageSnippet,
      threadID,
      number = "",
    } = pureThread
    return {
      messageSnippet,
      // TODO: turn on in https://appnroll.atlassian.net/browse/PDA-802
      unread: process.env.NODE_ENV !== "production" ? isUnread : false,
      id: String(threadID),
      phoneNumber: String(number),
      contactId: String(contactID),
      lastUpdatedAt: new Date(lastUpdatedAt * 1000),
    }
  }

  private static mapToMessages(
    pureMessage: PureMessage & { messageType: AcceptablePureMessageType }
  ): Message {
    const {
      contactID,
      messageBody,
      messageID,
      messageType,
      createdAt,
      threadID,
      number,
    } = pureMessage
    return {
      phoneNumber: number,
      id: String(messageID),
      date: new Date(createdAt * 1000),
      content: messageBody,
      contactId: String(contactID),
      threadId: String(threadID),
      messageType: PurePhoneMessages.getMessageType(messageType),
    }
  }

  private static isAcceptablePureMessageType(
    pureMessage: PureMessage
  ): pureMessage is PureMessage & { messageType: AcceptablePureMessageType } {
    return (
      pureMessage.messageType === PureMessageType.FAILED ||
      pureMessage.messageType === PureMessageType.QUEUED ||
      pureMessage.messageType === PureMessageType.INBOX ||
      pureMessage.messageType === PureMessageType.OUTBOX
    )
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

const createPurePhoneMessagesAdapter = (
  deviceService: DeviceService
): PurePhoneMessagesAdapter => new PurePhoneMessages(deviceService)

export default createPurePhoneMessagesAdapter
