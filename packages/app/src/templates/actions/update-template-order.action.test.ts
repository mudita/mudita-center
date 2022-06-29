/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { AnyAction } from "@reduxjs/toolkit"
import thunk from "redux-thunk"
import createMockStore from "redux-mock-store"
import { testError } from "App/__deprecated__/renderer/store/constants"
import { UpdateTemplateOrderError } from "App/templates/errors"
import { Template } from "App/templates/dto"
import { updateTemplateOrderRequest } from "App/templates/requests/update-template-order.request"
import { updateTemplateOrder } from "App/templates/actions/update-template-order.action"
import {
  RequestResponse,
  RequestResponseStatus,
} from "App/core/types/request-response.interface"

jest.mock("App/templates/requests/update-template-order.request")

const errorMock = new UpdateTemplateOrderError(
  "Update Templates Order request failed"
)

const mockStore = createMockStore([thunk])()

const template: Template = {
  id: "1",
  text: "Hello world!",
  lastUsedAt: "2",
  order: 1,
}

const secondTemplate: Template = {
  id: "2",
  text: "Hello world! Second text",
  lastUsedAt: "2",
  order: 2,
}

const errorResponse: RequestResponse = {
  status: RequestResponseStatus.Error,
  error: {
    message: "I'm error",
  },
}

beforeEach(() => {
  mockStore.clearActions()
})

describe("async `updateTemplateOrder`", () => {
  describe("when `updateTemplateOrderRequest` requests return success", () => {
    test("fire async `updateTemplateOrder` returns updated template", async () => {
      ;(updateTemplateOrderRequest as jest.Mock).mockReturnValue({
        data: [template, secondTemplate],
        error: null,
      })

      const {
        meta: { requestId },
      } = await mockStore.dispatch(
        updateTemplateOrder([template, secondTemplate]) as unknown as AnyAction
      )

      expect(mockStore.getActions()).toEqual([
        updateTemplateOrder.pending(requestId, [template, secondTemplate]),
        updateTemplateOrder.fulfilled([template, secondTemplate], requestId, [
          template,
          secondTemplate,
        ]),
      ])

      expect(updateTemplateOrderRequest).toHaveBeenCalled()
    })
  })

  describe("when `updateTemplateOrderRequest` returns error`", () => {
    test("fire async `updateTemplateOrder` returns `rejected` action", async () => {
      ;(updateTemplateOrderRequest as jest.Mock).mockReturnValue(errorResponse)
      const {
        meta: { requestId },
      } = await mockStore.dispatch(
        updateTemplateOrder([template, secondTemplate]) as unknown as AnyAction
      )

      expect(mockStore.getActions()).toEqual([
        updateTemplateOrder.pending(requestId, [template, secondTemplate]),
        updateTemplateOrder.rejected(
          testError,
          requestId,
          [template, secondTemplate],
          errorMock
        ),
      ])

      expect(updateTemplateOrderRequest).toHaveBeenCalled()
    })
  })
})
