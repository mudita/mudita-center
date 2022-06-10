/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Thread } from "App/messages/reducers/messages.interface"
import DeviceService from "App/__deprecated__/backend/device-service"
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
import { ThreadPresenter } from "App/messages/presenters"
import { isResponseSuccessWithData } from "App/core/helpers/is-responses-success-with-data.helpers"
import { ThreadRepository } from "App/messages/repositories"

export interface GetThreadsResponse {
  data: Thread[]
  totalCount: number
  nextPage?: PaginationBody
}

export class ThreadService {
  constructor(
    private deviceService: DeviceService,
    private threadRepository: ThreadRepository
  ) {}

  public async getThread(id: string): Promise<RequestResponse<Thread>> {
    // return this.getThreadRequest(id)
    return this.getThreadRequestViaWorkaround(id)
  }

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

  // Target method is getThreadRequest. This is workaround to handle no implemented `getThread` API
  private async getThreadRequestViaWorkaround(
    id: string
  ): Promise<RequestResponse<Thread>> {
    const response = await this.loadAllThreadsInSingleRequest({
      limit: 99999,
      offset: 0,
    })
    const success = isResponseSuccessWithData(response)
    const thread = response.data?.data.find((thread) => thread.id === id)
    if (success && thread) {
      return {
        status: response.status,
        data: thread,
      }
    } else {
      return {
        status: RequestResponseStatus.Error,
        error: { message: "Get thread: Something went wrong" },
      }
    }
  }

  private async loadAllThreadsInSingleRequest(
    pagination: PaginationBody,
    data: Thread[] = []
  ): Promise<RequestResponse<GetThreadsResponse>> {
    const response = await this.getThreads({
      ...pagination,
      limit: pagination.limit,
    })

    if (response.error || response.data === undefined) {
      return response
    }

    const threads = [...data, ...response.data.data]
    const accumulatedResponse = {
      ...response,
      data: {
        ...response.data,
        data: threads,
      },
    }

    if (response.data.nextPage === undefined) {
      // API no return nextPage (with offset) when client doesn't ask for more than API can return
      // the bellow method is a workaround helper - to remove after implementation by OS
      // https://appnroll.atlassian.net/browse/CP-780
      return returnResponseWithNextPage(accumulatedResponse, pagination)
    }

    const offsetDiff = response.data.nextPage.offset - pagination.offset
    const restLimit = pagination.limit - offsetDiff

    if (restLimit <= 0) {
      return accumulatedResponse
    }

    return this.loadAllThreadsInSingleRequest(
      {
        offset: response.data.nextPage.offset,
        limit: restLimit,
      },
      threads
    )
  }

  // @ts-ignore
  // the method is commented until os part will be implemented as CP-1232
  private async getThreadRequest(id: string): Promise<RequestResponse<Thread>> {
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

  public async toggleThreadsReadStatus(
    threads: Thread[]
  ): Promise<RequestResponse<Thread[]>> {
    const results = threads.map(async (thread) => {
      const { status } = await this.deviceService.request({
        endpoint: Endpoint.Messages,
        method: Method.Put,
        body: {
          category: PureMessagesCategory.thread,
          threadID: Number(thread.id),
          isUnread: !thread.unread,
        },
      })
      return {
        status,
        thread,
      }
    })

    const errorThreads = (await Promise.all(results))
      .filter(({ status }) => status === RequestResponseStatus.Error)
      .map(({ thread }) => thread)
    const successThreads = (await Promise.all(results))
      .filter(({ status }) => status === RequestResponseStatus.Ok)
      .map(({ thread }) => thread)

    if (errorThreads.length > 0) {
      successThreads.forEach((thread) =>
        this.threadRepository.update(thread, true)
      )

      return {
        status: RequestResponseStatus.Error,
        error: {
          message: "Delete thread: Something went wrong",
          data: errorThreads,
        },
      }
    } else {
      threads.forEach((thread) => this.threadRepository.update(thread, true))

      return {
        status: RequestResponseStatus.Ok,
      }
    }
  }

  public async deleteThreads(
    threadIds: string[]
  ): Promise<RequestResponse<string[]>> {
    const results = threadIds.map(async (id) => {
      const { status } = await this.deviceService.request({
        endpoint: Endpoint.Messages,
        method: Method.Delete,
        body: { category: PureMessagesCategory.thread, threadID: Number(id) },
      })
      return {
        status,
        id,
      }
    })

    const errorIds = (await Promise.all(results))
      .filter(({ status }) => status === RequestResponseStatus.Error)
      .map(({ id }) => id)
    const successIds = (await Promise.all(results))
      .filter(({ status }) => status === RequestResponseStatus.Ok)
      .map(({ id }) => id)

    if (errorIds.length > 0) {
      successIds.forEach((id) => this.threadRepository.delete(id, true))

      return {
        status: RequestResponseStatus.Error,
        error: {
          message: "Delete thread: Something went wrong",
          data: errorIds,
        },
      }
    } else {
      threadIds.forEach((id) => this.threadRepository.delete(id, true))

      return {
        status: RequestResponseStatus.Ok,
      }
    }
  }
}

const returnResponseWithNextPage = (
  response: RequestResponse<GetThreadsResponse>,
  pagination: PaginationBody
): RequestResponse<GetThreadsResponse> => {
  if (response.data === undefined) {
    return response
  }

  const offset = pagination.offset + pagination.limit
  const nextPage: PaginationBody | undefined =
    offset < response.data.totalCount
      ? {
          offset,
          limit: 0,
        }
      : undefined

  return {
    ...response,
    data: {
      ...response.data,
      nextPage,
    },
  }
}
