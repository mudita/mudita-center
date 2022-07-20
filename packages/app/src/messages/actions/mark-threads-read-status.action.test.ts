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
import { testError } from "App/__deprecated__/renderer/store/constants"
import { toggleThreadsReadStatusRequest } from "App/messages/requests"
import { Thread } from "App/messages/dto"
import { markThreadsReadStatus } from "App/messages/actions/mark-threads-read-status.action"
import { MessagesError, MessageType } from "App/messages/constants"
import { AppError } from "App/core/errors"

jest.mock("App/messages/requests/toggle-threads-read-status.request")

const thread: Thread = {
  id: "1",
  phoneNumber: "+48 755 853 216",
  lastUpdatedAt: new Date("2020-06-01T13:53:27.087Z"),
  messageSnippet:
    "Exercitationem vel quasi doloremque. Enim qui quis quidem eveniet est corrupti itaque recusandae.",
  unread: true,
  messageType: MessageType.INBOX,
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

describe("`markThreadsReadStatus`", () => {
  describe("when `toggleThreadsReadStatus` request return success", () => {
    test("`markThreadsReadStatus` returns thread", async () => {
      ;(toggleThreadsReadStatusRequest as jest.Mock).mockReturnValue(
        successDeviceResponse
      )
      const mockStore = createMockStore([thunk])()
      const {
        meta: { requestId },
      } = await mockStore.dispatch(
        markThreadsReadStatus([thread]) as unknown as AnyAction
      )

      expect(mockStore.getActions()).toEqual([
        markThreadsReadStatus.pending(requestId, [thread]),
        markThreadsReadStatus.fulfilled([thread], requestId, [thread]),
      ])

      expect(toggleThreadsReadStatusRequest).toHaveBeenCalled()
    })
  })

  describe("when `toggleThreadsReadStatus` request return error", () => {
    test("fire `markThreadsReadStatus` returns `rejected` action", async () => {
      ;(toggleThreadsReadStatusRequest as jest.Mock).mockReturnValue(
        errorDeviceResponse
      )
      const errorMock = new AppError(
        MessagesError.MarkThreadsReadStatus,
        "Mark threads read status request failed"
      )
      const mockStore = createMockStore([thunk])()
      const {
        meta: { requestId },
      } = await mockStore.dispatch(
        markThreadsReadStatus([thread]) as unknown as AnyAction
      )

      expect(mockStore.getActions()).toEqual([
        markThreadsReadStatus.pending(requestId, [thread]),
        markThreadsReadStatus.rejected(
          testError,
          requestId,
          [thread],
          errorMock
        ),
      ])

      expect(toggleThreadsReadStatusRequest).toHaveBeenCalled()
    })

    test("fire `markThreadsReadStatus` returns any success data", async () => {
      ;(toggleThreadsReadStatusRequest as jest.Mock).mockReturnValue(
        errorWithDataDeviceResponse
      )
      const mockStore = createMockStore([thunk])()
      const {
        meta: { requestId },
      } = await mockStore.dispatch(
        markThreadsReadStatus([thread]) as unknown as AnyAction
      )

      expect(mockStore.getActions()).toEqual([
        markThreadsReadStatus.pending(requestId, [thread]),
        markThreadsReadStatus.fulfilled([thread], requestId, [thread]),
      ])

      expect(toggleThreadsReadStatusRequest).toHaveBeenCalled()
    })
  })
})
