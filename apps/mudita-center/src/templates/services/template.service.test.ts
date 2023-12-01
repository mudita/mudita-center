/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Result, ResultObject } from "App/core/builder"
import { MessagesCategory, Method, Endpoint } from "App/device/constants"
import { TemplateService } from "App/templates/services/template.service"
import { TemplateRepository } from "App/templates/repositories"
import { DeviceManager } from "App/device-manager/services"
import {
  ErrorRequestResponse,
  RequestResponseStatus,
} from "App/core/types/request-response.interface"
import { Template } from "App/templates/dto"

const templateRepository = {
  create: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
} as unknown as TemplateRepository

const deviceManager = {
  device: {
    request: jest.fn(),
  },
} as unknown as DeviceManager

const subject = new TemplateService(deviceManager, templateRepository)

const errorResponse: ErrorRequestResponse = {
  status: RequestResponseStatus.Error,
}

const newTemplate: Template = {
  text: "Hello world",
  order: 1,
  id: "1",
  lastUsedAt: "1",
}

const template: Template = {
  id: "1",
  text: "Hello world",
  lastUsedAt: "1",
  order: 1,
}

const secondTemplate: Template = {
  id: "2",
  text: "Hello world",
  lastUsedAt: "1",
  order: 2,
}

const successResponse: ResultObject<unknown> = Result.success(undefined)

const successResponseWithTemplate: ResultObject<unknown> =
  Result.success(template)

beforeEach(() => {
  jest.resetAllMocks()
})

describe("`TemplateService`", () => {
  describe("`createTemplate` method", () => {
    test("map data and returns success when `deviceManager.device.request` returns success", async () => {
      deviceManager.device.request = jest
        .fn()
        .mockReturnValue(successResponseWithTemplate)
      const response = await subject.createTemplate(newTemplate)
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(deviceManager.device.request).toHaveBeenNthCalledWith(1, {
        endpoint: Endpoint.Messages,
        method: Method.Post,
        body: {
          templateBody: "Hello world",
          category: MessagesCategory.template,
          order: 1,
        },
      })
      expect(response.status).toEqual(RequestResponseStatus.Ok)
    })

    test("returns error  when `deviceManager.device.request` returns error", async () => {
      deviceManager.device.request = jest.fn().mockReturnValue(errorResponse)
      const response = await subject.createTemplate(newTemplate)
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(deviceManager.device.request).toHaveBeenLastCalledWith({
        endpoint: Endpoint.Messages,
        method: Method.Post,
        body: {
          templateBody: "Hello world",
          category: MessagesCategory.template,
          order: 1,
        },
      })
      expect(response.status).toEqual(RequestResponseStatus.Error)
    })
  })

  describe("`updateTemplate` method", () => {
    test("map data and returns success when `deviceManager.device.request` returns success", async () => {
      deviceManager.device.request = jest.fn().mockReturnValue(successResponse)
      const response = await subject.updateTemplate(template)
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(deviceManager.device.request).toHaveBeenLastCalledWith({
        endpoint: Endpoint.Messages,
        method: Method.Put,
        body: {
          templateID: 1,
          templateBody: "Hello world",
          category: MessagesCategory.template,
        },
      })
      expect(response.status).toEqual(RequestResponseStatus.Ok)
    })

    test("returns error  when `deviceManager.device.request` returns error", async () => {
      deviceManager.device.request = jest.fn().mockReturnValue(errorResponse)
      const response = await subject.updateTemplate(template)
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(deviceManager.device.request).toHaveBeenLastCalledWith({
        endpoint: Endpoint.Messages,
        method: Method.Put,
        body: {
          templateID: 1,
          templateBody: "Hello world",
          category: MessagesCategory.template,
        },
      })
      expect(response.status).toEqual(RequestResponseStatus.Error)
    })
  })
  describe("`updateTemplateOrder` method", () => {
    test("map data and returns success when `deviceManager.device.request` returns success", async () => {
      deviceManager.device.request = jest.fn().mockReturnValue(successResponse)
      const response = await subject.updateTemplatesOrder([
        template,
        secondTemplate,
      ])
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(deviceManager.device.request).toHaveBeenLastCalledWith({
        endpoint: Endpoint.Messages,
        method: Method.Put,
        body: {
          templateID: 2,
          category: MessagesCategory.template,
          order: 2,
        },
      })
      expect(response.status).toEqual(RequestResponseStatus.Ok)
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(deviceManager.device.request).toHaveBeenCalledTimes(2)
    })

    test("returns error  when `deviceManager.device.request` returns error", async () => {
      deviceManager.device.request = jest.fn().mockReturnValue(errorResponse)
      const response = await subject.updateTemplatesOrder([
        template,
        secondTemplate,
      ])
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(deviceManager.device.request).toHaveBeenLastCalledWith({
        endpoint: Endpoint.Messages,
        method: Method.Put,
        body: {
          templateID: 2,
          category: MessagesCategory.template,
          order: 2,
        },
      })
      expect(response.status).toEqual(RequestResponseStatus.Error)
    })
  })

  test("calls templateRepository update method for each updated template", async () => {
    deviceManager.device.request = jest.fn().mockReturnValue(successResponse)
    await subject.updateTemplatesOrder([template, secondTemplate])

    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(templateRepository.update).toHaveBeenCalledTimes(2)
  })
})
