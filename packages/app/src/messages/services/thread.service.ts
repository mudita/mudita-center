/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Thread } from "App/messages/reducers/messages.interface"
import DeviceService from "Backend/device-service"
import {
  Endpoint,
  GetThreadsBody,
  MessagesCategory as PureMessagesCategory,
  Method,
  PaginationBody,
} from "@mudita/pure"
import {
  RequestResponse,
  RequestResponseStatus,
} from "App/core/types/request-response.interface"
import { ThreadPresenter } from "App/messages/presenters/thread.presenter"
import { isResponseSuccessWithData } from "App/core/helpers/is-responses-success-with-data.helpers"

export interface GetThreadsResponse {
  data: Thread[]
  totalCount: number
  nextPage?: PaginationBody
}

export class ThreadService {
  constructor(private deviceService: DeviceService) {}

  public async getThreads(
    pagination: PaginationBody
  ): Promise<RequestResponse<GetThreadsResponse>> {
    const body: GetThreadsBody = {
      category: PureMessagesCategory.thread,
      ...pagination,
    }

    const response = await this.deviceService.request({
      body,
      endpoint: Endpoint.Messages,
      method: Method.Get,
    })

    if (isResponseSuccessWithData(response)) {
      const data = response.data
      return {
        status: RequestResponseStatus.Ok,
        data: {
          data: data.entries.map(ThreadPresenter.mapToThread),
          nextPage: data.nextPage,
          totalCount: data.totalCount,
        },
      }
    } else {
      return {
        status: RequestResponseStatus.Error,
        error: { message: "Get threads: Something went wrong" },
      }
    }
  }

  public async getThread(id: string): Promise<RequestResponse<Thread>> {
    const response = await this.deviceService.request({
      endpoint: Endpoint.Messages,
      method: Method.Get,
      body: {
        category: PureMessagesCategory.thread,
        threadID: Number(id),
      },
    })

    if (isResponseSuccessWithData(response)) {
      return {
        status: response.status,
        data: ThreadPresenter.mapToThread(response.data),
      }
    } else {
      return {
        status: RequestResponseStatus.Error,
        error: { message: "Get thread: Something went wrong" },
      }
    }
  }
}
