/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Selector } from "reselect"
import { ReduxRootState } from "Renderer/store"
import { ContactsState } from "App/contacts/reducers/contacts.interface"

export const contactsStateSelector: Selector<
  ReduxRootState,
  ContactsState
> = (state) => state.contacts
