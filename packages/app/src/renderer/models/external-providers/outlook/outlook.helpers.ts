/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import {
  OutlookContactResourceItem,
  OutLookScope,
} from "Renderer/models/external-providers/outlook/outlook.interface"
import { Contact } from "App/contacts/store/contacts.type"
import axios from "axios"
import { baseGraphUrl } from "Renderer/models/external-providers/outlook/outlook.constants"
import { ContactBuilder } from "Renderer/models/external-providers/outlook/contact-builder"

export const getOutlookEndpoint = (scope: OutLookScope): string => {
  switch (scope) {
    case OutLookScope.Contacts:
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
      { ...(contact.homeAddress ?? {}) },
      { ...(contact.businessAddress ?? {}) },
      { ...(contact.otherAddress ?? {}) },
    ])
    .addEmailAddress([...(contact.emailAddresses ?? [])])
    .addNote(contact.personalNotes ?? "")
    .build()
}

export const fetchContacts = async (accessToken: string) => {
  const { data } = await axios.get(`${baseGraphUrl}/me/contacts`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
  return data.value.map((contact: OutlookContactResourceItem) =>
    mapContact(contact)
  )
}
