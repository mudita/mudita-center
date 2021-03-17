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
  OutlookContactResourceItem,
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

export const mapContact = (contact: OutlookContactResourceItem): Contact => {
  let firstName = ""
  let lastName = ""
  let primaryPhoneNumber = ""
  let secondaryPhoneNumber = ""
  let firstAddressLine = ""
  let secondAddressLine = ""
  let email = ""
  let note = ""

  if (contact.givenName) {
    firstName = contact.givenName
  }

  if (contact.surname) {
    lastName = contact.surname
  }

  if (contact.mobilePhone) {
    primaryPhoneNumber = contact.mobilePhone
    if (contact.homePhones) {
      secondaryPhoneNumber = contact.homePhones[0]
    }
    if (contact.businessPhones) {
      secondaryPhoneNumber = contact.businessPhones[0] || ""
    }
  } else if (contact.homePhones) {
    primaryPhoneNumber = contact.homePhones[0]
    secondaryPhoneNumber = contact.homePhones[1] || ""
    if (contact.businessPhones) {
      secondaryPhoneNumber = contact?.businessPhones[0] || ""
    }
  } else if (contact.businessPhones) {
    primaryPhoneNumber = contact.businessPhones[0]
    secondaryPhoneNumber = contact?.businessPhones[1] || ""
  }

  if (contact.homeAddress) {
    firstAddressLine = contact.homeAddress.street || ""
    secondAddressLine = `${contact.homeAddress.postalCode} ${contact.homeAddress.city} ${contact.homeAddress.countryOrRegion}`
  } else if (contact.businessAddress) {
    firstAddressLine = contact.businessAddress.street || ""
    secondAddressLine = `${contact.businessAddress.postalCode} ${contact.businessAddress.city} ${contact.businessAddress.countryOrRegion}`
  } else if (contact.otherAddress) {
    firstAddressLine = contact.otherAddress.street || ""
    secondAddressLine = `${contact.otherAddress.postalCode} ${contact.otherAddress.city} ${contact.otherAddress.countryOrRegion}`
  }

  if (contact.emailAddresses) {
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
