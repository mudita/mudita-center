/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Model, Field } from "App/core/decorators"
import { BaseModel } from "App/core/models"
import { Template } from "App/templates/dto"
import { DataIndex } from "App/index-storage/constants"

@Model(DataIndex.Template)
export class TemplateModel extends BaseModel<Template> {
  @Field("ref")
  public id: string | undefined

  @Field()
  public text: string | undefined

  @Field()
  public lastUsedAt: string | undefined
}
