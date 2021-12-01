/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import createMockStore from "redux-mock-store"
import thunk from "redux-thunk"
import { AnyAction } from "@reduxjs/toolkit"
import { MessagesEvent } from "App/messages/constants"
import { testError } from "Renderer/store/constants"
import DeviceResponse, {
  DeviceResponseStatus,
} from "Backend/adapters/device-response.interface"
import getThreads from "Renderer/requests/get-threads.request"
import { loadThreadsTotalCount } from "App/messages/actions/load-threads-total-count.action"
import { GetThreadsResponse } from "Backend/adapters/pure-phone-messages/pure-phone-messages.class"
import { LoadThreadsError } from "App/messages/errors"
import { initialState, Thread } from "App/messages/reducers"

jest.mock("Renderer/requests/get-threads.request")

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

const successDeviceResponse: DeviceResponse<GetThreadsResponse> = {
  status: DeviceResponseStatus.Ok,
  data: {
    data: threads,
    totalCount: threads.length,
  },
}

const errorDeviceResponse: DeviceResponse = {
  status: DeviceResponseStatus.Error,
}

afterEach(() => {
  jest.resetAllMocks()
})

describe("async `loadThreadsTotalCount` ", () => {
  describe("when `getThreads` request return success", () => {
    test("fire async `loadThreadsTotalCount` call `SetThreadsTotalCount`", async () => {
      ;(getThreads as jest.Mock).mockReturnValue(successDeviceResponse)
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

      expect(getThreads).toHaveBeenCalled()
    })
  })

  describe("when `getThreads` request return error", () => {
    test("fire async `loadThreadsTotalCount` returns `rejected` action", async () => {
      ;(getThreads as jest.Mock).mockReturnValue(errorDeviceResponse)
      const errorMock = new LoadThreadsError("Get Threads request failed")
      const mockStore = createMockStore([thunk])({ messages: initialState } )
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

      expect(getThreads).toHaveBeenCalled()
    })
  })

  describe("when messages state has some data and request return lower `threadsTotalCount` value", () => {
    test("fire `loadThreadsTotalCount` call `clearAllThreads`", async () => {
      ;(getThreads as jest.Mock).mockReturnValue(successDeviceResponse)
      const mockStore = createMockStore([thunk])({
        messages: { ...initialState, threadsTotalCount: 2 },
      } )
      const {
        meta: { requestId },
      } = await mockStore.dispatch(
        loadThreadsTotalCount() as unknown as AnyAction
      )

      expect(mockStore.getActions()).toEqual([
        loadThreadsTotalCount.pending(requestId, undefined),
        {
          type: MessagesEvent.ClearAllThreads,
          payload: undefined,
        },
        loadThreadsTotalCount.fulfilled(undefined, requestId, undefined),
      ])

      expect(getThreads).toHaveBeenCalled()
    })
  })
})
