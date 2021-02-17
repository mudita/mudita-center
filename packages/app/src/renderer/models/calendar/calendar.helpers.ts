/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import { CalendarEvent } from "Renderer/models/calendar/calendar.interfaces"
import { RRule } from "rrule"
// import moment from "moment"
import moment from "moment"

export const getSortedEvents = (events: CalendarEvent[]): CalendarEvent[] => {
  return events.sort((a, b) => {
    return new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
  })
}

export const parseRecurringEvent = (event: any) => {}

export const mapRecurringEvents = (events: CalendarEvent[]) => {
  console.log(events)
  const recurringEvents = events.filter((event) => "recurrence" in event)
  let m = []
  for (const event of recurringEvents) {
    const rule = new RRule(event.recurrence?.origOptions)
    const timeDiff =
      new Date(event.endDate).getTime() - new Date(event.startDate).getTime()
    const events = rule
      .between(
        new Date(event.startDate),
        moment(event.startDate).add(5, "years").toDate()
      )
      .map((mappedEvent: Date) => {
        return {
          ...event,
          startDate: new Date(mappedEvent).toISOString(),
          endDate: new Date(
            new Date(mappedEvent).getTime() + timeDiff
          ).toISOString(),
        }
      })
    console.log("events", events)
    m.push(events)
  }
  return m.flat()
}
