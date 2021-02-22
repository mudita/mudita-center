/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import { CalendarEvent } from "Renderer/models/calendar/calendar.interfaces"
import { Calendar } from "@mudita/pure/dist/endpoints/calendar.types"
import moment from "moment"

export const getSortedEvents = (events: CalendarEvent[]): CalendarEvent[] => {
  return events.sort((a, b) => {
    return new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
  })
}

export const handleEventsFromDevice = (data: {
  calendar_events: Calendar[]
}): CalendarEvent[] => {
  return data.calendar_events.map((event) => {
    return {
      id: event.UID,
      name: event.SUMMARY,
      startDate: moment(event.DTSTART).parseZone().toString(),
      endDate: moment(event.DTEND).parseZone().toString(),
      provider: {
        type: event.provider.type,
        id: event.provider.id,
      },
    }
  })
}
