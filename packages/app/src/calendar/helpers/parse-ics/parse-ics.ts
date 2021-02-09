/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import ical, { CalendarComponent, DateWithTimeZone, VEvent } from "node-ical"
import { CalendarEvent } from "Renderer/models/calendar/calendar.interfaces"
import { RRule } from "rrule"
import moment from "moment"

const parseEvent = (event: CalendarComponent): CalendarEvent => {
  let id = ""
  let name = ""
  let startDate = ""
  let endDate = ""

  if (event.uid) {
    id = event.uid.toString()
  }

  if (event.summary) {
    name = event.summary.toString()
  }

  if (event.start) {
    startDate = new Date(event.start).toISOString()
  }

  if (event.end) {
    endDate = new Date(event.end).toISOString()
  }

  return {
    id,
    name: name || (event.description as string) || "",
    startDate,
    endDate,
  }
}

const parseRecurringEvent = (event: VEvent): CalendarEvent[] => {
  const rule = new RRule(event.rrule?.origOptions)
  const timeDiff =
    new Date(event.end).getTime() - new Date(event.start).getTime()
  // TODO: Return also RRule for export in the future
  return rule
    .between(event.start, moment(event.start).add(5, "years").toDate())
    .map((mappedEvent: Date) => ({
      id: event.uid.toString(),
      name: event.summary.toString(),
      startDate: new Date(mappedEvent).toISOString(),
      endDate: new Date(
        new Date(mappedEvent).getTime() + timeDiff
      ).toISOString(),
    }))
}

const parseIcs = async (filePaths: string[]) => {
  let parsedEvents: CalendarEvent[] = []
  for (const filePath of filePaths) {
    const calendarEvents = await ical.async.parseFile(filePath)
    for (const event of Object.values(calendarEvents)) {
      if (event.rrule) {
        const parsedRecurringEvents = parseRecurringEvent(event as VEvent)
        parsedEvents = [...parsedEvents, ...parsedRecurringEvents]
      }
      parsedEvents.push(parseEvent(event))
    }
  }
  return parsedEvents.filter((event) => event.startDate && event.endDate)
}

export default parseIcs
