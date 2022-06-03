/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { MessagesCategory } from "@mudita/pure"
import { TemplateService } from "App/templates/services/template.service"
import { TemplateRepository } from "App/templates/repositories"
import DeviceService from "Backend/device-service"
import {
  ErrorRequestResponse,
  RequestResponseStatus,
  SuccessRequestResponse,
} from "App/core/types/request-response.interface"
import { NewTemplate } from "App/templates/dto"

const templateRepository = {
  create: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
} as unknown as TemplateRepository

const deviceService = {
  request: jest.fn(),
} as unknown as DeviceService

const subject = new TemplateService(deviceService, templateRepository)

const successResponse: SuccessRequestResponse<any> = {
  status: RequestResponseStatus.Ok,
  data: {},
}

const errorResponse: ErrorRequestResponse = {
  status: RequestResponseStatus.Error,
}

const template: NewTemplate = {
  text: "Hello world",
}

beforeEach(() => {
  jest.resetAllMocks()
})

describe("`TemplateService`", () => {
  describe("`createTemplate` method", () => {
    test("map data and returns success when `deviceService.request` returns success", async () => {
      deviceService.request = jest.fn().mockReturnValue(successResponse)
      const response = await subject.createTemplate(template)
      expect(deviceService.request).toHaveBeenLastCalledWith({
        endpoint: 8,
        method: 2,
        body: {
          templateBody: "Hello world",
          category: MessagesCategory.template,
        },
      })
      expect(response.status).toEqual(RequestResponseStatus.Ok)
    })

    test("returns error  when `deviceService.request` returns error", async () => {
      deviceService.request = jest.fn().mockReturnValue(errorResponse)
      const response = await subject.createTemplate(template)
      expect(deviceService.request).toHaveBeenLastCalledWith({
        endpoint: 8,
        method: 2,
        body: {
          templateBody: "Hello world",
          category: MessagesCategory.template,
        },
      })
      expect(response.status).toEqual(RequestResponseStatus.Error)
    })
  })
})
