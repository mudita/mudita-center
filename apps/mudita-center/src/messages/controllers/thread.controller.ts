/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { IpcEvent } from "App/core/decorators"
import { RequestResponse } from "App/core/types/request-response.interface"
import { ThreadService } from "App/messages/services"
import { IpcThreadEvent } from "App/messages/constants/controller.constant"
import { Thread } from "App/messages/dto"

export class ThreadController {
  constructor(private threadService: ThreadService) {}

  @IpcEvent(IpcThreadEvent.DeleteThreads)
  public deleteThreads(
    threadIds: string[]
  ): Promise<RequestResponse<string[]>> {
    return this.threadService.deleteThreads(threadIds)
  }

  @IpcEvent(IpcThreadEvent.ToggleThreadsReadStatus)
  public toggleThreadsReadStatus(
    threads: Thread[]
  ): Promise<RequestResponse<Thread[]>> {
    return this.threadService.toggleThreadsReadStatus(threads)
  }
}
