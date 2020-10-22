import Faker from "faker"
import {
  Calendar,
  CalendarEvent,
  NewCalendarEvent,
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

export const makeNewEvent = (props: NewCalendarEvent) => ({
  id: Faker.random.uuid(),
  ...props,
})

export const getSortedEvents = (events: CalendarEvent[]) => {
  return events.sort((a, b) => {
    return a.date[0].getTime() - b.date[0].getTime()
  })
}

export const mapGoogleEvents = (events: GoogleEvent[]): CalendarEvent[] => {
  return events
    .filter((event) => event.start.dateTime && event.end.dateTime)
    .map(
      (event): CalendarEvent => ({
        id: Faker.random.uuid(),
        name: event.summary || intl.formatMessage(messages.unnamedEvent),
        description: event.description,
        date: [new Date(event.start.dateTime), new Date(event.end.dateTime)],
        provider: {
          type: Provider.Google,
          id: event.id,
        },
      })
    )
}

export const mapGoogleCalendars = (calendars: GoogleCalendar[]): Calendar[] => {
  return calendars.map(
    (calendar): Calendar => ({
      id: calendar.id,
      name: calendar.summaryOverride || calendar.summary,
      provider: Provider.Google,
      primary: calendar.primary,
    })
  )
}
