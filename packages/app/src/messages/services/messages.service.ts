/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Message, MessageType, NewMessage, Thread } from "App/messages/reducers/messages.interface"
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
import { Feature, flags } from "App/feature-flags"
import { RequestResponse, RequestResponseStatus } from "App/core/types/request-response.interface"


const initGetMessagesBody: PureGetMessagesBody = {
  category: PureMessagesCategory.message,
  limit: 15,
}

type AcceptablePureMessageType =
  | PureMessageType.FAILED
  | PureMessageType.QUEUED
  | PureMessageType.INBOX
  | PureMessageType.OUTBOX

export interface GetThreadsResponse {
  data: Thread[]
  totalCount: number
  nextPage?: PaginationBody
}

export interface GetMessagesBody {
  threadId: string
  nextPage?: PaginationBody
}

export interface GetMessagesByThreadIdResponse {
  data: Message[]
  nextPage?: PaginationBody
}

const returnResponseWithNextPage = (
  response: RequestResponse<GetThreadsResponse>,
  pagination: PaginationBody
): RequestResponse<GetThreadsResponse> => {
  if (response.data === undefined) {
    return response
  }

  const offset = pagination.offset + pagination.limit
  const nextPage: PaginationBody | undefined =
    offset < response.data.totalCount
      ? {
        offset,
        limit: 0,
      }
      : undefined

  return {
    ...response,
    data: {
      ...response.data,
      nextPage,
    },
  }
}

export class MessagesService {
  constructor(private deviceService: DeviceService) {
  }


  public async loadMoreThreadsInSingleRequest(
    pagination: PaginationBody,
    data: Thread[] = []
  ): Promise<RequestResponse<GetThreadsResponse>> {
    const response = await this.getThreads({
      ...pagination,
      limit: pagination.limit,
    })

    if (response.error || response.data === undefined) {
      return response
    }

    const threads = [...data, ...response.data.data]
    const accumulatedResponse = {
      ...response,
      data: {
        ...response.data,
        data: threads,
      },
    }

    if (response.data.nextPage === undefined) {
      // API no return nextPage (with offset) when client doesn't ask for more than API can return
      // the bellow method is a workaround helper - to remove after implementation by OS
      // https://appnroll.atlassian.net/browse/CP-780
      return returnResponseWithNextPage(accumulatedResponse, pagination)
    }

    const offsetDiff = response.data.nextPage.offset - pagination.offset
    const restLimit = pagination.limit - offsetDiff

    if (restLimit <= 0) {
      return accumulatedResponse
    }

    return this.loadMoreThreadsInSingleRequest(
      {
        offset: response.data.nextPage.offset,
        limit: restLimit,
      },
      threads
    )
  }

  public async getThreads(
    pagination: PaginationBody
  ): Promise<RequestResponse<GetThreadsResponse>> {
    const body: GetThreadsBody = {
      category: PureMessagesCategory.thread,
      ...pagination,
    }

    const { status, data } = await this.deviceService.request({
      body,
      endpoint: Endpoint.Messages,
      method: Method.Get,
    })

    if (status === RequestResponseStatus.Ok && data?.entries !== undefined) {
      return {
        status: RequestResponseStatus.Ok,
        data: {
          data: data.entries.map(MessagesService.mapToThreads),
          nextPage: data.nextPage,
          totalCount: data.totalCount,
        },
      }
    } else {
      return {
        status: RequestResponseStatus.Error,
        error: { message: "Get messages by threadId: Something went wrong" },
      }
    }
  }

  public loadAllMessagesByThreadId(
    threadId: string
  ): Promise<RequestResponse<Message[]>> {
    return this.loadAllMessagesInSingleRequest(threadId)
  }

  private async loadAllMessagesInSingleRequest(
    threadId: string,
    pureMessages: PureMessage[] = [],
    body = initGetMessagesBody
  ): Promise<RequestResponse<Message[]>> {
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
      status === RequestResponseStatus.Ok &&
      data?.entries !== undefined
    ) {
      return {
        status: RequestResponseStatus.Ok,
        data: [...pureMessages, ...data.entries]
          .filter(MessagesService.isAcceptablePureMessageType)
          .map(MessagesService.mapToMessages),
      }
    } else {
      return {
        status: RequestResponseStatus.Error,
        error: {
          message: "Load all messages in single request: Something went wrong",
        },
      }
    }
  }

  public async getMessagesByThreadId({
                                       threadId,
                                       nextPage,
                                     }: GetMessagesBody): Promise<RequestResponse<GetMessagesByThreadIdResponse>> {
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

    if (status === RequestResponseStatus.Ok && data?.entries !== undefined) {
      return {
        status: RequestResponseStatus.Ok,
        data: {
          data: data.entries
            .filter(MessagesService.isAcceptablePureMessageType)
            .map(MessagesService.mapToMessages),
          nextPage: data.nextPage,
        },
      }
    } else {
      return {
        status: RequestResponseStatus.Error,
        error: { message: "Get messages by threadId: Something went wrong" },
      }
    }
  }

  public async createMessage(
    newMessage: NewMessage
  ): Promise<RequestResponse<Message>> {
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
      status === RequestResponseStatus.Ok &&
      data !== undefined &&
      MessagesService.isAcceptablePureMessageType(data)
    ) {
      return {
        status: RequestResponseStatus.Ok,
        data: MessagesService.mapToMessages(data),
      }
    } else {
      return {
        status: RequestResponseStatus.Error,
        error: { message: "Add message: Something went wrong" },
      }
    }
  }

  private static mapToThreads(pureThread: PureThread): Thread {
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

  private static mapToMessages(
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
      messageType: MessagesService.getMessageType(messageType),
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
