/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { AlarmEntity, EventInput, AlarmObject } from "Core/data-sync/types"
import { BasePresenter } from "Core/data-sync/presenters/base-presenter"
import { UnifiedAlarmRepeatDaysType } from "device/models"

export class AlarmPresenter extends BasePresenter {
  public serializeToObject(input: EventInput): AlarmObject[] {
    if (input.alarms === undefined) {
      return []
    }

    const alarms = this.serializeRecord<AlarmEntity>(
      input.alarms.values,
      input.alarms.columns
    )

    return alarms.map((alarm) => {
      return {
        id: String(alarm._id),
        repeatDays: this.parseRRule(alarm.rrule),
        isEnabled: alarm.enabled === "1",
        hour: this.parseNumber(alarm.hour),
        minute: this.parseNumber(alarm.minute),
        snoozeTime: this.parseNumber(alarm.snooze_duration),
      }
    })
  }

  private parseNumber(value: string | undefined | null): number {
    return Number(value) || 0
  }

  private parseRRule(rrule: string): UnifiedAlarmRepeatDaysType {
    const daysMap: Record<string, 1 | 2 | 3 | 4 | 5 | 6 | 7> = {
      MO: 1,
      TU: 2,
      WE: 3,
      TH: 4,
      FR: 5,
      SA: 6,
      SU: 7,
    }
    const repeatDays: UnifiedAlarmRepeatDaysType = []

    if (rrule?.includes("BYDAY")) {
      const byDayPart = rrule
        .split(";")
        .find((part) => part.startsWith("BYDAY"))
      if (byDayPart) {
        const days = byDayPart.replace("BYDAY=", "").split(",")
        days.forEach((day) => {
          const mappedDay = daysMap[day]
          if (mappedDay) {
            repeatDays.push(mappedDay)
          }
        })
      }
    }

    return repeatDays
  }
}
