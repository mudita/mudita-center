/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { NewTemplate, Template } from "App/templates/dto"
import DeviceService from "App/__deprecated__/backend/device-service"
import {
  Endpoint,
  Method,
  MessagesCategory as PureMessagesCategory,
} from "@mudita/pure"
import {
  RequestResponse,
  RequestResponseStatus,
} from "App/core/types/request-response.interface"
import { TemplatePresenter } from "App/templates/presenters"
import { isResponseSuccessWithData } from "App/core/helpers/is-responses-success-with-data.helpers"
import { TemplateRepository } from "App/templates/repositories"
import { DeleteTemplateRequestResponse } from "App/templates/reducers"

export class TemplateService {
  constructor(
    private deviceService: DeviceService,
    private templateRepository: TemplateRepository
  ) {}

  public async createTemplate(
    template: NewTemplate
  ): Promise<RequestResponse<Template>> {
    const response = await this.deviceService.request({
      endpoint: Endpoint.Messages,
      method: Method.Post,
      body: TemplatePresenter.mapToPureNewTemplateBody(template),
    })

    if (isResponseSuccessWithData(response)) {
      const templateData = TemplatePresenter.mapToTemplate(response.data)

      this.templateRepository.create(templateData)

      return {
        status: response.status,
        data: templateData,
      }
    } else {
      return {
        status: response.status,
        error: { message: "Create template: Something went wrong" },
      }
    }
  }

  public async deleteTemplates(
    templateIds: string[]
  ): Promise<DeleteTemplateRequestResponse> {
    const results = templateIds.map(async (id) => {
      const { status } = await this.deviceService.request({
        endpoint: Endpoint.Messages,
        method: Method.Delete,
        body: {
          category: PureMessagesCategory.template,
          templateID: Number(id),
        },
      })
      return {
        status,
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
    const response = await this.deviceService.request({
      endpoint: Endpoint.Messages,
      method: Method.Put,
      body: TemplatePresenter.mapToPureTemplateBody(template),
    })

    if (isResponseSuccessWithData(response)) {
      this.templateRepository.update(template)

      return {
        status: response.status,
        data: template,
      }
    } else {
      return {
        status: response.status,
        error: { message: "Create template: Something went wrong" },
      }
    }
  }
}
