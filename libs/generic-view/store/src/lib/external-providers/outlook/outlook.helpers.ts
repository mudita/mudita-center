/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  OutLookScope,
  OutlookAuthErrorResponse,
  OutlookAuthSuccessResponse,
  OutlookContactResource,
  OutlookContactResourceItem,
} from "./outlook.interface"
import {
  apiBaseUrl,
  baseGraphUrl,
  clientId,
  redirectUrl,
} from "./outlook.constants"
import { Contact } from "Core/contacts/reducers/contacts.interface"
import axios from "axios"
import { ContactBuilder } from "./contact-builder"

type OutlookException = {
  error: string
}

export const getOutlookEndpoint = (scope: OutLookScope): string => {
  switch (scope) {
    case OutLookScope.Contacts:
      return "offline_access, https://graph.microsoft.com/contacts.read"
    case OutLookScope.Calendars:
      return "offline_access, https://graph.microsoft.com/calendars.read"
  }
}

export const isOutlookErrorResponse = (
  response: OutlookAuthSuccessResponse | OutlookAuthErrorResponse
): response is OutlookAuthErrorResponse => {
  return "error" in response
}

export const getAuthorizationUrl = (payload: OutLookScope) => {
  const urlSearchParams = new URLSearchParams({
    client_id: clientId,
    response_type: "code",
    redirect_uri: redirectUrl,
    scope: getOutlookEndpoint(payload),
  })

  return `${apiBaseUrl}/authorize?${urlSearchParams.toString()}`
}

export const isOutlookException = (
  exception: unknown
): exception is OutlookException => {
  return (exception as OutlookException).error !== undefined
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

const getAllOutlookContactResourceItems = async (
  url: string,
  accessToken: string,
  prevItems: OutlookContactResourceItem[] = []
): Promise<OutlookContactResourceItem[]> => {
  const headers = { Authorization: `Bearer ${accessToken}` }
  const { data } = await axios.get<OutlookContactResource>(url, { headers })
  const items = [...prevItems, ...data.value]

  if (data["@odata.nextLink"] !== undefined) {
    return getAllOutlookContactResourceItems(
      data["@odata.nextLink"],
      accessToken,
      items
    )
  } else {
    return items
  }
}

export const fetchContacts = async (
  accessToken: string
): Promise<Contact[]> => {
  const items = await getAllOutlookContactResourceItems(
    `${baseGraphUrl}/me/contacts`,
    accessToken
  )
  return items.map(mapContact)
}
