/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createSelector } from "@reduxjs/toolkit"
import { contactsStateSelector } from "Core/contacts/selectors"

export const getContactsDeleteCountSelector = createSelector(
  contactsStateSelector,
  (contacts) => contacts.deletedCount
)
