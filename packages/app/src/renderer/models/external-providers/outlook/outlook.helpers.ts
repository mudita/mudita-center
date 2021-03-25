/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
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
import { Provider } from "Renderer/models/external-providers/external-providers.interface"
import { Calendar } from "App/calendar/store/calendar.interfaces"

export const getOutlookEndpoint = (scope: OutLookScope): string => {
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

export const fetchCalendars = async (
  accessToken: string
): Promise<Calendar[]> => {
  const { data } = await axios.get(`${baseGraphUrl}/me/calendars`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  })

  return mapCalendars(data.value)
}
