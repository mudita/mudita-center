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

export const mapContact = (contact: GoogleContactResourceItem): Contact => {
  let firstName = ""
  let lastName = ""
  let primaryPhoneNumber = ""
  let secondaryPhoneNumber
  let firstAddressLine
  let secondAddressLine
  let email = ""
  let note = ""

  if (contact.names) {
    ;[firstName, lastName = ""] = contact.names[0].displayNameLastFirst.split(
      ","
    )
  }

  if (contact.phoneNumbers) {
    if (contact.phoneNumbers.length === 1) {
      primaryPhoneNumber = contact.phoneNumbers[0].value
    } else {
      const primaryNumber = contact.phoneNumbers.find(
        (number) => number.metadata.primary
      )
      if (primaryNumber !== undefined) {
        primaryPhoneNumber = primaryNumber.value
      } else {
        primaryPhoneNumber = ""
      }
      const secondaryNumber = contact.phoneNumbers.find(
        (number) => !number.metadata.primary
      )
      if (secondaryNumber !== undefined) {
        secondaryPhoneNumber = secondaryNumber.value
      } else {
        secondaryPhoneNumber = ""
      }
    }
  }

  if (contact.addresses) {
    firstAddressLine = contact.addresses[0].streetAddress
    secondAddressLine = `${contact.addresses[0].postalCode} ${contact.addresses[0].city} ${contact.addresses[0].extendedAddress}`
  }

  if (contact.emailAddresses) {
    email = contact.emailAddresses[0].value
  }

  if (contact.biographies) {
    note = contact.biographies[0].value
  }
  return {
    id: contact.resourceName,
    firstName,
    lastName,
    primaryPhoneNumber,
    secondaryPhoneNumber,
    firstAddressLine,
    secondAddressLine,
    email,
    ice: false,
    favourite: false,
    blocked: false,
    note,
  }
}
