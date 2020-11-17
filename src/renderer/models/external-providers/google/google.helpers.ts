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
    const [
      firstPartOfName = "",
      lastPartOfName = "",
    ] = contact.names[0].displayNameLastFirst.split(",")
    firstName = firstPartOfName
    lastName = lastPartOfName
  }

  if (contact.phoneNumbers) {
    if (contact.phoneNumbers.length === 1) {
      primaryPhoneNumber = contact.phoneNumbers[0].value
    } else {
      for (let index = 0; index < contact.phoneNumbers.length; index++) {
        if (contact.phoneNumbers[index].metadata.primary) {
          primaryPhoneNumber = contact.phoneNumbers[index].value
        } else {
          secondaryPhoneNumber = contact.phoneNumbers[index].value
          break
        }
      }
    }
  }

  if (contact.addresses) {
    firstAddressLine = contact.addresses[0].streetAddress
    secondAddressLine = `${contact.addresses[0].postalCode} ${contact.addresses[0].city}`
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
