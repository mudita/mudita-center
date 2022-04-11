/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Controller, IpcEvent } from "App/core/decorators"
import { RequestResponse } from "App/core/types/request-response.interface"
import {
  CreateMessageDataResponse,
  GetMessagesBody,
  MessageService,
} from "App/messages/services"
import {
  ThreadControllerPrefix,
  IpcMessageEvent,
} from "App/messages/constants/controller.constant"
import { Message, NewMessage } from "App/messages/reducers"

@Controller(ThreadControllerPrefix)
export class MessageController {
  constructor(private messageService: MessageService) {}

  @IpcEvent(IpcMessageEvent.CreateMessage)
  public createMessage(
    newMessage: NewMessage
  ): Promise<RequestResponse<CreateMessageDataResponse>> {
    return this.messageService.createMessage(newMessage)
  }

  @IpcEvent(IpcMessageEvent.GetMessagesByThreadId)
  public getMessagesByThreadId(
    body: GetMessagesBody
  ): Promise<RequestResponse<Message[]>> {
    return this.messageService.loadAllMessagesByThreadId(body.threadId)
  }
}
