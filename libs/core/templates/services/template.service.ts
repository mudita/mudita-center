/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Endpoint, Method } from "core-device/models"
import { NewTemplate, Template } from "Core/templates/dto"
import { DeviceProtocol } from "device-protocol/feature"
import { MessagesCategory } from "Core/device/constants"
import {
  CreateTemplateResponseBody,
  PureTemplate,
} from "Core/device/types/mudita-os"
import {
  RequestResponse,
  RequestResponseStatus,
} from "Core/core/types/request-response.interface"
import { TemplatePresenter } from "Core/templates/presenters"
import { TemplateRepository } from "Core/templates/repositories"
import {
  DeleteTemplateRequestResponse,
  UpdateTemplateOrderRequestResponse,
} from "Core/templates/reducers"

export class TemplateService {
  constructor(
    private deviceProtocol: DeviceProtocol,
    private templateRepository: TemplateRepository
  ) {}

  public async createTemplate(
    template: NewTemplate
  ): Promise<RequestResponse<Template>> {
    const createResponse =
      await this.deviceProtocol.device.request<CreateTemplateResponseBody>({
        endpoint: Endpoint.Messages,
        method: Method.Post,
        body: TemplatePresenter.mapToPureNewTemplateBody(template),
      })

    if (createResponse.ok && createResponse.data) {
      const getResponse =
        await this.deviceProtocol.device.request<PureTemplate>({
          endpoint: Endpoint.Messages,
          method: Method.Get,
          body: {
            templateID: createResponse.data.templateID,
            category: MessagesCategory.template,
          },
        })

      if (getResponse.ok && getResponse.data) {
        const templateData = TemplatePresenter.mapToTemplate(getResponse.data)

        this.templateRepository.create(templateData)

        return {
          status: RequestResponseStatus.Ok,
          data: templateData,
        }
      }
    }

    return {
      status: RequestResponseStatus.Error,
      error: { message: "Create template: Something went wrong" },
    }
  }

  public async deleteTemplates(
    templateIds: string[]
  ): Promise<DeleteTemplateRequestResponse> {
    const results = templateIds.map(async (id) => {
      const { ok } = await this.deviceProtocol.device.request({
        endpoint: Endpoint.Messages,
        method: Method.Delete,
        body: {
          category: MessagesCategory.template,
          templateID: Number(id),
        },
      })
      return {
        status: ok ? RequestResponseStatus.Ok : RequestResponseStatus.Error,
        id,
      }
    })

    const errorIds = (await Promise.all(results))
      .filter(({ status }) => status === RequestResponseStatus.Error)
      .map(({ id }) => id)
    const successIds = (await Promise.all(results))
      .filter(({ status }) => status === RequestResponseStatus.Ok)
      .map(({ id }) => id)

    if (errorIds.length > 0) {
      successIds.forEach((id) => this.templateRepository.delete(id))

      return {
        status: RequestResponseStatus.Error,
        error: {
          message: "Delete template: Something went wrong",
          data: { errorIds, successIds },
        },
      }
    } else {
      templateIds.forEach((id) => this.templateRepository.delete(id))

      return {
        status: RequestResponseStatus.Ok,
      }
    }
  }

  public async updateTemplate(
    template: Template
  ): Promise<RequestResponse<Template>> {
    const response = await this.deviceProtocol.device.request({
      endpoint: Endpoint.Messages,
      method: Method.Put,
      body: TemplatePresenter.mapToPureTemplateBody(template),
    })

    if (response.ok) {
      this.templateRepository.update(template)

      return {
        status: RequestResponseStatus.Ok,
        data: template,
      }
    } else {
      return {
        status: RequestResponseStatus.Error,
        error: { message: "Update template: Something went wrong" },
      }
    }
  }

  public async updateTemplatesOrder(
    templates: Template[]
  ): Promise<UpdateTemplateOrderRequestResponse> {
    const results = templates.map(async (template) => {
      const { ok } = await this.deviceProtocol.device.request({
        endpoint: Endpoint.Messages,
        method: Method.Put,
        body: TemplatePresenter.mapToPureTemplateOrder(template),
      })
      return {
        status: ok ? RequestResponseStatus.Ok : RequestResponseStatus.Error,
        template,
      }
    })

    const errorTemplates = (await Promise.all(results))
      .filter(({ status }) => status === RequestResponseStatus.Error)
      .map(({ template }) => template)
    const successTemplates = (await Promise.all(results))
      .filter(({ status }) => status === RequestResponseStatus.Ok)
      .map(({ template }) => template)

    successTemplates.forEach((template) =>
      this.templateRepository.update(template)
    )
    if (errorTemplates.length > 0) {
      return {
        status: RequestResponseStatus.Error,
        error: {
          message: "Update template order: Something went wrong",
          data: { errorTemplates, successTemplates },
        },
      }
    } else {
      return {
        status: RequestResponseStatus.Ok,
      }
    }
  }
}
