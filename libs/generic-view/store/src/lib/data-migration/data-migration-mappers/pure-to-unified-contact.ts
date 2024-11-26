/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { UnifiedContact } from "device/models"
import { Contact } from "Core/contacts/reducers"
import { getDisplayName } from "../../imports/contacts-mappers/helpers"

export const pureToUnifiedContact = (contacts: Contact[]): UnifiedContact[] => {
  return contacts.map((contact) => {
    const unifiedContact: Omit<UnifiedContact, "displayName"> = {
      id: contact.id,
      firstName: contact.firstName,
      lastName: contact.lastName,
      starred: contact.favourite,
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
    return {
      ...unifiedContact,
      displayName: getDisplayName(unifiedContact),
    }
  })
}
