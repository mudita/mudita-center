/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Contact } from "devices/common/models"
import { intersection } from "lodash"

export const detectContactsDuplicates = (contacts: Contact[]) => {
  const duplicates = new Map<Contact["contactId"], Contact["contactId"][]>()

  const newestToOldest = contacts
    .map((contact) => {
      return {
        contactId: contact.contactId,
        phoneNumbers: contact.phoneNumbers
          ?.map((phoneNumber) => phoneNumber.unifiedPhoneNumber)
          .slice(0, 2),
      }
    })
    .sort((a, b) => {
      const aId = a.contactId.padStart(32, "0")
      const bId = b.contactId.padStart(32, "0")
      return bId.localeCompare(aId)
    })

  for (const contact of newestToOldest) {
    const foundDuplicates = newestToOldest
      .filter((c) => {
        const isCurrentContact = c.contactId === contact.contactId
        const isAlreadyMarkedAsDuplicate = [
          ...Array.from(duplicates.values()).flat(),
          ...Array.from(duplicates.keys()),
        ].includes(c.contactId)
        const isDuplicate =
          intersection(c.phoneNumbers, contact.phoneNumbers).length > 1

        return !isCurrentContact && !isAlreadyMarkedAsDuplicate && isDuplicate
      })
      .map((c) => c.contactId)

    if (foundDuplicates.length) {
      duplicates.set(contact.contactId, foundDuplicates)
    }
  }

  return duplicates
}
