/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Controller, IpcEvent } from "App/core/decorators"
import { RequestResponse } from "App/core/types/request-response.interface"
import {
  GetMessagesBody,
  GetThreadsResponse,
  MessagesService,
} from "App/messages/services"
import {
  ControllerPrefix,
  IpcMessageEvent,
} from "App/messages/constants/controller.constant"
import { Message, NewMessage } from "App/messages"
import { PaginationBody } from "@mudita/pure"

@Controller(ControllerPrefix)
export class MessagesController {
  constructor(private messagesService: MessagesService) {}

  @IpcEvent(IpcMessageEvent.CreateMessage)
  public createMessage(
    newMessage: NewMessage
  ): Promise<RequestResponse<Message>> {
    return this.messagesService.createMessage(newMessage)
  }

  @IpcEvent(IpcMessageEvent.GetMessagesByThreadId)
  public getMessagesByThreadId(
    body: GetMessagesBody
  ): Promise<RequestResponse<Message[]>> {
    return this.messagesService.loadAllMessagesByThreadId(body.threadId)
  }

  @IpcEvent(IpcMessageEvent.GetThreads)
  public getThreads(
    pagination: PaginationBody
  ): Promise<RequestResponse<GetThreadsResponse>> {
    return this.messagesService.loadMoreThreadsInSingleRequest(pagination)
  }
}
