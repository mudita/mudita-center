/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { RequestsService } from "../../device/services/requests.service"
import { Endpoint, MessagesCategory, Method, Response } from "../../pure/types"
import { TemplatePresenter } from "../presenters"
import { AddEntityResult, NewTemplate } from "../types"
import { TemplatesServiceClass } from "./templates.service.class"

export class TemplatesService implements TemplatesServiceClass {
  constructor(private requestsService: RequestsService) {}

  async addTemplates(
    newTemplates: NewTemplate[]
  ): Promise<Response<AddEntityResult>[]> {
    const params = newTemplates.map((template) => ({
      endpoint: Endpoint.Messages,
      method: Method.Post,
      body: TemplatePresenter.mapToPureNewTemplateBody(template),
    }))

    const result = await this.requestsService.requests<AddEntityResult>(params)

    return result
  }

  async removeTemplates(templatesIds: number[]): Promise<void> {
    const params = templatesIds.map((id) => ({
      endpoint: Endpoint.Contacts,
      method: Method.Delete,
      body: {
        category: MessagesCategory.template,
        templateID: Number(id),
      },
    }))

    await this.requestsService.requests(params)
  }
}
