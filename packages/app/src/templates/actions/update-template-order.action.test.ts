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

const errorMock = new UpdateTemplateOrderError("Something went wrong")

const mockStore = createMockStore([thunk])()

const template: Template = {
  id: "1",
  text: "Hello world!",
  lastUsedAt: "2",
  order: 1,
}

beforeEach(() => {
  mockStore.clearActions()
})

jest.mock("App/templates/requests/update-template-order.request")

describe("async `updateTemplateOrder`", () => {
  describe("when `updateTemplateOrderRequest` requests return success", () => {
    test("the updated template is returned", async () => {
      const updatedTemplate = {
        ...template,
        order: 2,
      }
      ;(updateTemplateOrderRequest as jest.Mock).mockReturnValue({
        data: { ...updatedTemplate },
        error: null,
      })

      const {
        meta: { requestId },
      } = await mockStore.dispatch(
        updateTemplateOrder({ ...updatedTemplate }) as unknown as AnyAction
      )

      expect(mockStore.getActions()).toEqual([
        updateTemplateOrder.pending(requestId, updatedTemplate),
        updateTemplateOrder.fulfilled(
          updatedTemplate,
          requestId,
          updatedTemplate
        ),
      ])

      expect(updateTemplateOrderRequest).toHaveBeenCalled()
    })
  })
  describe("when `updateTemplateOrderRequest` returns undefined `data` or `error` exists", () => {
    test("the action `updateTemplateOrder` is marked as `rejected`", async () => {
      ;(updateTemplateOrderRequest as jest.Mock).mockReturnValue({
        data: undefined,
        error: null,
      })
      const {
        meta: { requestId },
      } = await mockStore.dispatch(
        updateTemplateOrder(template) as unknown as AnyAction
      )

      expect(mockStore.getActions()).toEqual([
        updateTemplateOrder.pending(requestId, template),
        updateTemplateOrder.rejected(testError, requestId, template, errorMock),
      ])

      expect(updateTemplateOrderRequest).toHaveBeenCalled()
    })
  })
})
