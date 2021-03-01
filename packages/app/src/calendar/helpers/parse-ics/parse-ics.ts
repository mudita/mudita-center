/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import ical, { VEvent } from "node-ical"
import { CalendarEvent } from "Renderer/models/calendar/calendar.interfaces"
import { RRule } from "rrule"

const parseIcs = async (filePaths: string[]): Promise<CalendarEvent[]> => {
  const parsedEvents: CalendarEvent[] = []
  for (const filePath of filePaths) {
    const calendarEvents = await ical.async.parseFile(filePath)
    for (const event of Object.values(calendarEvents) as VEvent[]) {
      parsedEvents.push({
        id: event.uid ? event.uid.toString() : "",
        name: event.summary ? event.summary.toString() : "",
        startDate: event.start ? new Date(event.start).toISOString() : "",
        endDate: event.end ? new Date(event.end).toISOString() : "",
        description: event.description,
        ...(event.rrule?.origOptions
          ? { recurrence: new RRule(event.rrule?.origOptions) }
          : {}),
      })
    }
  }
  return parsedEvents.filter(
    (event) => event.startDate && event.endDate && event.id
  )
}

export default parseIcs
