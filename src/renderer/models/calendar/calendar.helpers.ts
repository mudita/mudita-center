import { CalendarEvent } from "Renderer/models/calendar/calendar.interfaces"

export const getSortedEvents = (events: CalendarEvent[]): CalendarEvent[] => {
  return events.sort((a, b) => {
    return new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
  })
}
