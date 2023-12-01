/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { AnyAction } from "@reduxjs/toolkit"
import { AppError } from "App/core/errors"
import { updateTemplate } from "App/templates/actions/update-template.action"
import { TemplateError } from "App/templates/constants"
import { Template } from "App/templates/dto"
import { updateTemplateRequest } from "App/templates/requests/update-template.request"
import { testError } from "App/__deprecated__/renderer/store/constants"
import createMockStore from "redux-mock-store"
import thunk from "redux-thunk"

const errorMock = new AppError(
  TemplateError.UpdateTemplate,
  "Something went wrong"
)

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

jest.mock("App/templates/requests/update-template.request")

describe("async `updateTemplate`", () => {
  describe("when `updateTemplateRequest` requests return success", () => {
    test("fire async `updateTemplate` returns updated template", async () => {
      ;(updateTemplateRequest as jest.Mock).mockReturnValue({
        data: template,
        error: null,
      })

      const {
        meta: { requestId },
        // AUTO DISABLED - fix me if you like :)
        // eslint-disable-next-line @typescript-eslint/await-thenable
      } = await mockStore.dispatch(
        updateTemplate(template) as unknown as AnyAction
      )

      expect(mockStore.getActions()).toEqual([
        updateTemplate.pending(requestId, template),
        updateTemplate.fulfilled(template, requestId, template),
      ])

      expect(updateTemplateRequest).toHaveBeenCalled()
    })
  })

  describe("when `updateTemplateRequest` return undefined `data` or `error` exists", () => {
    test("fire async `updateTemplate` returns `rejected` action if data is undefined", async () => {
      ;(updateTemplateRequest as jest.Mock).mockReturnValue({
        data: undefined,
        error: null,
      })
      const {
        meta: { requestId },
        // AUTO DISABLED - fix me if you like :)
        // eslint-disable-next-line @typescript-eslint/await-thenable
      } = await mockStore.dispatch(
        updateTemplate(template) as unknown as AnyAction
      )

      expect(mockStore.getActions()).toEqual([
        updateTemplate.pending(requestId, template),
        updateTemplate.rejected(testError, requestId, template, errorMock),
      ])

      expect(updateTemplateRequest).toHaveBeenCalled()
    })

    test("fire async `createTemplate` returns `rejected` action if error exists", async () => {
      ;(updateTemplateRequest as jest.Mock).mockReturnValue({
        data: {},
        error: { data: "Some error" },
      })
      const {
        meta: { requestId },
        // AUTO DISABLED - fix me if you like :)
        // eslint-disable-next-line @typescript-eslint/await-thenable
      } = await mockStore.dispatch(
        updateTemplate(template) as unknown as AnyAction
      )

      expect(mockStore.getActions()).toEqual([
        updateTemplate.pending(requestId, template),
        updateTemplate.rejected(
          testError,
          requestId,
          template,
          new AppError(TemplateError.UpdateTemplate, "Some error")
        ),
      ])

      expect(updateTemplateRequest).toHaveBeenCalled()
    })
  })
})
