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
import DeviceResponse, {
  DeviceResponseStatus,
} from "Backend/adapters/device-response.interface"
import { addedMessageData, messagesData, threadsData } from "App/seeds/messages"

class PurePhoneMessagesFake extends PurePhoneMessagesAdapter {
  public async getThreads(): Promise<DeviceResponse<GetThreadsResponse>> {
    return {
      status: DeviceResponseStatus.Ok,
      data: {
        data: threadsData,
        totalCount: threadsData.length,
      },
    }
  }

  public async getMessagesByThreadId({
    threadId,
  }: GetMessagesBody): Promise<DeviceResponse<GetMessagesByThreadIdResponse>> {
    return {
      status: DeviceResponseStatus.Ok,
      data: {
        data: messagesData.filter((messages) => messages.threadId === threadId),
      },
    }
  }

  public async addMessage(
    newMessage: NewMessage
  ): Promise<DeviceResponse<Message>> {
    return {
      status: DeviceResponseStatus.Ok,
      data: addedMessageData,
    }
  }

  public async loadAllMessagesByThreadId(threadId: string): Promise<DeviceResponse<Message[]>> {
    return {
      status: DeviceResponseStatus.Ok,
      data: messagesData.filter((messages) => messages.threadId === threadId),
    }
  }

  public async loadMoreThreadsInSingleRequest(): Promise<DeviceResponse<GetThreadsResponse>> {
    return {
      status: DeviceResponseStatus.Ok,
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
