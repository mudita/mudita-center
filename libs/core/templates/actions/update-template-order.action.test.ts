/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { AnyAction } from "@reduxjs/toolkit"
import { AppError } from "Core/core/errors"
import { updateTemplateOrder } from "Core/templates/actions/update-template-order.action"
import { TemplateError } from "Core/templates/constants"
import { Template } from "Core/templates/dto"
import { updateTemplateOrderRequest } from "Core/templates/requests/update-template-order.request"
import { testError } from "Core/__deprecated__/renderer/store/constants"
import createMockStore from "redux-mock-store"
import thunk from "redux-thunk"

import {
  RequestResponse,
  RequestResponseStatus,
} from "Core/core/types/request-response.interface"

jest.mock("Core/templates/requests/update-template-order.request")

const errorMock = new AppError(TemplateError.UpdateTemplateOrder, "I'm error")
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
    test("the updated template is returned", async () => {
      const updatedTemplate = {
        ...template,
        order: 2,
      }
      ;(updateTemplateOrderRequest as jest.Mock).mockReturnValue({
        data: [{ ...updatedTemplate }],
        error: null,
      })

      const {
        meta: { requestId },
        // AUTO DISABLED - fix me if you like :)
        // eslint-disable-next-line @typescript-eslint/await-thenable
      } = await mockStore.dispatch(
        updateTemplateOrder([{ ...updatedTemplate }]) as unknown as AnyAction
      )

      expect(mockStore.getActions()).toEqual([
        updateTemplateOrder.pending(requestId, [updatedTemplate]),
        updateTemplateOrder.fulfilled([updatedTemplate], requestId, [
          updatedTemplate,
        ]),
      ])

      expect(updateTemplateOrderRequest).toHaveBeenCalled()
    })
  })

  describe("when `updateTemplateOrderRequest` returns error`", () => {
    test("the action `updateTemplateOrder` is marked as `rejected`", async () => {
      ;(updateTemplateOrderRequest as jest.Mock).mockReturnValue(errorResponse)
      const {
        meta: { requestId },
        // AUTO DISABLED - fix me if you like :)
        // eslint-disable-next-line @typescript-eslint/await-thenable
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
