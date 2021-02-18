/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import ical, { VEvent } from "node-ical"
import { CalendarEvent } from "Renderer/models/calendar/calendar.interfaces"
import { RRule } from "rrule"

const parseIcs = async (filePaths: string[]): Promise<CalendarEvent[]> => {
  let parsedEvents: CalendarEvent[] = []
  for (const filePath of filePaths) {
    const calendarEvents = await ical.async.parseFile(filePath)
    for (const event of Object.values(calendarEvents) as VEvent[]) {
      const rule = new RRule(event.rrule?.origOptions)
      parsedEvents.push({
        id: event.uid.toString(),
        name: event.summary.toString(),
        startDate: new Date(event.start).toISOString(),
        endDate: new Date(new Date(event.end).toISOString()).toISOString(),
        recurrence: rule,
      })
    }
  }
  return parsedEvents.filter((event) => event.startDate && event.endDate)
}

export default parseIcs
