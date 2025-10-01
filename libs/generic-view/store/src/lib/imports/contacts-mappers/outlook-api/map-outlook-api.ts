/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { UnifiedContact, ContactAddSource } from "device/models"
import { Contact } from "Core/contacts/reducers/contacts.interface"
import { getDisplayName } from "../helpers"

export const mapOutlookApi = (contacts: Contact[]): UnifiedContact[] => {
  return contacts
    .map((contact): UnifiedContact | null => {
      try {
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
                  },
                ]
              : []),
            ...(contact.secondaryPhoneNumber
              ? [
                  {
                    value: contact.secondaryPhoneNumber,
                    preference: contact.primaryPhoneNumber ? 2 : 1,
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
                  },
                ]
              : []),
          ],
          note: contact.note,
          organizations: [],
          urls: [],
          importSource: ContactAddSource.MCImportOutlook,
        }
      } catch {
        return null
      }
    })
    .filter((contact): contact is UnifiedContact => contact != null)
}
