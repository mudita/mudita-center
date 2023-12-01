/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { AnyAction } from "@reduxjs/toolkit"
import { AppError } from "App/core/errors"
import { createTemplate } from "App/templates/actions/create-template.action"
import { TemplateError } from "App/templates/constants"
import { NewTemplate, Template } from "App/templates/dto"
import { createTemplateRequest } from "App/templates/requests/create-template.request"
import { testError } from "App/__deprecated__/renderer/store/constants"
import createMockStore from "redux-mock-store"
import thunk from "redux-thunk"

const errorMock = new AppError(
  TemplateError.CreateTemplate,
  "Something went wrong"
)

const mockStore = createMockStore([thunk])()

const newTemplate: NewTemplate = {
  text: "Hello world!",
  order: 1,
}

const template: Template = {
  id: "1",
  text: "Hello world!",
  lastUsedAt: "2",
  order: 1,
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
        // AUTO DISABLED - fix me if you like :)
        // eslint-disable-next-line @typescript-eslint/await-thenable
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
        // AUTO DISABLED - fix me if you like :)
        // eslint-disable-next-line @typescript-eslint/await-thenable
      } = await mockStore.dispatch(
        createTemplate(newTemplate) as unknown as AnyAction
      )

      expect(mockStore.getActions()).toEqual([
        createTemplate.pending(requestId, newTemplate),
        createTemplate.rejected(testError, requestId, newTemplate, errorMock),
      ])

      expect(createTemplateRequest).toHaveBeenCalled()
    })

    test("fire async `createTemplate` returns `rejected` action if error exists", async () => {
      ;(createTemplateRequest as jest.Mock).mockReturnValue({
        data: {},
        error: { data: "Some error" },
      })
      const {
        meta: { requestId },
        // AUTO DISABLED - fix me if you like :)
        // eslint-disable-next-line @typescript-eslint/await-thenable
      } = await mockStore.dispatch(
        createTemplate(newTemplate) as unknown as AnyAction
      )

      expect(mockStore.getActions()).toEqual([
        createTemplate.pending(requestId, newTemplate),
        createTemplate.rejected(
          testError,
          requestId,
          newTemplate,
          new AppError(TemplateError.CreateTemplate, "Some error")
        ),
      ])

      expect(createTemplateRequest).toHaveBeenCalled()
    })
  })
})
