/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Controller, IpcEvent } from "App/core/decorators"
import { RequestResponse } from "App/core/types/request-response.interface"
import { GetThreadsResponse, MessageService } from "App/messages/services"
import {
  ThreadControllerPrefix,
  IpcThreadEvent,
} from "App/messages/constants/controller.constant"
import { PaginationBody } from "@mudita/pure"

@Controller(ThreadControllerPrefix)
export class ThreadController {
  constructor(private messagesService: MessageService) {}

  @IpcEvent(IpcThreadEvent.GetThreads)
  public getThreads(
    pagination: PaginationBody
  ): Promise<RequestResponse<GetThreadsResponse>> {
    return this.messagesService.loadMoreThreadsInSingleRequest(pagination)
  }
}
