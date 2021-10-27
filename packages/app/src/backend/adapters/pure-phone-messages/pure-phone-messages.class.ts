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
import { PaginationBody } from "@mudita/pure"

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

export default abstract class PurePhoneMessagesAdapter {
  public abstract getThreads(
    pagination: PaginationBody
  ): Promise<DeviceResponse<GetThreadsResponse>>
  public abstract getMessagesByThreadId(
    body: GetMessagesBody
  ): Promise<DeviceResponse<GetMessagesByThreadIdResponse>>
  public abstract addMessage(
    newMessage: NewMessage
  ): Promise<DeviceResponse<Message>>
}
