/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { DBQueryResult, Entity } from "Core/data-sync/types/entity.type"
import { QuotationsTable } from "Core/data-sync/constants/quotations.constant"

export type QuotationObject = {
  id: string
  quote: string
  author?: string
}

export type QuotationEntity = Entity<{
  quote_id: string
  quote: string
  author?: string
}>

export interface QuotationInput {
  [QuotationsTable.Custom]: DBQueryResult<keyof QuotationEntity, string[]>
}
