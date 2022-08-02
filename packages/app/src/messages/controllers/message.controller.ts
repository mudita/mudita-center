/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Controller, IpcEvent } from "App/core/decorators"
import { RequestResponse } from "App/core/types/request-response.interface"
import {
  CreateMessageDataResponse,
  MessageService,
} from "App/messages/services"
import {
  IpcMessageEvent,
  MessageControllerPrefix,
} from "App/messages/constants/controller.constant"
import { NewMessage, Message } from "App/messages/dto"

@Controller(MessageControllerPrefix)
export class MessageController {
  constructor(private messageService: MessageService) {}

  @IpcEvent(IpcMessageEvent.CreateMessage)
  public createMessage(
    newMessage: NewMessage
  ): Promise<RequestResponse<CreateMessageDataResponse>> {
    return this.messageService.createMessage(newMessage)
  }

  @IpcEvent(IpcMessageEvent.UpdateMessage)
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public updateMessage(message: Message): Promise<RequestResponse<any>> {
    return this.messageService.updateMessage(message)
  }

  @IpcEvent(IpcMessageEvent.DeleteMessage)
  public async deleteMessage(messageId: string): Promise<RequestResponse> {
    return this.messageService.deleteMessage(messageId)
  }

  @IpcEvent(IpcMessageEvent.ResendMessage)
  public async resendMessage(
    messageId: string
  ): Promise<RequestResponse<CreateMessageDataResponse>> {
    return this.messageService.resendMessage(messageId)
  }
}
