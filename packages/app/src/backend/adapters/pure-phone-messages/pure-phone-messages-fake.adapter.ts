/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import PurePhoneMessagesAdapter from "Backend/adapters/pure-phone-messages/pure-phone-messages.class"
import { Message, Thread } from "App/messages/store/messages.interface"
import DeviceResponse, {
  DeviceResponseStatus,
} from "Backend/adapters/device-response.interface"
import { messagesData, threadsData } from "App/seeds/messages"

class PurePhoneMessagesFake extends PurePhoneMessagesAdapter {
  public async getThreads(): Promise<DeviceResponse<Thread[]>> {
    return {
      status: DeviceResponseStatus.Ok,
      data: threadsData,
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

const createFakePurePhoneMessagesAdapter = (): PurePhoneMessagesAdapter =>
  new PurePhoneMessagesFake()

export default createFakePurePhoneMessagesAdapter
