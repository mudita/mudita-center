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
  ThreadControllerPrefix,
  IpcMessageEvent,
} from "App/messages/constants/controller.constant"
import { NewMessage } from "App/messages/reducers"

@Controller(ThreadControllerPrefix)
export class MessageController {
  constructor(private messageService: MessageService) {}

  @IpcEvent(IpcMessageEvent.CreateMessage)
  public createMessage(
    newMessage: NewMessage
  ): Promise<RequestResponse<CreateMessageDataResponse>> {
    return this.messageService.createMessage(newMessage)
  }
}
