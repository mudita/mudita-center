/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { AnyAction } from "@reduxjs/toolkit"
import thunk from "redux-thunk"
import createMockStore from "redux-mock-store"
import { testError } from "App/__deprecated__/renderer/store/constants"
import { CreateTemplateError } from "App/templates/errors"
import { NewTemplate, Template } from "App/templates/dto"
import { createTemplateRequest } from "App/templates/requests/create-template.request"
import { createTemplate } from "App/templates/actions/create-template.action"

const errorMock = new CreateTemplateError("Something went wrong")

const mockStore = createMockStore([thunk])()

const newTemplate: NewTemplate = {
  text: "Hello world!",
}

const template: Template = {
  id: "1",
  text: "Hello world!",
  lastUsedAt: "2",
}

beforeEach(() => {
  mockStore.clearActions()
})

jest.mock("App/templates/requests/create-template.request")

describe("async `createTemplate`", () => {
  describe("when `createTemplateRequest` requests return success", () => {
    test("fire async `createTemplate` returns created template", async () => {
      ;(createTemplateRequest as jest.Mock).mockReturnValue({
        data: template,
        error: null,
      })

      const {
        meta: { requestId },
      } = await mockStore.dispatch(
        createTemplate(newTemplate) as unknown as AnyAction
      )

      expect(mockStore.getActions()).toEqual([
        createTemplate.pending(requestId, newTemplate),
        createTemplate.fulfilled(template, requestId, newTemplate),
      ])

      expect(createTemplateRequest).toHaveBeenCalled()
    })
  })

  describe("when `createTemplateRequest` return undefined `data` or `error` exists", () => {
    test("fire async `createTemplate` returns `rejected` action if data is undefined", async () => {
      ;(createTemplateRequest as jest.Mock).mockReturnValue({
        data: undefined,
        error: null,
      })
      const {
        meta: { requestId },
      } = await mockStore.dispatch(
        createTemplate(newTemplate) as unknown as AnyAction
      )

      expect(mockStore.getActions()).toEqual([
        createTemplate.pending(requestId, newTemplate),
        createTemplate.rejected(testError, requestId, newTemplate, errorMock),
      ])

      expect(createTemplateRequest).toHaveBeenCalled()
    })

    test("fire async `createTemplate` returns `rejected` action if error is exist", async () => {
      ;(createTemplateRequest as jest.Mock).mockReturnValue({
        data: {},
        error: { data: "Some error" },
      })
      const {
        meta: { requestId },
      } = await mockStore.dispatch(
        createTemplate(newTemplate) as unknown as AnyAction
      )

      expect(mockStore.getActions()).toEqual([
        createTemplate.pending(requestId, newTemplate),
        createTemplate.rejected(
          testError,
          requestId,
          newTemplate,
          new CreateTemplateError("Some error")
        ),
      ])

      expect(createTemplateRequest).toHaveBeenCalled()
    })
  })
})
