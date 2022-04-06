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
import { loadThreadsTotalCount } from "App/messages/actions/load-threads-total-count.action"
import { LoadThreadsError } from "App/messages/errors"
import { initialState, Thread } from "App/messages/reducers"
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

const errorDeviceResponse: RequestResponse = {
  status: RequestResponseStatus.Error,
}

afterEach(() => {
  jest.resetAllMocks()
})

describe("async `loadThreadsTotalCount` ", () => {
  describe("when `getThreads` request return success", () => {
    test("fire async `loadThreadsTotalCount` call `SetThreadsTotalCount`", async () => {
      ;(getThreadsRequest as jest.Mock).mockReturnValue(successDeviceResponse)
      const mockStore = createMockStore([thunk])({ messages: initialState })
      const {
        meta: { requestId },
      } = await mockStore.dispatch(
        loadThreadsTotalCount() as unknown as AnyAction
      )

      expect(mockStore.getActions()).toEqual([
        loadThreadsTotalCount.pending(requestId, undefined),
        {
          type: MessagesEvent.SetThreadsTotalCount,
          payload: threads.length,
        },
        loadThreadsTotalCount.fulfilled(undefined, requestId, undefined),
      ])

      expect(getThreadsRequest).toHaveBeenCalled()
    })
  })

  describe("when `getThreads` request return error", () => {
    test("fire async `loadThreadsTotalCount` returns `rejected` action", async () => {
      ;(getThreadsRequest as jest.Mock).mockReturnValue(errorDeviceResponse)
      const errorMock = new LoadThreadsError("Get Threads request failed")
      const mockStore = createMockStore([thunk])({ messages: initialState })
      const {
        meta: { requestId },
      } = await mockStore.dispatch(
        loadThreadsTotalCount() as unknown as AnyAction
      )

      expect(mockStore.getActions()).toEqual([
        loadThreadsTotalCount.pending(requestId, undefined),
        loadThreadsTotalCount.rejected(
          testError,
          requestId,
          undefined,
          errorMock
        ),
      ])

      expect(getThreadsRequest).toHaveBeenCalled()
    })
  })

  describe("when messages state has some data and request return lower `threadsTotalCount` value", () => {
    test("fire `loadThreadsTotalCount`", async () => {
      ;(getThreadsRequest as jest.Mock).mockReturnValue(successDeviceResponse)
      const mockStore = createMockStore([thunk])({
        messages: { ...initialState, threadsTotalCount: 2 },
      })
      const {
        meta: { requestId },
      } = await mockStore.dispatch(
        loadThreadsTotalCount() as unknown as AnyAction
      )

      expect(mockStore.getActions()).toEqual([
        loadThreadsTotalCount.pending(requestId, undefined),
        loadThreadsTotalCount.fulfilled(undefined, requestId, undefined),
      ])

      expect(getThreadsRequest).toHaveBeenCalled()
    })
  })
})
