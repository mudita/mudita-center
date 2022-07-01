/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Contact } from "App/contacts/dto"
import { createFullName } from "App/contacts/helpers/contacts.helpers"

export const contactsFilter = (contact: Contact, search: string): boolean => {
  const query: (keyof Contact)[] = [
    "firstName",
    "lastName",
    "primaryPhoneNumber",
    "secondaryPhoneNumber",
    "email",
    "firstAddressLine",
    "secondAddressLine",
  ]
  for (const key of query) {
    const param: typeof contact[keyof typeof contact] = contact[key]
    const fullNameMatchContact = createFullName(contact)
      .toLowerCase()
      .includes(search.toLowerCase())
    if (
      (param !== undefined &&
        typeof param === "string" &&
        param.toLowerCase().includes(search.toLowerCase())) ||
      fullNameMatchContact
    ) {
      return true
    }
  }
  return false
}
