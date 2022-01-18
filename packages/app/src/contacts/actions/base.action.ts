/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAction } from "@reduxjs/toolkit"
import { ContactsEvent } from "App/contacts/constants"

export const devClearAllContacts = createAction(
  ContactsEvent.DevClearAllContacts
)
