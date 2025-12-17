/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Contact, ContactId, PhoneNumber } from "devices/common/models"
import { intersection } from "lodash"

interface SimpleContact {
  contactId: ContactId
  phoneNumbers: PhoneNumber["unifiedPhoneNumber"][]
}

/**
 * Detects duplicate contacts based on matching phone numbers.
 *
 * This function identifies groups of contacts that share at least one phone number.
 * Contacts are considered duplicates if they are directly or transitively linked
 * through common phone numbers (e.g., A shares a number with B, and B shares
 * a different number with C - all three are grouped together).
 *
 * @param contacts - Array of contacts to analyze for duplicates
 * @returns Array of duplicate groups, each containing:
 *   - `toKeep`: The contact ID to keep (the one with the highest ID - newest)
 *   - `toMerge`: Array of contact IDs that should be merged into `toKeep`
 *
 * @example
 * const contacts = [
 *   { contactId: "1", phoneNumbers: [{ unifiedPhoneNumber: "111" }] },
 *   { contactId: "2", phoneNumbers: [{ unifiedPhoneNumber: "111" }] },
 * ]
 * detectContactsDuplicates(contacts)
 * // Returns: [{ toKeep: "2", toMerge: ["1"] }]
 */
export const detectContactsDuplicates = (contacts: Contact[]) => {
  const simpleContacts = contacts
    .map(extractPhoneNumbers)
    .sort((a, b) => sortByIdDescending(a.contactId, b.contactId))

  const processedContacts = new Set<ContactId>()

  const findLinkedContacts = (
    contactId: ContactId,
    linkedSet: Set<ContactId>
  ): void => {
    const contact = simpleContacts.find((c) => c.contactId === contactId)
    if (!contact) return

    for (const other of simpleContacts) {
      if (linkedSet.has(other.contactId)) continue
      if (hasMatchingPhoneNumber(contact, other)) {
        linkedSet.add(other.contactId)
        findLinkedContacts(other.contactId, linkedSet)
      }
    }
  }

  return simpleContacts.reduce<{ toKeep: ContactId; toMerge: ContactId[] }[]>(
    (duplicates, contact) => {
      if (processedContacts.has(contact.contactId)) return duplicates

      const linkedContacts = new Set<ContactId>([contact.contactId])
      findLinkedContacts(contact.contactId, linkedContacts)

      if (linkedContacts.size > 1) {
        const [toKeep, ...toMerge] =
          Array.from(linkedContacts).sort(sortByIdDescending)
        duplicates.push({ toKeep, toMerge })
        linkedContacts.forEach((id) => processedContacts.add(id))
      }

      return duplicates
    },
    []
  )
}

const extractPhoneNumbers = (contact: Contact): SimpleContact => ({
  contactId: contact.contactId,
  phoneNumbers:
    contact.phoneNumbers
      ?.map((p) => p.unifiedPhoneNumber)
      ?.filter((p): p is string => Boolean(p))
      .slice(0, 2) ?? [],
})

const sortByIdDescending = (a: string, b: string): number => {
  const idA = a.padStart(32, "0")
  const idB = b.padStart(32, "0")
  return idB.localeCompare(idA)
}

const hasMatchingPhoneNumber = (
  a: SimpleContact,
  b: SimpleContact
): boolean => {
  return intersection(a.phoneNumbers, b.phoneNumbers).length > 0
}
