/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Entity, DBQueryResult } from "App/data-sync/types/entity.type"
import { MessageTable } from "App/data-sync/constants"
import { Message } from "App/messages/reducers"
import { ContactNumberEntity } from "App/data-sync/types/contact-object.type"
import { ThreadEntity } from "App/data-sync/types/thread-object.type"

export type MessageObject = Message

export type SmsEntity = Entity<{
  thread_id: number
  contact_id: number
  date: number
  error_code: number
  body: string
  type: number
}>

export type TemplateEntity = Entity<{
  text: string
  lastUsageTimestamp: string
}>

export interface MessageInput {
  [MessageTable.Sms]: DBQueryResult<keyof SmsEntity, string[]>
  [MessageTable.Threads]: DBQueryResult<keyof ThreadEntity, string[]>
  [MessageTable.Numbers]: DBQueryResult<keyof ContactNumberEntity, string[]>
}
