/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import createMockStore from "redux-mock-store"
import thunk from "redux-thunk"
import { AnyAction } from "@reduxjs/toolkit"
import { ReduxRootState, RootState } from "App/__deprecated__/renderer/store"
import { DeviceState } from "App/device"
import sendTicketRequest, {
  CreateBugTicketResponse,
  CreateBugTicketResponseStatus,
} from "App/contact-support/requests/send-ticket.request"
import {
  sendTicket,
  SendTicketPayload,
} from "App/contact-support/actions/send-ticket.action"
import { testError } from "App/__deprecated__/renderer/store/constants"
import { SendTicketError } from "App/contact-support/errors"

jest.mock("App/contact-support/requests/send-ticket.request")

const successResponse: CreateBugTicketResponse = {
  status: CreateBugTicketResponseStatus.Ok,
}

const errorResponse: CreateBugTicketResponse = {
  status: CreateBugTicketResponseStatus.Error,
}

const payload: SendTicketPayload = {
  description: "",
  email: "",
}

const state: Partial<RootState & ReduxRootState> = {
  device: {
    data: undefined,
  } as unknown as DeviceState,
}

afterEach(() => {
  jest.resetAllMocks()
})

describe("async `sendTicket` ", () => {
  describe("when request return success", () => {
    test("fire async `sendTicket`", async () => {
      ;(sendTicketRequest as jest.Mock).mockReturnValue(successResponse)
      const store = createMockStore([thunk])(state)
      const {
        meta: { requestId },
      } = await store.dispatch(sendTicket(payload) as unknown as AnyAction)

      expect(store.getActions()).toEqual([
        sendTicket.pending(requestId, payload),
        sendTicket.fulfilled(undefined, requestId, payload),
      ])

      expect(sendTicketRequest).toHaveBeenCalled()
    })
  })

  describe("when request return error", () => {
    test("fire async `sendTicket` returns `rejected` action", async () => {
      const errorMock = new SendTicketError("Send ticket throw error")
      ;(sendTicketRequest as jest.Mock).mockReturnValue(errorResponse)
      const store = createMockStore([thunk])(state)
      const {
        meta: { requestId },
      } = await store.dispatch(sendTicket(payload) as unknown as AnyAction)

      expect(store.getActions()).toEqual([
        sendTicket.pending(requestId, payload),
        sendTicket.rejected(testError, requestId, payload, errorMock),
      ])

      expect(sendTicketRequest).toHaveBeenCalled()
    })
  })
})
