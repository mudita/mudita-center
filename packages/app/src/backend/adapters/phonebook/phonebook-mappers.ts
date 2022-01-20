/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Contact as PureContact } from "@mudita/pure"
import { Contact } from "App/contacts/reducers/contacts.interface"

export const mapToContact = (pureContact: PureContact): Contact => {
  const {
    id,
    blocked,
    favourite,
    address = "",
    altName,
    priName,
    numbers: [primaryPhoneNumber = "", secondaryPhoneNumber = ""],
  } = pureContact

  const firstAddressLine = address.substr(0, address.indexOf("\n"))
  const secondAddressLine = address.substr(address.indexOf("\n") + 1)

  return {
    blocked,
    favourite,
    primaryPhoneNumber,
    secondaryPhoneNumber,
    firstAddressLine,
    secondAddressLine,
    id: String(id),
    firstName: priName,
    lastName: altName,
    // TODO: map missing fields in separate issue https://appnroll.atlassian.net/browse/PDA-571 (after EGD implementation)
    // speedDial: undefined,
    ice: false,
    note: "",
    email: "",
  }
}

export const mapToPureContact = (contact: Contact): PureContact => {
  const {
    blocked = false,
    favourite = false,
    firstName = "",
    lastName = "",
    primaryPhoneNumber,
    secondaryPhoneNumber,
    firstAddressLine,
    secondAddressLine,
    id,
  } = contact
  const numbers = []
  if (primaryPhoneNumber) {
    numbers.push(primaryPhoneNumber)
  }
  if (secondaryPhoneNumber) {
    numbers.push(secondaryPhoneNumber)
  }

  return {
    id: Number(id),
    blocked,
    favourite,
    numbers: numbers,
    priName: firstName,
    altName: lastName,
    address: [firstAddressLine, secondAddressLine].join("\n").trim(),
  }
}
