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
import { testError } from "App/__deprecated__/renderer/store/constants"
import { Message } from "App/messages/dto"
import { MessageType } from "App/messages/constants"

jest.mock("App/messages/requests/delete-threads.request")

const message: Message = {
  id: "27a7108d-d5b8-4bb5-87bc-2cfebcecd571",
  date: new Date("2019-10-18T11:27:15.256Z"),
  content:
    "Adipisicing non qui Lorem aliqua officia laboris ad reprehenderit dolor mollit.",
  threadId: "1",
  phoneNumber: "+48 755 853 216",
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
    data: [message.threadId],
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
      } = await mockStore.dispatch(
        deleteThreads([message.threadId]) as unknown as AnyAction
      )

      expect(mockStore.getActions()).toEqual([
        deleteThreads.pending(requestId, [message.threadId]),
        deleteThreads.fulfilled([message.threadId], requestId, [
          message.threadId,
        ]),
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
      } = await mockStore.dispatch(
        deleteThreads([message.threadId]) as unknown as AnyAction
      )

      expect(mockStore.getActions()).toEqual([
        deleteThreads.pending(requestId, [message.threadId]),
        deleteThreads.rejected(
          testError,
          requestId,
          [message.threadId],
          errorMock
        ),
      ])

      expect(deleteThreadsRequest).toHaveBeenCalled()
    })

    test("fire `deleteThreads` returns any success data", async () => {
      ;(deleteThreadsRequest as jest.Mock).mockReturnValue(
        errorWithDataDeviceResponse
      )
      const mockStore = createMockStore([thunk])()
      const {
        meta: { requestId },
      } = await mockStore.dispatch(
        deleteThreads([message.threadId]) as unknown as AnyAction
      )

      expect(mockStore.getActions()).toEqual([
        deleteThreads.pending(requestId, [message.threadId]),
        deleteThreads.fulfilled([message.threadId], requestId, [
          message.threadId,
        ]),
      ])

      expect(deleteThreadsRequest).toHaveBeenCalled()
    })
  })
})
