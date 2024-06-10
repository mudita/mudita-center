/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { UnifiedContact } from "device/models"
import { Contact } from "Core/contacts/reducers/contacts.interface"
import { getDisplayName } from "../helpers"
// import { getDisplayName } from "../helpers"

export const mapOutlookApi = (contacts: Contact[]): UnifiedContact[] => {
  try {
    return contacts.map((contact): UnifiedContact => {
      return {
        displayName: getDisplayName(contact),
        id: contact.id,
        firstName: contact.firstName,
        lastName: contact.lastName,
        phoneNumbers: [
          ...(contact.primaryPhoneNumber
            ? [
                {
                  value: contact.primaryPhoneNumber,
                  preference: 1,
                  type: "other",
                },
              ]
            : []),
          ...(contact.secondaryPhoneNumber
            ? [
                {
                  value: contact.secondaryPhoneNumber,
                  preference: contact.primaryPhoneNumber ? 2 : 1,
                  type: "other",
                },
              ]
            : []),
        ],
        emailAddresses: [
          ...(contact.email
            ? [
                {
                  value: contact.email,
                  preference: 1,
                  type: "other",
                },
              ]
            : []),
        ],
        addresses: [
          ...(contact.firstAddressLine || contact.secondAddressLine
            ? [
                {
                  streetAddress:
                    contact.firstAddressLine || contact.secondAddressLine,
                  ...(contact.firstAddressLine &&
                    contact.secondAddressLine && {
                      extendedAddress: contact.secondAddressLine,
                    }),
                  type: "other",
                },
              ]
            : []),
        ],
        note: contact.note,
      } as UnifiedContact
    })
  } catch {
    return []
  }
}
