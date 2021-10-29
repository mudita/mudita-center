/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Selector } from "reselect"
import { ReduxRootState, RootState } from "Renderer/store"
import { ContactsState } from "App/contacts/store/contacts.type"

export const contactsStateSelector: Selector<
  RootState & ReduxRootState,
  ContactsState
> = (state) => state.contacts
