/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import createMockStore from "redux-mock-store"
import thunk from "redux-thunk"
import { AnyAction } from "@reduxjs/toolkit"
import {
  RequestResponse,
  RequestResponseStatus,
} from "App/core/types/request-response.interface"
import { CreateMessageDataResponse } from "App/messages/services"
import { ToggleThreadReadStatusError } from "App/messages/errors"
import { testError } from "Renderer/store/constants"
import { toggleThreadReadStatusRequest } from "App/messages/requests"
import { Thread } from "App/messages/reducers/messages.interface"
import { toggleThreadReadStatus } from "App/messages/actions/toggle-thread-read-status.action"

jest.mock("App/messages/requests/toggle-thread-read-status.request")

const thread: Thread = {
  id: "1",
  phoneNumber: "+48 755 853 216",
  lastUpdatedAt: new Date("2020-06-01T13:53:27.087Z"),
  messageSnippet:
    "Exercitationem vel quasi doloremque. Enim qui quis quidem eveniet est corrupti itaque recusandae.",
  unread: true,
}

const successDeviceResponse: RequestResponse<CreateMessageDataResponse> = {
  status: RequestResponseStatus.Ok,
}

const errorDeviceResponse: RequestResponse = {
  status: RequestResponseStatus.Error,
  error: {
    message: "I'm error",
  },
}

const errorWithDataDeviceResponse: RequestResponse = {
  status: RequestResponseStatus.Error,
  error: {
    message: "I'm error",
    data: [thread],
  },
}

afterEach(() => {
  jest.resetAllMocks()
})

describe("`toggleThreadReadStatus`", () => {
  describe("when `toggleThreadReadStatus` request return success", () => {
    test("`toggleThreadReadStatus` returns thread", async () => {
      ;(toggleThreadReadStatusRequest as jest.Mock).mockReturnValue(
        successDeviceResponse
      )
      const mockStore = createMockStore([thunk])()
      const {
        meta: { requestId },
      } = await mockStore.dispatch(
        toggleThreadReadStatus([thread]) as unknown as AnyAction
      )

      expect(mockStore.getActions()).toEqual([
        toggleThreadReadStatus.pending(requestId, [thread]),
        toggleThreadReadStatus.fulfilled([thread], requestId, [thread]),
      ])

      expect(toggleThreadReadStatusRequest).toHaveBeenCalled()
    })
  })

  describe("when `toggleThreadReadStatus` request return error", () => {
    test("fire `toggleThreadReadStatus` returns `rejected` action", async () => {
      ;(toggleThreadReadStatusRequest as jest.Mock).mockReturnValue(
        errorDeviceResponse
      )
      const errorMock = new ToggleThreadReadStatusError(
        "Toggle thread read status request failed"
      )
      const mockStore = createMockStore([thunk])()
      const {
        meta: { requestId },
      } = await mockStore.dispatch(
        toggleThreadReadStatus([thread]) as unknown as AnyAction
      )

      expect(mockStore.getActions()).toEqual([
        toggleThreadReadStatus.pending(requestId, [thread]),
        toggleThreadReadStatus.rejected(
          testError,
          requestId,
          [thread],
          errorMock
        ),
      ])

      expect(toggleThreadReadStatusRequest).toHaveBeenCalled()
    })

    test("fire `toggleThreadReadStatus` returns any success data", async () => {
      ;(toggleThreadReadStatusRequest as jest.Mock).mockReturnValue(
        errorWithDataDeviceResponse
      )
      const mockStore = createMockStore([thunk])()
      const {
        meta: { requestId },
      } = await mockStore.dispatch(
        toggleThreadReadStatus([thread]) as unknown as AnyAction
      )

      expect(mockStore.getActions()).toEqual([
        toggleThreadReadStatus.pending(requestId, [thread]),
        toggleThreadReadStatus.fulfilled([thread], requestId, [thread]),
      ])

      expect(toggleThreadReadStatusRequest).toHaveBeenCalled()
    })
  })
})
