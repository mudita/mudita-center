/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Provider } from "App/__deprecated__/renderer/models/external-providers/external-providers.interface"
import { Calendar, CalendarEvent } from "App/__deprecated__/calendar/store/calendar.interfaces"

export interface CalendarProps {
  calendars: Calendar[]
  events: CalendarEvent[]
  loadCalendars: (provider: Provider) => Promise<void>
  loadEvents: (calendar: Calendar) => Promise<CalendarEvent[]>
  setEvents: (calendarEvents: CalendarEvent[]) => void
}

export interface CalendarEventProps {
  event: CalendarEvent
}
