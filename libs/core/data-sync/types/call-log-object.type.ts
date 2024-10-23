/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { UnifiedCallLog } from "device/models"
import { CallLogTable } from "Core/data-sync/constants"
import { Entity, DBQueryResult } from "Core/data-sync/types/entity.type"

export type CallLogObject = UnifiedCallLog

export type CallLogEntity = Entity<{
  _id: string
  number: string
  e164number: string
  presentation: string
  date: string
  duration: string
  type: string
  name: string
  contactId: string
  isRead: string
}>

export interface CallLogInput {
  [CallLogTable.Calls]:
    | DBQueryResult<keyof CallLogEntity, string[]>
    | undefined
}
