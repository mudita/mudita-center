/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { AnyAction } from "@reduxjs/toolkit"
import {
  sendTicket,
  SendTicketPayload,
} from "App/contact-support/actions/send-ticket.action"
import { ContactSupportError } from "App/contact-support/constants/errors.enum"
import sendTicketRequest, {
  CreateBugTicketResponse,
  CreateBugTicketResponseStatus,
} from "App/contact-support/requests/send-ticket.request"
import { AppError } from "App/core/errors"
import { DeviceState, DeviceType } from "App/device"
import { ReduxRootState, RootState } from "App/__deprecated__/renderer/store"
import { testError } from "App/__deprecated__/renderer/store/constants"
import { FreshdeskTicketProduct } from "App/__deprecated__/renderer/utils/create-freshdesk-ticket/create-freshdesk-ticket.types"
import createMockStore from "redux-mock-store"
import thunk from "redux-thunk"

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
    deviceType: DeviceType.MuditaPure,
  } as unknown as DeviceState,
}

const formattedDescription = `Hello

World
...
Bye`

afterEach(() => {
  jest.resetAllMocks()
})

describe("async `sendTicket` ", () => {
  describe("description formatting", () => {
    test("description properly formatted with `<br/>` tag", async () => {
      ;(sendTicketRequest as jest.Mock).mockReturnValue(successResponse)
      const store = createMockStore([thunk])(state)
      const {
        meta: { requestId },
        // AUTO DISABLED - fix me if you like :)
        // eslint-disable-next-line @typescript-eslint/await-thenable
      } = await store.dispatch(
        sendTicket({
          ...payload,
          description: "Hello\n\nWorld\n...\nBye",
        }) as unknown as AnyAction
      )

      expect(store.getActions()).toEqual([
        sendTicket.pending(requestId, {
          ...payload,
          description: formattedDescription,
        }),
        sendTicket.fulfilled(undefined, requestId, {
          ...payload,
          description: formattedDescription,
        }),
      ])

      expect(sendTicketRequest).toHaveBeenCalledWith({
        email: "",
        subject: "Error",
        serialNumber: undefined,
        description: "Hello<br/><br/>World<br/>...<br/>Bye",
        product: FreshdeskTicketProduct.Pure,
      })
    })
  })

  describe("when request return success", () => {
    test("fire async `sendTicket`", async () => {
      ;(sendTicketRequest as jest.Mock).mockReturnValue(successResponse)
      const store = createMockStore([thunk])(state)
      const {
        meta: { requestId },
        // AUTO DISABLED - fix me if you like :)
        // eslint-disable-next-line @typescript-eslint/await-thenable
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
      const errorMock = new AppError(
        ContactSupportError.SendTicket,
        "Send ticket throw error"
      )
      ;(sendTicketRequest as jest.Mock).mockReturnValue(errorResponse)
      const store = createMockStore([thunk])(state)
      const {
        meta: { requestId },
        // AUTO DISABLED - fix me if you like :)
        // eslint-disable-next-line @typescript-eslint/await-thenable
      } = await store.dispatch(sendTicket(payload) as unknown as AnyAction)

      expect(store.getActions()).toEqual([
        sendTicket.pending(requestId, payload),
        sendTicket.rejected(testError, requestId, payload, errorMock),
      ])

      expect(sendTicketRequest).toHaveBeenCalled()
    })
  })
})
