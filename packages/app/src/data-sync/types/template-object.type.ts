/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Entity, DBQueryResult } from "App/data-sync/types/entity.type"
import { TemplateTable } from "App/data-sync/constants"
import { Template } from "App/templates/reducers"

export type TemplateObject = Template

export type TemplateEntity = Entity<{
  text: string
  lastUsageTimestamp: string
}>

export interface TemplateInput {
  [TemplateTable.Templates]: DBQueryResult<keyof TemplateEntity, string[]>
}
