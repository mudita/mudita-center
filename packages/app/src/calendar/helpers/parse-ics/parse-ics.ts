/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import ICalParser from "ical-js-parser"
import fs from "fs"
import { CalendarEvent } from "App/calendar/store/calendar.interfaces"

const parseIcs = async (filePaths: string[]): Promise<CalendarEvent[]> => {
  const parsedEvents: CalendarEvent[] = []
  for (const filePath of filePaths) {
    const fileData = await fs.readFileSync(filePath)
    const calendarEvents = await ICalParser.toJSON(fileData.toString())

    for (const event of calendarEvents.events) {
      parsedEvents.push({
        id: event.uid ? event.uid.toString() : "",
        name: event.summary ? event.summary.toString() : "",
        startDate: event.dtstart.value
          ? new Date(parseInt(event.dtstart.value) * 1000).toISOString()
          : "",
        endDate: event.dtend.value
          ? new Date(parseInt(event.dtend.value) * 1000).toISOString()
          : "",
        description: event.description,
        recurrence: event.rrule,
      })
    }
  }
  return parsedEvents.filter(
    (event) => event.startDate && event.endDate && event.id
  )
}

export default parseIcs
