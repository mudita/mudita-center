import { Provider } from "Renderer/models/external-providers/external-providers.interface"
import { Calendar } from "Renderer/models/calendar/calendar.interfaces"

export interface CalendarEvent {
  id: string
  name: string
  date: [Date, Date]
  description?: string
}

export interface CalendarProps {
  calendars: Calendar[]
  events: CalendarEvent[]
  loadCalendars: (provider: Provider) => Promise<void>
  loadEvents: (calendar: Calendar) => Promise<CalendarEvent[]>
}

export interface CalendarEventProps {
  event: CalendarEvent
}
