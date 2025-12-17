/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  Contact,
  ContactId,
  DuplicateContactsGroup,
} from "devices/common/models"
import { uniqBy } from "lodash"

/**
 * Merges duplicate contacts by combining phone numbers and email addresses
 * from duplicate contacts into the main contact.
 *
 * @param duplicateGroups - Array of duplicate contact groups, where each group
 * contains a contact to keep and contacts to merge into it
 * @returns Object containing:
 * - toUpdate: Array of merged contacts that should be updated in the database
 * - toRemove: Array of contact IDs that should be removed after merging
 *
 * @example
 * const groups = [{
 *   toKeep: mainContact,
 *   toMerge: [duplicate1, duplicate2]
 * }]
 * const { toUpdate, toRemove } = mergeContactsDuplicates(groups)
 */
export const mergeContactsDuplicates = (
  duplicateGroups: DuplicateContactsGroup[]
): { toUpdate: Contact[]; toRemove: ContactId[] } => {
  const toUpdate: Contact[] = []
  const toRemove: ContactId[] = []

  for (const duplicates of duplicateGroups) {
    let mainContact = duplicates.toKeep

    for (const contactToMerge of duplicates.toMerge) {
      mainContact = mergeTwoContacts(mainContact, contactToMerge)
    }
    toUpdate.push(mainContact)
    toRemove.push(...duplicates.toMerge.map((c) => c.contactId))
  }

  return { toUpdate, toRemove }
}

const mergeTwoContacts = (main: Contact, other: Contact): Contact => {
  return {
    ...main,
    phoneNumbers: mergePhoneNumbers(main.phoneNumbers, other.phoneNumbers),
    emailAddresses: mergeEmailAddresses(
      main.emailAddresses,
      other.emailAddresses
    ),
  }
}

const mergePhoneNumbers = (
  mainNumbers: Contact["phoneNumbers"] = [],
  otherNumbers: Contact["phoneNumbers"] = []
): Contact["phoneNumbers"] => {
  return uniqBy(
    [...mainNumbers, ...otherNumbers].filter(
      (p) => p.phoneNumber && p.unifiedPhoneNumber
    ),
    "unifiedPhoneNumber"
  )
}

const mergeEmailAddresses = (
  mainEmails: Contact["emailAddresses"] = [],
  otherEmails: Contact["emailAddresses"] = []
): Contact["emailAddresses"] => {
  return uniqBy(
    [...mainEmails, ...otherEmails].filter((e) => e.emailAddress),
    "emailAddress"
  )
}
