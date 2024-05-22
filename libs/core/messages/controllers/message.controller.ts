/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ResultObject } from "Core/core/builder"
import { IpcEvent } from "Core/core/decorators"
import { RequestResponse } from "Core/core/types/request-response.interface"
import {
  CreateMessageDataResponse,
  MessageService,
} from "Core/messages/services"
import { IpcMessageEvent } from "Core/messages/constants/controller.constant"
import { NewMessage, Message } from "Core/messages/dto"

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
  public updateMessage(message: Message): Promise<ResultObject<unknown>> {
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
