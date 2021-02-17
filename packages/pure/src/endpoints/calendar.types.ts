/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

export interface Calendar {
  UID: string
  SUMMARY: string
  DTSTART: string
  DTEND: string
  RRULE: {
    COUNT: string
    FREQ: string
    INTERVAL: string
  }
  VALARM: {
    ACTION: string
    TRIGGER: string
  }
  provider: {
    iCalUid: string
    id: string
    type: string
  }
}

export type NewEvent = Omit<Calendar, "UID">
