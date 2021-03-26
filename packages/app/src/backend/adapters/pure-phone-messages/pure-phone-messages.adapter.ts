/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import PurePhoneMessagesAdapter from "Backend/adapters/pure-phone-messages/pure-phone-messages.class"
import { Message, Thread } from "App/messages/store/messages.interface"
import DeviceResponse, {
  DeviceResponseStatus,
} from "Backend/adapters/device-response.interface"
import { messagesData } from "App/seeds/messages"
import DeviceService from "Backend/device-service"
import { Endpoint, Method, Thread as PureThread } from "@mudita/pure"

class PurePhoneMessages extends PurePhoneMessagesAdapter {
  constructor(private deviceService: DeviceService) {
    super()
  }

  public async getThreads(): Promise<DeviceResponse<Thread[]>> {
    const { status, data } = await this.deviceService.request({
      endpoint: Endpoint.Messages,
      method: Method.Get,
      body: {
        category: "thread",
        limit: 10,
      },
    })

    if (status === DeviceResponseStatus.Ok && data?.entries !== undefined) {
      return {
        status: DeviceResponseStatus.Ok,
        data: data.entries.map(mapToThreads),
      }
    } else {
      return {
        status: DeviceResponseStatus.Error,
        error: { message: "Something went wrong" },
      }
    }
  }

  public async getMessagesByThreadId(
    threadId: string
  ): Promise<DeviceResponse<Message[]>> {
    return {
      status: DeviceResponseStatus.Ok,
      data: messagesData.filter((messages) => messages.threadId === threadId),
    }
  }
}

const mapToThreads = (pureThread: PureThread): Thread => {
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
    lastUpdatedAt: new Date(lastUpdatedAt),
  }
}

const createPurePhoneMessagesAdapter = (
  deviceService: DeviceService
): PurePhoneMessagesAdapter => new PurePhoneMessages(deviceService)

export default createPurePhoneMessagesAdapter
