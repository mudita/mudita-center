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

export const getOutlookEndpoint = (scope: OutLookScope): string => {
  switch (scope) {
    case OutLookScope.Contacts:
      return "offline_access, https://graph.microsoft.com/contacts.read"
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
    if (contact.homePhones?.length) {
      secondaryPhoneNumber = contact.homePhones[0]
    }
    if (contact.businessPhones?.length) {
      secondaryPhoneNumber = contact.businessPhones[0] || ""
    }
  } else if (contact.homePhones?.length) {
    primaryPhoneNumber = contact.homePhones[0]
    secondaryPhoneNumber = contact.homePhones[1] || ""
    if (contact.businessPhones?.length) {
      secondaryPhoneNumber = contact?.businessPhones[0] || ""
    }
  } else if (contact.businessPhones?.length) {
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

  if (contact.emailAddresses?.length) {
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

export const fetchContacts = async (accessToken: string) => {
  const { data } = await axios.get(`${baseGraphUrl}/me/contacts`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
  console.log("data", data)
  return data.value.map((contact: OutlookContactResourceItem) =>
    mapContact(contact)
  )
}
