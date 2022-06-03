/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { NewTemplate, Template } from "App/templates/dto"
import DeviceService from "Backend/device-service"
import { Endpoint, Method } from "@mudita/pure"
import { RequestResponse } from "App/core/types/request-response.interface"
import { TemplatePresenter } from "App/templates/presenters"
import { isResponseSuccessWithData } from "App/core/helpers/is-responses-success-with-data.helpers"
import { TemplateRepository } from "App/templates/repositories"

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
      body: TemplatePresenter.mapToPureTemplateBody(template),
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
}
