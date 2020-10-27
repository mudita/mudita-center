export interface CalendarEvent {
  id: string
  name: string
  date: [Date, Date]
  description?: string
}

export interface CalendarProps {
  events?: CalendarEvent[]
}

export interface CalendarEventProps {
  event: CalendarEvent
}
