/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { CalendarEvent } from "App/calendar/store/calendar.interfaces"
import { RRule } from "rrule"
import moment from "moment"
import difference from "lodash/difference"

export const getSortedEvents = (events: CalendarEvent[]): CalendarEvent[] => {
  return events.sort((a, b) => {
    return new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
  })
}

export const mapEvents = (events: CalendarEvent[]) => {
  const recurringEvents = events.filter((event) => "recurrence" in event)
  const result = difference(events, recurringEvents)

  for (const event of recurringEvents) {
    const rule = new RRule({
      ...event.recurrence?.origOptions,
      dtstart: new Date(event.startDate),
    })
    const timeDiff =
      new Date(event.endDate).getTime() - new Date(event.startDate).getTime()
    const multipleEvents = rule
      .between(
        new Date(event.startDate),
        moment(event.startDate).add(5, "years").toDate()
      )
      .map((mappedEvent: Date) => {
        const {recurrence, ...rest} = event
        return {
          ...rest,
          startDate: new Date(mappedEvent).toISOString(),
          endDate: new Date(
            new Date(mappedEvent).getTime() + timeDiff
          ).toISOString(),
        }
      })
    result.push(...multipleEvents)
  }
  return result
}
