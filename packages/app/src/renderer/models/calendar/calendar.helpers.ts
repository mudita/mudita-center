/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import { CalendarEvent } from "Renderer/models/calendar/calendar.interfaces"

export const getSortedEvents = (events: CalendarEvent[]): CalendarEvent[] => {
  return events.sort((a, b) => {
    return new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
  })
}
