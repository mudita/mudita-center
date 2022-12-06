/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ResultObject } from "App/core/builder"
import {
  Endpoint,
  Method,
  MessagesCategory as PureMessagesCategory,
  MessageType as PureMessageType,
} from "App/device/constants"
import {
  GetMessagesRequestConfig as PureGetMessagesBody,
  Message as PureMessage,
  PaginationBody,
  GetMessageResponseBody,
  GetMessagesResponseBody,
  CreateMessageResponseBody,
} from "App/device/types/mudita-os"
import { isResponseSuccess, isResponseSuccessWithData } from "App/core/helpers"
import {
  RequestResponse,
  RequestResponseStatus,
  SuccessRequestResponse,
} from "App/core/types/request-response.interface"
import { Message, NewMessage, Thread } from "App/messages/dto"
import {
  AcceptablePureMessageType,
  MessagePresenter,
} from "App/messages/presenters"
import { MessageRepository } from "App/messages/repositories"
import { ThreadService } from "App/messages/services/thread.service"
import { DeviceManager } from "App/device-manager/services"
import { mapToRawNumber, splitMessageByBytesSize } from "App/messages/helpers"

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
    private deviceManager: DeviceManager,
    private threadService: ThreadService,
    private messageRepository: MessageRepository
  ) {}

  private MESSAGE_MAX_SIZE_IN_BYTES = 469

  public async getMessage(id: string): Promise<RequestResponse<Message>> {
    const response =
      await this.deviceManager.device.request<GetMessageResponseBody>({
        endpoint: Endpoint.Messages,
        method: Method.Get,
        body: {
          category: PureMessagesCategory.message,
          messageID: Number(id),
        },
      })

    if (
      response.ok &&
      response.data &&
      MessageService.isAcceptablePureMessageType(response.data)
    ) {
      return {
        status: RequestResponseStatus.Ok,
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
    const body: PureGetMessagesBody["body"] = {
      category: PureMessagesCategory.message,
      ...pagination,
    }

    const response =
      await this.deviceManager.device.request<GetMessagesResponseBody>({
        body,
        endpoint: Endpoint.Messages,
        method: Method.Get,
      })

    if (response.ok && response.data) {
      return {
        status: RequestResponseStatus.Ok,
        data: {
          data: response.data.entries
            // AUTO DISABLED - fix me if you like :)
            // eslint-disable-next-line @typescript-eslint/unbound-method
            .filter(MessageService.isAcceptablePureMessageType)
            // AUTO DISABLED - fix me if you like :)
            // eslint-disable-next-line @typescript-eslint/unbound-method
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
        phoneNumber: mapToRawNumber(newMessage.phoneNumber),
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
    const { data } =
      await this.deviceManager.device.request<CreateMessageResponseBody>({
        body: MessagePresenter.mapToCreatePureMessageBody(newMessage),
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
    const message = this.messageRepository.findById(messageId)

    if (!message) {
      return {
        status: RequestResponseStatus.Error,
        error: {
          message: "Delete message: Message not found",
        },
      }
    }

    const result = await this.deviceManager.device.request({
      body: {
        category: PureMessagesCategory.message,
        messageID: Number(messageId),
      },
      endpoint: Endpoint.Messages,
      method: Method.Delete,
    })

    if (!result.ok) {
      return {
        status: RequestResponseStatus.Error,
        error: {
          message: "Delete message: Something went wrong",
        },
      }
    }

    this.messageRepository.delete(messageId)

    const refreshThreadResult = await this.threadService.refreshThread(
      message.threadId
    )

    if (!isResponseSuccess(refreshThreadResult)) {
      return {
        status: RequestResponseStatus.Error,
        error: {
          message: "Refresh message: Something went wrong",
        },
      }
    }

    return {
      status: RequestResponseStatus.Ok,
    }
  }

  public async resendMessage(
    messageId: string
  ): Promise<RequestResponse<CreateMessageDataResponse>> {
    const message = this.messageRepository.findById(messageId)

    if (!message) {
      return {
        status: RequestResponseStatus.Error,
        error: {
          message: "Message not fond in internal database",
        },
      }
    }

    const result = await this.createMessage({
      phoneNumber: message.phoneNumber,
      content: message.content,
      threadId: message.threadId,
    })

    return result
  }

  public async updateMessage(message: Message): Promise<ResultObject<unknown>> {
    return this.deviceManager.device.request({
      body: MessagePresenter.mapToUpdatePureMessagesBody(message),
      endpoint: Endpoint.Messages,
      method: Method.Put,
    })
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
      pureMessage.messageType === PureMessageType.OUTBOX ||
      pureMessage.messageType === PureMessageType.DRAFT
    )
  }
}
