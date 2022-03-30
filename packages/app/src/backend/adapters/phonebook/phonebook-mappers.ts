/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Contact as PureContact } from "@mudita/pure"
import { Contact } from "App/contacts/reducers/contacts.interface"
import { ContactPresenter } from "App/contacts/presenters/contact.presenter"

const contactPresenter = new ContactPresenter()

// mappers are deprecated, please use `ContactPresenter` if you would like to map `PureContact` to `Contact`
export const mapToContact = (pureContact: PureContact): Contact => {
  return contactPresenter.serialize(pureContact)
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
