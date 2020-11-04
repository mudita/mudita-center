import { Provider } from "Renderer/models/external-providers/external-providers.interface"
import {
  Calendar,
  CalendarEvent,
} from "Renderer/models/calendar/calendar.interfaces"

export interface CalendarProps {
  calendars: Calendar[]
  events: CalendarEvent[]
  loadCalendars: (provider: Provider) => Promise<void>
  loadEvents: (calendar: Calendar) => Promise<CalendarEvent[]>
}

export interface CalendarEventProps {
  event: CalendarEvent
}
