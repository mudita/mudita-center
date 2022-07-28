/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import createMockStore from "redux-mock-store"
import thunk from "redux-thunk"
import { AnyAction } from "@reduxjs/toolkit"
import { deleteTemplates } from "App/templates/actions/delete-templates.action"
import {
  RequestResponse,
  RequestResponseStatus,
} from "App/core/types/request-response.interface"
import { CreateMessageDataResponse } from "App/messages/services"
import { deleteTemplatesRequest } from "App/templates/requests"
import { testError } from "App/__deprecated__/renderer/store/constants"
import { Template } from "App/templates/dto"
import { AppError } from "App/core/errors"
import { TemplateError } from "App/templates/constants"

jest.mock("App/templates/requests/delete-templates.request")

const template: Template = {
  id: "1",
  text: "Test template",
  lastUsedAt: "1574335694",
  order: 1,
}

const secondTemplate: Template = {
  id: "2",
  text: "Test template",
  lastUsedAt: "1574335694",
  order: 2,
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
    data: { errorIds: [secondTemplate.id], successIds: [template.id] },
  },
}

afterEach(() => {
  jest.resetAllMocks()
})

describe("`deleteTemplates`", () => {
  describe("when `deleteTemplates` request return success", () => {
    test("`deleteTemplates` returns id", async () => {
      ;(deleteTemplatesRequest as jest.Mock).mockReturnValue(
        successDeviceResponse
      )
      const mockStore = createMockStore([thunk])()
      const {
        meta: { requestId },
      } = await mockStore.dispatch(
        deleteTemplates([template.id]) as unknown as AnyAction
      )

      expect(mockStore.getActions()).toEqual([
        deleteTemplates.pending(requestId, [template.id]),
        deleteTemplates.fulfilled([template.id], requestId, [template.id]),
      ])

      expect(deleteTemplatesRequest).toHaveBeenCalled()
    })
  })

  describe("when `deleteTemplates` request return error", () => {
    test("fire `deleteTemplates` returns `rejected` action", async () => {
      ;(deleteTemplatesRequest as jest.Mock).mockReturnValue(
        errorDeviceResponse
      )
      const errorMock = new AppError(
        TemplateError.DeleteTemplate,
        "Delete Template request failed"
      )
      const mockStore = createMockStore([thunk])()
      const {
        meta: { requestId },
      } = await mockStore.dispatch(
        deleteTemplates([template.id]) as unknown as AnyAction
      )

      expect(mockStore.getActions()).toEqual([
        deleteTemplates.pending(requestId, [template.id]),
        deleteTemplates.rejected(
          testError,
          requestId,
          [template.id],
          errorMock
        ),
      ])

      expect(deleteTemplatesRequest).toHaveBeenCalled()
    })

    test("fire `deleteTemplates` returns any success data", async () => {
      ;(deleteTemplatesRequest as jest.Mock).mockReturnValue(
        errorWithDataDeviceResponse
      )
      const mockStore = createMockStore([thunk])()
      const {
        meta: { requestId },
      } = await mockStore.dispatch(
        deleteTemplates([
          template.id,
          secondTemplate.id,
        ]) as unknown as AnyAction
      )

      expect(mockStore.getActions()).toEqual([
        deleteTemplates.pending(requestId, [template.id, secondTemplate.id]),
        deleteTemplates.fulfilled([template.id], requestId, [
          template.id,
          secondTemplate.id,
        ]),
      ])

      expect(deleteTemplatesRequest).toHaveBeenCalled()
    })
  })
})
