/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { UnifiedAlarm } from "device/models"
import { EventTable } from "Core/data-sync/constants"
import { Entity, DBQueryResult } from "Core/data-sync/types/entity.type"

export type AlarmObject = UnifiedAlarm

export type AlarmEntity = Entity<{
  _id: string
  hour: string
  minute: string
  music_tone: string
  enabled: string
  snooze_duration: string
  rrule: string
}>

export interface EventInput {
  [EventTable.Alarms]: DBQueryResult<keyof AlarmEntity, string[]> | undefined
}
