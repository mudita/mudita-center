/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import { CalendarEvent } from "Renderer/models/calendar/calendar.interfaces"
import ical, { EventData } from "ical-generator"

interface convertEvents {
  saveToFile: (file: string) => Promise<void>
  print: () => {prodId: string, events: EventData[]}
}

export const convertEventsToICal = (
  calendarEvents: CalendarEvent[]
): convertEvents => {
  const cal = ical({
    prodId: { company: "mudita.com", product: "Mudita Center" },
  })
  const mapCalendarEvents: EventData[] = calendarEvents.map((event) => {
    return {
      id: event.id,
      start: event.startDate,
      end: event.endDate,
      summary: event.name ?? "",
      description: event.description
    }
  })
  cal.events(mapCalendarEvents)
  return {
    print: () => cal.toJSON(),
    saveToFile: (filePath) =>
      new Promise((resolve, reject) => {
        cal.save(filePath, (error: Error) => {
          if (error) {
            reject(error)
          } else {
            resolve()
          }
        })
      }),
  }
}
