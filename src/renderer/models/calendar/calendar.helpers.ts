import {
  Calendar,
  CalendarEvent,
} from "Renderer/models/calendar/calendar.interfaces"
import {
  GoogleCalendar,
  GoogleEvent,
} from "Renderer/models/external-providers/google/google.interface"
import { Provider } from "Renderer/models/external-providers/external-providers.interface"
import { intl } from "Renderer/utils/intl"
import { defineMessages } from "react-intl"

const messages = defineMessages({
  unnamedEvent: {
    id: "view.name.calendar.unnamedEvent",
  },
})

export const getSortedEvents = (events: CalendarEvent[]) => {
  return events.sort((a, b) => {
    return new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
  })
}

export const mapGoogleEvents = (events: GoogleEvent[]): CalendarEvent[] => {
  return events
    .filter((event) => event.start.dateTime && event.end.dateTime)
    .map((event) => ({
      id: `${Provider.Google}_${event.id}`,
      name: event.summary || intl.formatMessage(messages.unnamedEvent),
      description: event.description,
      startDate: new Date(event.start.dateTime).toISOString(),
      endDate: new Date(event.end.dateTime).toISOString(),
      provider: {
        type: Provider.Google,
        id: event.id,
      },
    }))
}

export const mapGoogleCalendars = (calendars: GoogleCalendar[]): Calendar[] => {
  return calendars.map((calendar) => ({
    id: calendar.id,
    name: calendar.summaryOverride || calendar.summary,
    provider: Provider.Google,
    primary: calendar.primary,
  }))
}
