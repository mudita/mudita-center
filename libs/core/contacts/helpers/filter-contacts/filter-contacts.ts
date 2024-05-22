/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Contact } from "Core/contacts/reducers/contacts.interface"
import { filterRecordsByPhrase } from "Core/utils/filter-records-by-phrase"
import { checkFullName } from "Core/utils/check-full-name"

export const filterContacts = (
  contacts: Contact[],
  searchPhrase: string
): Contact[] => {
  const filteredResult = filterRecordsByPhrase(
    contacts,
    searchPhrase,
    ["firstName", "lastName", "primaryPhoneNumber", "secondaryPhoneNumber"],
    [checkFullName]
  )

  return filteredResult
}
