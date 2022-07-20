/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Repository } from "App/core/types"
import { TemplateModel } from "App/templates/models"
import { Template as TemplateDto } from "App/templates/dto"

export class TemplateRepository implements Repository {
  constructor(private templateModel: TemplateModel) {}

  public create(template: TemplateDto): TemplateDto | undefined {
    return this.templateModel.create(template)
  }

  public update(template: TemplateDto): TemplateDto | undefined {
    return this.templateModel.update(template)
  }

  public delete(id: TemplateDto["id"]): void {
    this.templateModel.delete(id)
  }
}
