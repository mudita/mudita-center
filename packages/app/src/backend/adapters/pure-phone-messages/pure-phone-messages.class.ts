/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import DeviceResponse from "Backend/adapters/device-response.interface"
import {
  Message,
  NewMessage,
  Thread,
} from "App/messages/reducers/messages.interface"

export default abstract class PurePhoneMessagesAdapter {
  public abstract getThreads(): Promise<DeviceResponse<Thread[]>>
  public abstract getMessagesByThreadId(
    threadId: string
  ): Promise<DeviceResponse<Message[]>>
  public abstract addMessage(
    newMessage: NewMessage
  ): Promise<DeviceResponse<Message>>
}
