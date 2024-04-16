/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { MaxNameLength } from "Core/contacts/constants"
import { NewContact } from "Core/contacts/reducers"

export const applyValidationRulesToImportedContacts = (
  importedContacts: NewContact[]
): NewContact[] => {
  return importedContacts.map((contact) => ({
    ...contact,
    firstName: contact.firstName?.substring(0, MaxNameLength),
    lastName: contact.lastName?.substring(0, MaxNameLength),
  }))
}
