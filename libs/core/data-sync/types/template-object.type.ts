/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Entity, DBQueryResult } from "Core/data-sync/types/entity.type"
import { TemplateTable } from "Core/data-sync/constants"
import { Template } from "Core/templates/dto"

export type TemplateObject = Template

export type TemplateEntity = Entity<{
  text: string
  lastUsageTimestamp: string
  rowOrder?: number
}>

export interface TemplateInput {
  [TemplateTable.Templates]:
    | DBQueryResult<keyof TemplateEntity, string[]>
    | undefined
}
