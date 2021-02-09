/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

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
import { Contact } from "App/contacts/store/contacts.type"

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
  let secondaryPhoneNumber = ""
  let firstAddressLine = ""
  let secondAddressLine = ""
  let email = ""
  let note = ""

  if (contact.names) {
    ;[lastName, firstName = ""] = contact.names[0].displayNameLastFirst.split(
      ","
    )
  }

  if (contact.phoneNumbers) {
    primaryPhoneNumber =
      contact.phoneNumbers.find(({ metadata }) => metadata.primary)?.value ||
      contact.phoneNumbers[0].value
    secondaryPhoneNumber =
      contact.phoneNumbers.find(({ value }) => value !== primaryPhoneNumber)
        ?.value || ""
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
    firstName: firstName.trim(),
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
