/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import createMockStore from "redux-mock-store"
import thunk from "redux-thunk"
import { AnyAction } from "@reduxjs/toolkit"
import { MessagesEvent } from "App/messages/constants"
import { testError } from "Renderer/store/constants"
import { getThreadsRequest } from "App/messages/requests"
import { loadThreads } from "App/messages/actions/load-threads.action"
import { LoadThreadsError } from "App/messages/errors"
import { initialState, Thread } from "App/messages/reducers"
import { PaginationBody } from "@mudita/pure"
import {
  RequestResponse,
  RequestResponseStatus,
} from "App/core/types/request-response.interface"
import { GetThreadsResponse } from "App/messages/services"

jest.mock("App/messages/requests/get-threads.request")

const threads: Thread[] = [
  {
    id: "1",
    phoneNumber: "+48 755 853 216",
    lastUpdatedAt: new Date("2020-06-01T13:53:27.087Z"),
    messageSnippet:
      "Exercitationem vel quasi doloremque. Enim qui quis quidem eveniet est corrupti itaque recusandae.",
    unread: true,
  },
]

const successDeviceResponse: RequestResponse<GetThreadsResponse> = {
  status: RequestResponseStatus.Ok,
  data: {
    data: threads,
    totalCount: threads.length,
  },
}

const emptyDataSuccessDeviceResponse: RequestResponse<GetThreadsResponse> = {
  status: RequestResponseStatus.Ok,
  data: {
    data: [],
    totalCount: 0,
  },
}

const errorDeviceResponse: RequestResponse = {
  status: RequestResponseStatus.Error,
}

const pagination: PaginationBody = {
  limit: 5,
  offset: 0,
}

afterEach(() => {
  jest.resetAllMocks()
})

describe("async `loadThreads` ", () => {
  describe("when `getThreads` request return success", () => {
    test("fire async `loadThreads` call `setThreads`", async () => {
      ;(getThreadsRequest as jest.Mock).mockReturnValue(successDeviceResponse)
      const mockStore = createMockStore([thunk])({
        messages: initialState,
      })
      const {
        meta: { requestId },
      } = await mockStore.dispatch(
        loadThreads(pagination) as unknown as AnyAction
      )

      expect(mockStore.getActions()).toEqual([
        loadThreads.pending(requestId, pagination),
        {
          type: MessagesEvent.SetThreadsTotalCount,
          payload: threads.length,
        },
        {
          type: MessagesEvent.SetThreads,
          payload: threads,
        },
        loadThreads.fulfilled(undefined, requestId, pagination),
      ])

      expect(getThreadsRequest).toHaveBeenCalled()
    })
  })

  describe("when `getThreads` request return error", () => {
    test("fire async `loadThreads` returns `rejected` action", async () => {
      ;(getThreadsRequest as jest.Mock).mockReturnValue(errorDeviceResponse)
      const errorMock = new LoadThreadsError("Get Threads request failed")
      const mockStore = createMockStore([thunk])({
        messages: initialState,
      })
      const {
        meta: { requestId },
      } = await mockStore.dispatch(
        loadThreads(pagination) as unknown as AnyAction
      )

      expect(mockStore.getActions()).toEqual([
        loadThreads.pending(requestId, pagination),
        loadThreads.rejected(testError, requestId, pagination, errorMock),
      ])

      expect(getThreadsRequest).toHaveBeenCalled()
    })
  })

  describe("when messages state has some data and request return success with empty data", () => {
    test("fire `getThreads` call `clearAllThreads` and `getThreads` to loads first records", async () => {
      let index = 0
      ;(getThreadsRequest as jest.Mock).mockImplementation(() => {
        if (index === 0) {
          index++
          return emptyDataSuccessDeviceResponse
        } else {
          return successDeviceResponse
        }
      })
      const mockStore = createMockStore([thunk])({
        messages: { ...initialState, threadsTotalCount: threads.length },
      })
      const {
        meta: { requestId },
      } = await mockStore.dispatch(
        loadThreads(pagination) as unknown as AnyAction
      )

      expect(mockStore.getActions()).toEqual([
        loadThreads.pending(requestId, pagination),
        {
          type: MessagesEvent.SetThreadsTotalCount,
          payload: threads.length,
        },
        {
          type: MessagesEvent.SetThreads,
          payload: threads,
        },
        loadThreads.fulfilled(undefined, requestId, pagination),
      ])

      expect(getThreadsRequest).toHaveBeenCalledTimes(2)
    })
  })

  describe("when messages state has some data and request return lower `threadsTotalCount` value", () => {
    test("fire `getThreads` loads first records", async () => {
      let index = 0
      ;(getThreadsRequest as jest.Mock).mockImplementation(() => {
        if (index === 0) {
          index++
          return emptyDataSuccessDeviceResponse
        } else {
          return successDeviceResponse
        }
      })
      const mockStore = createMockStore([thunk])({
        messages: { ...initialState, threadsTotalCount: 2 },
      })
      const {
        meta: { requestId },
      } = await mockStore.dispatch(
        loadThreads(pagination) as unknown as AnyAction
      )

      expect(mockStore.getActions()).toEqual([
        loadThreads.pending(requestId, pagination),
        {
          type: MessagesEvent.SetThreadsTotalCount,
          payload: threads.length,
        },
        {
          type: MessagesEvent.SetThreads,
          payload: threads,
        },
        loadThreads.fulfilled(undefined, requestId, pagination),
      ])

      expect(getThreadsRequest).toHaveBeenCalledTimes(2)
    })
  })
})
