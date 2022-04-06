/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  Message,
  NewMessage,
  Thread,
} from "App/messages/reducers/messages.interface"
import { PaginationBody } from "@mudita/pure"
import { RequestResponse } from "App/core/types/request-response.interface"

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
  public abstract loadMoreThreadsInSingleRequest(
    pagination: PaginationBody
  ): Promise<RequestResponse<GetThreadsResponse>>
  public abstract getThreads(
    pagination: PaginationBody
  ): Promise<RequestResponse<GetThreadsResponse>>
  public abstract getMessagesByThreadId(
    body: GetMessagesBody
  ): Promise<RequestResponse<GetMessagesByThreadIdResponse>>
  public abstract loadAllMessagesByThreadId(
    threadId: string
  ): Promise<RequestResponse<Message[]>>
  public abstract addMessage(
    newMessage: NewMessage
  ): Promise<RequestResponse<Message>>
}
