/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { GoogleContactResourceItem } from "Core/__deprecated__/renderer/models/external-providers/google/google.interface"
import { UnifiedContact } from "device/models"
import { getDisplayName } from "../helpers"
import { omit } from "lodash"

export const mapGoogleApi = (
  contacts: GoogleContactResourceItem[]
): UnifiedContact[] => {
  return contacts
    .map((contact, index): UnifiedContact | null => {
      try {
        const name =
          contact.names?.find((item) => item.metadata.primary) ||
          contact.names?.[0]

        const partialResult: Omit<UnifiedContact, "displayName"> = {
          id: contact.resourceName,
          ...omit(name, [
            "metadata",
            "displayNameLastFirst",
            "displayName",
            "familyName",
            "givenName",
          ]),
          firstName: name?.givenName,
          lastName: name?.familyName,
          phoneNumbers:
            contact.phoneNumbers?.map((item) => {
              return {
                ...omit(item, ["metadata"]),
                ...(item.metadata.primary && { preference: 1 }),
              }
            }) ?? [],
          addresses:
            contact.addresses?.map((item) => {
              return {
                ...omit(item, ["metadata", "formattedValue"]),
                ...(item.metadata.primary && { preference: 1 }),
              }
            }) ?? [],
          emailAddresses:
            contact.emailAddresses?.map((item) => {
              return {
                ...omit(item, ["metadata"]),
                ...(item.metadata.primary && { preference: 1 }),
              }
            }) ?? [],
          organizations:
            contact.organizations?.map((item) => {
              return {
                ...omit(item, ["metadata"]),
              }
            }) ?? [],
          urls:
            contact.urls?.map((item) => {
              return {
                ...omit(item, ["metadata"]),
                ...(item.metadata.primary && { preference: 1 }),
              }
            }) ?? [],
          nickname:
            contact.nicknames?.find((item) => item.metadata.primary)?.value ||
            contact.nicknames?.[0].value,
          note:
            contact.biographies?.find((item) => item.metadata.primary)?.value ||
            contact.biographies?.[0].value,
        }

        return {
          displayName: getDisplayName(partialResult),
          ...partialResult,
        }
      } catch {
        return null
      }
    })
    .filter((contact): contact is UnifiedContact => contact != null)
}
