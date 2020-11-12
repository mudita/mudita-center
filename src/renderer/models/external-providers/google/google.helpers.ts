import {
  Calendar,
  CalendarEvent,
} from "Renderer/models/calendar/calendar.interfaces"
import {
  GoogleCalendar,
  GoogleContactResourceItem,
  GoogleEvent,
} from "Renderer/models/external-providers/google/google.interface"
import { Provider } from "Renderer/models/external-providers/external-providers.interface"
import { intl } from "Renderer/utils/intl"
import { defineMessages } from "react-intl"
import { Contact } from "Renderer/models/phone/phone.typings"

const messages = defineMessages({
  unnamedEvent: {
    id: "view.name.calendar.unnamedEvent",
  },
})

export const mapEvents = (events: GoogleEvent[]): CalendarEvent[] => {
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

export const mapCalendars = (calendars: GoogleCalendar[]): Calendar[] => {
  return calendars.map((calendar) => ({
    id: calendar.id,
    name: calendar.summaryOverride || calendar.summary,
    provider: Provider.Google,
    primary: calendar.primary,
  }))
}

export const mapContacts = (
  contacts: GoogleContactResourceItem[]
): Contact[] => {
  return contacts.map((contact) => ({
    id: contact.resourceName,
    firstName: contact.names[0].unstructuredName,
    primaryPhoneNumber: contact.phoneNumbers[0].value,
    // secondaryPhoneNumber: contact.phoneNumbers[1].value,
    firstAddressLine: contact.addresses[0].streetAddress,
    secondAddressLine: contact.addresses[0].postalCode,
    email: contact.emailAddresses[0].value,
    ice: false,
    favourite: false,
    blocked: false,
    note: "", // TODO: fill
  }))
}
