/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export type UnifiedAlarmRepeatDaysType = (1 | 2 | 3 | 4 | 5 | 6 | 7)[]

export type UnifiedAlarm = {
  repeatDays: UnifiedAlarmRepeatDaysType
  isEnabled: boolean
  hour: number
  minute: number
  snoozeTime: number
}
