/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { GoogleContactResourceItem } from "App/__deprecated__/renderer/models/external-providers/google/google.interface"
import { Contact } from "App/contacts/reducers/contacts.interface"

// AUTO DISABLED - fix me if you like :)
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const createRruleString = (rules: {
  rrule?: string
  exdate?: string
  rdate?: string
  exrule?: string
  dtstart?: string
}) => {
  const {
    rrule = "",
    exdate = "",
    rdate = "",
    exrule = "",
    dtstart = "",
  } = rules
  return `DTSTART:${dtstart}\n${rrule}\n${exdate}\n${rdate}\n${exrule}`
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
    ;[lastName, firstName = ""] =
      contact.names[0].displayNameLastFirst.split(",")
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
