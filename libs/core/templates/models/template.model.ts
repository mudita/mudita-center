/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Model, Field } from "Core/core/decorators"
import { BaseModel } from "Core/core/models"
import { Template } from "Core/templates/dto"
import { DataIndex } from "Core/index-storage/constants"

@Model(DataIndex.Template)
export class TemplateModel extends BaseModel<Template> {
  @Field("ref")
  public id: string | undefined

  @Field()
  public text: string | undefined

  @Field()
  public lastUsedAt: string | undefined

  @Field()
  public order: number | undefined
}
