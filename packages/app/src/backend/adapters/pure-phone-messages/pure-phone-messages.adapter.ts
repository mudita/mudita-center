/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import PurePhoneMessagesAdapter from "Backend/adapters/pure-phone-messages/pure-phone-messages.class"
import { Message, Thread } from "App/messages/store/messages.interface"
import DeviceResponse, {
  DeviceResponseStatus,
} from "Backend/adapters/device-response.interface"
import DeviceService from "Backend/device-service"
import {
  Endpoint,
  GetThreadsBody,
  Method,
  Thread as PureThread,
} from "@mudita/pure"

const initGetThreadsBody: GetThreadsBody = {
  category: "thread",
  limit: 15,
}

class PurePhoneMessages extends PurePhoneMessagesAdapter {
  constructor(private deviceService: DeviceService) {
    super()
  }

  public getThreads(): Promise<DeviceResponse<Thread[]>> {
    return this.loadAllThreadsInSingleRequest()
  }

  public async getMessagesByThreadId(
    threadId: string
  ): Promise<DeviceResponse<Message[]>> {
    return {
      status: DeviceResponseStatus.Ok,
      data: [],
    }
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
      lastUpdatedAt: new Date(lastUpdatedAt),
    }
  }
}

const createPurePhoneMessagesAdapter = (
  deviceService: DeviceService
): PurePhoneMessagesAdapter => new PurePhoneMessages(deviceService)

export default createPurePhoneMessagesAdapter
