/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { IpcEvent } from "Core/core/decorators"
import { TemplateService } from "Core/templates/services"
import { RequestResponse } from "Core/core/types/request-response.interface"
import { IpcTemplateEvent } from "Core/templates/constants"
import { NewTemplate, Template } from "Core/templates/dto"

export class TemplateController {
  constructor(private templateService: TemplateService) {}

  @IpcEvent(IpcTemplateEvent.CreateTemplate)
  public async createTemplate(
    template: NewTemplate
  ): Promise<RequestResponse<Template>> {
    return this.templateService.createTemplate(template)
  }

  @IpcEvent(IpcTemplateEvent.DeleteTemplates)
  public deleteTemplates(
    templateIds: string[]
  ): Promise<RequestResponse<string[]>> {
    return this.templateService.deleteTemplates(templateIds)
  }

  @IpcEvent(IpcTemplateEvent.UpdateTemplate)
  public async updateTemplate(
    template: Template
  ): Promise<RequestResponse<Template>> {
    return this.templateService.updateTemplate(template)
  }

  @IpcEvent(IpcTemplateEvent.UpdateTemplateOrder)
  public async updateTemplateOrder(
    templates: Template[]
  ): Promise<RequestResponse<Template[]>> {
    return this.templateService.updateTemplatesOrder(templates)
  }
}
