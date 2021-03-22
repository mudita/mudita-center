/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import {
  OutlookCalendar,
  OutlookContactResourceItem,
  OutLookScope,
} from "Renderer/models/external-providers/outlook/outlook.interface"
import { Contact } from "App/contacts/store/contacts.type"
import axios from "axios"
import { baseGraphUrl } from "Renderer/models/external-providers/outlook/outlook.constants"
import { ContactBuilder } from "Renderer/models/external-providers/outlook/contact-builder"
import { Calendar } from "Renderer/models/calendar/calendar.interfaces"
import { Provider } from "Renderer/models/external-providers/external-providers.interface"

export const getOutlookEndpoint = (scope: OutLookScope | string): string => {
  switch (scope) {
    case OutLookScope.Contacts:
      return "offline_access, https://graph.microsoft.com/contacts.read"
    case OutLookScope.Calendars:
      return "offline_access, https://graph.microsoft.com/calendars.read"
    default:
      return "offline_access, https://graph.microsoft.com/contacts.read"
  }
}

export const mapContact = (contact: OutlookContactResourceItem): Contact => {
  const builder = new ContactBuilder()
  return builder
    .addId(contact.id)
    .addFirstName(contact.givenName ?? "")
    .addLastName(contact.surname ?? "")
    .addPhoneNumbers([
      contact.mobilePhone ?? "",
      ...(contact.homePhones ?? []),
      ...(contact.businessPhones ?? []),
    ])
    .addAddress([
      contact.homeAddress ?? {},
      contact.businessAddress ?? {},
      contact.otherAddress ?? {},
    ])
    .addEmailAddress(contact.emailAddresses ?? [])
    .addNote(contact.personalNotes ?? "")
    .build()
}

export const fetchContacts = async (accessToken: string) => {
  const { data } = await axios.get(`${baseGraphUrl}/me/contacts`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
  return data.value.map(mapContact)
}

export const mapCalendars = (calendars: OutlookCalendar[]): Calendar[] => {
  return calendars.map((calendar) => ({
    id: calendar.id,
    name: calendar.name,
    provider: Provider.Outlook,
    primary: calendar.isDefaultCalendar,
  }))
}

export const fetchCalendars = async (accessToken: string) => {
  const { data } = await axios.get(`${baseGraphUrl}/me/calendars`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  })

  console.log("calendar data", data.value)
  return mapCalendars(data.value)
}

export const fetchEvents = async (accessToken: string, id: string) => {
  console.log("fetchEvents id", id)
  const {
    data,
  } = await axios.get(
    `${baseGraphUrl}/me/calendars/${id}/events?$select=subject,start,end,recurrence,isAllDay`,
    { headers: { Authorization: `Bearer ${accessToken}` } }
  )

  console.log("events data", data.value)
  return data.value
}
