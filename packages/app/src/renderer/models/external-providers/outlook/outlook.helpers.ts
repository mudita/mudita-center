/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import axios from "axios"
import {
  apiBaseUrl,
  clientId,
  redirectUrl,
} from "Renderer/models/external-providers/outlook/outlook.constants"
import {
  OutlookAuthSuccessResponse,
  OutLookScope,
} from "Renderer/models/external-providers/outlook/outlook.interface"
import { Contact } from "App/contacts/store/contacts.type"

export const requestTokens = async (code: string, scope: string) => {
  const urlSearchParams = new URLSearchParams({
    client_id: clientId,
    scope,
    code,
    redirect_uri: redirectUrl,
    grant_type: "authorization_code",
  })

  const {
    data,
  }: {
    data: OutlookAuthSuccessResponse
  } = await axios.post(
    `${apiBaseUrl}/token`,
    urlSearchParams.toString(),
    { headers: { "Content-Type": "application/x-www-form-urlencoded" } } // The header is required
  )

  return {
    access_token: data.access_token,
    refresh_token: data.refresh_token,
  }
}

export const handleScope = (scope: OutLookScope): string => {
  switch (scope) {
    case OutLookScope.Contacts:
      return "offline_access, https://graph.microsoft.com/contacts.readwrite"
  }
}

export const mapContact = (contact: any): Contact => {
  console.log({ contact })
  let firstName = ""
  let lastName = ""
  const primaryPhoneNumber = ""
  const secondaryPhoneNumber = ""
  const firstAddressLine = ""
  const secondAddressLine = ""
  let email = ""
  let note = ""

  if (contact.givenName) {
    firstName = contact.givenName
  }

  if (contact.surname) {
    lastName = contact.surname
  }

  // if (contact.mobilePhone) {
  //   primaryPhoneNumber =
  //     contact.mobilePhone.find(({ metadata }: any) => metadata.primary)
  //       ?.value || contact.phoneNumbers[0].value
  //   secondaryPhoneNumber =
  //     contact.phoneNumbers.find(
  //       ({ value }: any) => value !== primaryPhoneNumber
  //     )?.value || ""
  // }

  // if (contact.addresses) {
  //   firstAddressLine = contact.addresses[0].streetAddress
  //   secondAddressLine = `${contact.addresses[0].postalCode} ${contact.addresses[0].city} ${contact.addresses[0].extendedAddress}`
  // }

  if (contact.emailAddresses[0]) {
    email = contact.emailAddresses[0].address
  }

  if (contact.personalNotes) {
    note = contact.personalNotes
  }
  return {
    id: contact.id,
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
