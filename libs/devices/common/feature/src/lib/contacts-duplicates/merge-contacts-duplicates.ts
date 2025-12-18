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
 * Merges duplicate contacts by combining data from duplicate contacts
 * into the main contact.
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
    firstName: main.firstName || other.firstName,
    lastName: main.lastName || other.lastName,
    middleName: main.middleName || other.middleName,
    namePrefix: main.namePrefix || other.namePrefix,
    nameSuffix: main.nameSuffix || other.nameSuffix,
    nickName: main.nickName || other.nickName,
    phoneNumbers: mergePhoneNumbers(main.phoneNumbers, other.phoneNumbers),
    emailAddresses: mergeEmailAddresses(
      main.emailAddresses,
      other.emailAddresses
    ),
    company: main.company || other.company,
    department: main.department || other.department,
    workTitle: main.workTitle || other.workTitle,
    sip: main.sip || other.sip,
    address: main.address || other.address,
    website: main.website || other.website,
    notes: mergeNotes(main.notes, other.notes),
    starred: main.starred || other.starred,
    accountName: main.accountName,
    entityType: main.entityType,
  }
}

const MAX_ARRAY_LENGTH = 500

const mergePhoneNumbers = (
  mainNumbers: Contact["phoneNumbers"] = [],
  otherNumbers: Contact["phoneNumbers"] = []
): Contact["phoneNumbers"] => {
  return uniqBy(
    [...mainNumbers, ...otherNumbers].filter(
      (p) => p.phoneNumber && p.unifiedPhoneNumber
    ),
    "unifiedPhoneNumber"
  ).slice(0, MAX_ARRAY_LENGTH)
}

const mergeEmailAddresses = (
  mainEmails: Contact["emailAddresses"] = [],
  otherEmails: Contact["emailAddresses"] = []
): Contact["emailAddresses"] => {
  return uniqBy(
    [...mainEmails, ...otherEmails].filter((e) => e.emailAddress),
    "emailAddress"
  ).slice(0, MAX_ARRAY_LENGTH)
}

const mergeNotes = (
  mainNotes: string | undefined,
  otherNotes: string | undefined
): string | undefined => {
  const MAX_NOTES_LENGTH = 5000

  if (mainNotes && otherNotes && mainNotes !== otherNotes) {
    const merged = `${mainNotes}\n\n${otherNotes}`
    return merged.slice(0, MAX_NOTES_LENGTH)
  }
  return (mainNotes || otherNotes)?.slice(0, MAX_NOTES_LENGTH)
}