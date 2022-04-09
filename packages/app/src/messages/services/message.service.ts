/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  Message,
  NewMessage,
  Thread,
} from "App/messages/reducers/messages.interface"
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
} from "@mudita/pure"
import {
  RequestResponse,
  RequestResponseStatus,
} from "App/core/types/request-response.interface"
import {
  AcceptablePureMessageType,
  MessagePresenter,
} from "App/messages/presenters"
import { isResponseSuccessWithData } from "App/core/helpers/is-responses-success-with-data.helpers"

const initGetMessagesBody: PureGetMessagesBody = {
  category: PureMessagesCategory.message,
  limit: 15,
}

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

export interface CreateMessageDataResponse {
  message: Message
  thread?: Thread
}

// TODO: The `MessagesService` logic is supposed to be changed so will be covered with tests in the next story: CP-896
export class MessageService {
  constructor(private deviceService: DeviceService) {}

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

    const response = await this.deviceService.request({
      body,
      endpoint: Endpoint.Messages,
      method: Method.Get,
    })

    if (isResponseSuccessWithData(response)) {
      const data = response.data
      return {
        status: RequestResponseStatus.Ok,
        data: {
          data: data.entries.map(MessagePresenter.mapToThread),
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
    const response = await this.deviceService.request({
      body: { ...body, threadID: Number(threadId) },
      endpoint: Endpoint.Messages,
      method: Method.Get,
    })
    const data = response.data

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
    } else if (isResponseSuccessWithData(response)) {
      return {
        status: RequestResponseStatus.Ok,
        data: [...pureMessages, ...response.data.entries]
          .filter(MessageService.isAcceptablePureMessageType)
          .map(MessagePresenter.mapToMessage),
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

  public async getMessages(
    pagination: PaginationBody
  ): Promise<RequestResponse<GetMessagesByThreadIdResponse>> {
    const body: PureGetMessagesBody = {
      category: PureMessagesCategory.message,
      ...pagination,
    }

    const response = await this.deviceService.request({
      body,
      endpoint: Endpoint.Messages,
      method: Method.Get,
    })

    if (isResponseSuccessWithData(response)) {
      return {
        status: RequestResponseStatus.Ok,
        data: {
          data: response.data.entries
            .filter(MessageService.isAcceptablePureMessageType)
            .map(MessagePresenter.mapToMessage),
          nextPage: response.data.nextPage,
        },
      }
    } else {
      return {
        status: RequestResponseStatus.Error,
        error: { message: "Get messages: Something went wrong" },
      }
    }
  }

  public async getMessage(id: string): Promise<RequestResponse<Message>> {
    const response = await this.deviceService.request({
      endpoint: Endpoint.Messages,
      method: Method.Get,
      body: {
        category: PureMessagesCategory.message,
        messageID: Number(id),
      },
    })

    if (
      isResponseSuccessWithData(response) &&
      MessageService.isAcceptablePureMessageType(response.data)
    ) {
      return {
        status: response.status,
        data: MessagePresenter.mapToMessage(response.data),
      }
    } else {
      return {
        status: RequestResponseStatus.Error,
        error: { message: "Get message: Something went wrong" },
      }
    }
  }

  public async getThread(id: string): Promise<RequestResponse<Thread>> {
    const response = await this.deviceService.request({
      endpoint: Endpoint.Messages,
      method: Method.Get,
      body: {
        category: PureMessagesCategory.thread,
        threadID: Number(id),
      },
    })

    if (isResponseSuccessWithData(response)) {
      return {
        status: response.status,
        data: MessagePresenter.mapToThread(response.data),
      }
    } else {
      return {
        status: RequestResponseStatus.Error,
        error: { message: "Get thread: Something went wrong" },
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

    const response = await this.deviceService.request({
      body,
      endpoint: Endpoint.Messages,
      method: Method.Get,
    })

    if (isResponseSuccessWithData(response)) {
      return {
        status: RequestResponseStatus.Ok,
        data: {
          data: response.data.entries
            .filter(MessageService.isAcceptablePureMessageType)
            .map(MessagePresenter.mapToMessage),
          nextPage: response.data.nextPage,
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
  ): Promise<RequestResponse<CreateMessageDataResponse>> {
    const { data } = await this.deviceService.request({
      body: MessagePresenter.mapToPureMessageMessagesBody(newMessage),
      endpoint: Endpoint.Messages,
      method: Method.Post,
    })

    if (MessageService.isAcceptablePureMessageType(data)) {
      if (newMessage.threadId === undefined) {
        const threadsResponse = await this.getThreads({ limit: 1, offset: 0 })
        const threadId = threadsResponse.data?.data[0]?.id

        if (!threadId) {
          return {
            status: RequestResponseStatus.Error,
          }
        }

        return {
          status: RequestResponseStatus.Ok,
          data: {
            message: { ...MessagePresenter.mapToMessage(data), threadId },
            thread: threadsResponse.data?.data[0],
          },
        }
      }

      return {
        status: RequestResponseStatus.Ok,
        data: {
          message: {
            ...MessagePresenter.mapToMessage(data),
            threadId: newMessage.threadId,
          },
        },
      }
    } else {
      return {
        status: RequestResponseStatus.Error,
        error: { message: "Add message: Something went wrong" },
      }
    }
  }

  static isAcceptablePureMessageType(
    pureMessage?: PureMessage
  ): pureMessage is PureMessage & { messageType: AcceptablePureMessageType } {
    if (!pureMessage) {
      return false
    }
    return (
      pureMessage.messageType === PureMessageType.FAILED ||
      pureMessage.messageType === PureMessageType.QUEUED ||
      pureMessage.messageType === PureMessageType.INBOX ||
      pureMessage.messageType === PureMessageType.OUTBOX
    )
  }
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
