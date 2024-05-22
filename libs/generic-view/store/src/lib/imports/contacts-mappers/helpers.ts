/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { UnifiedContact } from "device/models"

export const getDisplayName = (
  contact: Pick<UnifiedContact, "firstName" | "middleName" | "lastName">
) => {
  const baseName = [contact.firstName, contact.middleName, contact.lastName]
    .filter(Boolean)
    .join(" ")
  if (baseName) return baseName
  return "N/A"
}

export const addMissingFields = (contact: UnifiedContact): UnifiedContact => {
  return {
    ...contact,
    phoneNumbers: contact.phoneNumbers?.map((number, index) => {
      return {
        ...number,
        preference: number?.preference ?? index + 1,
      }
    }),
  }
}
