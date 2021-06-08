/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import PurePhoneMessagesAdapter from "Backend/adapters/pure-phone-messages/pure-phone-messages.class"
import {
  Message,
  MessageType,
  Thread,
} from "App/messages/store/messages.interface"
import DeviceResponse, {
  DeviceResponseStatus,
} from "Backend/adapters/device-response.interface"
import DeviceService from "Backend/device-service"
import {
  Endpoint,
  GetMessagesBody,
  GetThreadsBody,
  Method,
  Thread as PureThread,
  Message as PureMessage,
  MessageType as PureMessageType,
} from "@mudita/pure"

const initGetThreadsBody: GetThreadsBody = {
  category: "thread",
  limit: 15,
}
const initGetMessagesBody: GetMessagesBody = {
  category: "message",
  limit: 15,
}

type AcceptablePureMessageType =
  | PureMessageType.FAILED
  | PureMessageType.INBOX
  | PureMessageType.OUTBOX

class PurePhoneMessages extends PurePhoneMessagesAdapter {
  constructor(private deviceService: DeviceService) {
    super()
  }

  public getThreads(): Promise<DeviceResponse<Thread[]>> {
    return this.loadAllThreadsInSingleRequest()
  }

  public getMessagesByThreadId(
    threadId: string
  ): Promise<DeviceResponse<Message[]>> {
    return this.loadAllMessagesInSingleRequest(threadId)
  }

  private async loadAllThreadsInSingleRequest(
    pureThreads: PureThread[] = [],
    body = initGetThreadsBody
  ): Promise<DeviceResponse<Thread[]>> {
    const { status, data } = await this.deviceService.request({
      body,
      endpoint: Endpoint.Messages,
      method: Method.Get,
    })

    if (data?.nextPage !== undefined) {
      return this.loadAllThreadsInSingleRequest(
        [...pureThreads, ...data.entries],
        {
          ...initGetThreadsBody,
          ...data.nextPage,
        }
      )
    } else if (
      status === DeviceResponseStatus.Ok &&
      data?.entries !== undefined
    ) {
      return {
        status: DeviceResponseStatus.Ok,
        data: [...pureThreads, ...data.entries].map(
          PurePhoneMessages.mapToThreads
        ),
      }
    } else {
      return {
        status: DeviceResponseStatus.Error,
        error: { message: "Something went wrong" },
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
    } = pureThread
    return {
      messageSnippet,
      // TODO: turn on in https://appnroll.atlassian.net/browse/PDA-802
      unread: process.env.NODE_ENV !== "production" ? isUnread : false,
      id: String(threadID),
      contactId: String(contactID),
      lastUpdatedAt: new Date(lastUpdatedAt * 1000),
    }
  }

  private async loadAllMessagesInSingleRequest(
    threadId: string,
    pureMessages: PureMessage[] = [],
    body = initGetMessagesBody
  ): Promise<DeviceResponse<Message[]>> {
    const { status, data } = await this.deviceService.request({
      body: { ...body, threadID: Number(threadId) },
      endpoint: Endpoint.Messages,
      method: Method.Get,
    })

    if (data?.nextPage !== undefined) {
      const limit: number = data.totalCount - data.nextPage.offset
      return this.loadAllMessagesInSingleRequest(
        threadId,
        [...pureMessages, ...data.entries],
        {
          ...initGetMessagesBody,
          limit,
          offset: data.nextPage.offset,
        }
      )
    } else if (
      status === DeviceResponseStatus.Ok &&
      data?.entries !== undefined
    ) {
      return {
        status: DeviceResponseStatus.Ok,
        data: [...pureMessages, ...data.entries]
          .filter(PurePhoneMessages.isAcceptablePureMessageType)
          .map(PurePhoneMessages.mapToMessages),
      }
    } else {
      return {
        status: DeviceResponseStatus.Error,
        error: { message: "Something went wrong" },
      }
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
    } = pureMessage
    return {
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
      pureMessage.messageType === PureMessageType.INBOX ||
      pureMessage.messageType === PureMessageType.OUTBOX
    )
  }

  private static getMessageType(
    messageType: AcceptablePureMessageType
  ): MessageType {
    if (
      messageType === PureMessageType.FAILED ||
      messageType === PureMessageType.INBOX
    ) {
      return MessageType.INBOX
    } else {
      return MessageType.OUTBOX
    }
  }
}

const createPurePhoneMessagesAdapter = (
  deviceService: DeviceService
): PurePhoneMessagesAdapter => new PurePhoneMessages(deviceService)

export default createPurePhoneMessagesAdapter
