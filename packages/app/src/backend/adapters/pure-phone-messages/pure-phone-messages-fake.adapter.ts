/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import PurePhoneMessagesAdapter, {
  GetMessagesBody,
  GetMessagesByThreadIdResponse,
  GetThreadsResponse,
} from "Backend/adapters/pure-phone-messages/pure-phone-messages.class"
import { Message, NewMessage } from "App/messages/reducers/messages.interface"
import { addedMessageData, messagesData, threadsData } from "App/seeds/messages"
import {
  RequestResponse,
  RequestResponseStatus,
} from "App/core/types/request-response.interface"

class PurePhoneMessagesFake extends PurePhoneMessagesAdapter {
  public async getThreads(): Promise<RequestResponse<GetThreadsResponse>> {
    return {
      status: RequestResponseStatus.Ok,
      data: {
        data: threadsData,
        totalCount: threadsData.length,
      },
    }
  }

  public async getMessagesByThreadId({
    threadId,
  }: GetMessagesBody): Promise<RequestResponse<GetMessagesByThreadIdResponse>> {
    return {
      status: RequestResponseStatus.Ok,
      data: {
        data: messagesData.filter((messages) => messages.threadId === threadId),
      },
    }
  }

  public async addMessage(
    newMessage: NewMessage
  ): Promise<RequestResponse<Message>> {
    return {
      status: RequestResponseStatus.Ok,
      data: addedMessageData,
    }
  }

  public async loadAllMessagesByThreadId(
    threadId: string
  ): Promise<RequestResponse<Message[]>> {
    return {
      status: RequestResponseStatus.Ok,
      data: messagesData.filter((messages) => messages.threadId === threadId),
    }
  }

  public async loadMoreThreadsInSingleRequest(): Promise<
    RequestResponse<GetThreadsResponse>
  > {
    return {
      status: RequestResponseStatus.Ok,
      data: {
        data: threadsData,
        totalCount: threadsData.length,
      },
    }
  }
}

const createFakePurePhoneMessagesAdapter = (): PurePhoneMessagesAdapter =>
  new PurePhoneMessagesFake()

export default createFakePurePhoneMessagesAdapter
