/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Entity, DBQueryResult } from "Core/data-sync/types/entity.type"
import { ThreadTable } from "Core/data-sync/constants"
import { Thread } from "Core/messages/dto"
import {
  ContactNumberEntity,
  ContactNameEntity,
} from "Core/data-sync/types/contact-object.type"
import { SmsEntity } from "Core/data-sync/types/message-object.type"

export type ThreadObject = Thread

export type ThreadEntity = Entity<{
  date: string
  msg_count: number
  read: number
  contact_id: number
  number_id: number
  snippet: string
  last_dir: number
}>

export interface ThreadInput {
  [ThreadTable.Threads]: DBQueryResult<keyof ThreadEntity, string[]>
  [ThreadTable.Sms]: DBQueryResult<keyof SmsEntity, string[]>
  [ThreadTable.Numbers]: DBQueryResult<keyof ContactNumberEntity, string[]>
  [ThreadTable.Names]?: DBQueryResult<keyof ContactNameEntity, string[]>
}
