/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import createMockStore from "redux-mock-store"
import thunk from "redux-thunk"
import { AnyAction } from "@reduxjs/toolkit"
import { deleteThreads } from "App/messages/actions/delete-threads.action"
import {
  RequestResponse,
  RequestResponseStatus,
} from "App/core/types/request-response.interface"
import { CreateMessageDataResponse } from "App/messages/services"
import { deleteThreadsRequest } from "App/messages/requests"
import { DeleteThreadError } from "App/messages/errors"
import { testError } from "Renderer/store/constants"

jest.mock("App/messages/requests/delete-threads.request")

const successDeviceResponse: RequestResponse<CreateMessageDataResponse> = {
  status: RequestResponseStatus.Ok,
}

const errorDeviceResponse: RequestResponse = {
  status: RequestResponseStatus.Error,
  error: {
    message: "I'm error",
  },
}

afterEach(() => {
  jest.resetAllMocks()
})

describe("`deleteThreads`", () => {
  describe("when `deleteThreads` request return success", () => {
    test("`deleteThreads` returns thread id", async () => {
      ;(deleteThreadsRequest as jest.Mock).mockReturnValue(
        successDeviceResponse
      )
      const mockStore = createMockStore([thunk])()
      const {
        meta: { requestId },
      } = await mockStore.dispatch(deleteThreads(["1"]) as unknown as AnyAction)

      expect(mockStore.getActions()).toEqual([
        deleteThreads.pending(requestId, ["1"]),
        deleteThreads.fulfilled(["1"], requestId, ["1"]),
      ])

      expect(deleteThreadsRequest).toHaveBeenCalled()
    })
  })

  describe("when `deleteThreads` request return error", () => {
    test("fire `deleteThreads` returns `rejected` action", async () => {
      ;(deleteThreadsRequest as jest.Mock).mockReturnValue(errorDeviceResponse)
      const errorMock = new DeleteThreadError("Delete Thread request failed")
      const mockStore = createMockStore([thunk])()
      const {
        meta: { requestId },
      } = await mockStore.dispatch(deleteThreads(["1"]) as unknown as AnyAction)

      expect(mockStore.getActions()).toEqual([
        deleteThreads.pending(requestId, ["1"]),
        deleteThreads.rejected(testError, requestId, ["1"], errorMock),
      ])

      expect(deleteThreadsRequest).toHaveBeenCalled()
    })
  })
})
