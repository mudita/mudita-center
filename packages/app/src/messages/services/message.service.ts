/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  Message,
  NewMessage,
  Thread,
} from "App/messages/reducers/messages.interface"
import DeviceService from "App/__deprecated__/backend/device-service"
import {
  Endpoint,
  GetMessagesBody as PureGetMessagesBody,
  Message as PureMessage,
  MessagesCategory as PureMessagesCategory,
  MessageType as PureMessageType,
  Method,
  PaginationBody,
} from "@mudita/pure"
import {
  RequestResponse,
  RequestResponseStatus,
  SuccessRequestResponse,
} from "App/core/types/request-response.interface"
import {
  AcceptablePureMessageType,
  MessagePresenter,
} from "App/messages/presenters"
import { isResponseSuccess, isResponseSuccessWithData } from "App/core/helpers"
import { ThreadService } from "App/messages/services/thread.service"
import { splitMessageByBytesSize } from "../helpers"

export interface GetMessagesByThreadIdResponse {
  data: Message[]
  nextPage?: PaginationBody
}

interface CreateMessagePartDataResponse {
  message: Message
  thread?: Thread
}

export interface CreateMessageDataResponse {
  messageParts: CreateMessagePartDataResponse[]
}

export class MessageService {
  constructor(
    private deviceService: DeviceService,
    private threadService: ThreadService
  ) {}

  private MESSAGE_MAX_SIZE_IN_BYTES = 469

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

  public async createMessage(
    newMessage: NewMessage
  ): Promise<RequestResponse<CreateMessageDataResponse>> {
    const messages = splitMessageByBytesSize(
      newMessage.content,
      this.MESSAGE_MAX_SIZE_IN_BYTES
    )

    const successResponses: SuccessRequestResponse<CreateMessagePartDataResponse>[] =
      []

    for (const message of messages) {
      const result = await this.createSingleMessage({
        ...newMessage,
        content: message,
      })

      if (isResponseSuccessWithData(result)) {
        successResponses.push(result)
      } else {
        break
      }
    }

    const isAnyErrorResponseFound = successResponses.length !== messages.length

    if (isAnyErrorResponseFound) {
      return {
        status: RequestResponseStatus.Error,
        error: { message: "Create message: Something went wrong" },
      }
    }

    const result = {
      status: RequestResponseStatus.Ok,
      data: {
        messageParts: successResponses.map((response) => ({
          message: response.data.message,
          thread: response.data?.thread,
        })),
      },
    }

    return result
  }

  private async createSingleMessage(
    newMessage: NewMessage
  ): Promise<RequestResponse<CreateMessagePartDataResponse>> {
    const { data } = await this.deviceService.request({
      body: MessagePresenter.mapToPureMessageMessagesBody(newMessage),
      endpoint: Endpoint.Messages,
      method: Method.Post,
    })

    if (MessageService.isAcceptablePureMessageType(data)) {
      if (newMessage.threadId === undefined) {
        // `getThreads` instead of `getThread` because Post Message doesn't return properly threadID when a thread is new
        const threadsResponse = await this.threadService.getThreads({
          limit: 1,
          offset: 0,
        })
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
    }

    return {
      status: RequestResponseStatus.Error,
    }
  }

  public async deleteMessage(
    messageId: string
  ): Promise<RequestResponse<undefined>> {
    const result = await this.deviceService.request({
      body: {
        category: PureMessagesCategory.message,
        messageID: +messageId,
      },
      endpoint: Endpoint.Messages,
      method: Method.Delete,
    })

    if (isResponseSuccess(result)) {
      return {
        status: RequestResponseStatus.Ok,
      }
    }

    return {
      status: RequestResponseStatus.Error,
      error: {
        message: "Delete message: Something went wrong",
      },
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
