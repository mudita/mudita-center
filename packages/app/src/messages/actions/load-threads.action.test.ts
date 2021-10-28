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
import { loadThreads } from "App/messages/actions/load-threads.action"
import { GetThreadsResponse } from "Backend/adapters/pure-phone-messages/pure-phone-messages.class"
import { LoadThreadsError } from "App/messages/errors"
import { Thread } from "App/messages/reducers"
import { PaginationBody } from "@mudita/pure"

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
  },
}

const errorDeviceResponse: DeviceResponse = {
  status: DeviceResponseStatus.Error,
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
      ;(getThreads as jest.Mock).mockReturnValue(successDeviceResponse)
      const mockStore = createMockStore([thunk])()
      const {
        meta: { requestId },
      } = await mockStore.dispatch(
        loadThreads(pagination) as unknown as AnyAction
      )

      expect(mockStore.getActions()).toEqual([
        loadThreads.pending(requestId, pagination),
        {
          type: MessagesEvent.SetThreads,
          payload: threads,
        },
        loadThreads.fulfilled(undefined, requestId, pagination),
      ])

      expect(getThreads).toHaveBeenCalled()
    })
  })

  describe("when `getThreads` request return error", () => {
    test("fire async `loadThreads` returns `rejected` action", async () => {
      ;(getThreads as jest.Mock).mockReturnValue(errorDeviceResponse)
      const errorMock = new LoadThreadsError("Get Threads request failed")
      const mockStore = createMockStore([thunk])()
      const {
        meta: { requestId },
      } = await mockStore.dispatch(
        loadThreads(pagination) as unknown as AnyAction
      )

      expect(mockStore.getActions()).toEqual([
        loadThreads.pending(requestId, pagination),
        loadThreads.rejected(testError, requestId, pagination, errorMock),
      ])

      expect(getThreads).toHaveBeenCalled()
    })
  })
})
