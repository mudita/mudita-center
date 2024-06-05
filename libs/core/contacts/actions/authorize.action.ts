/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { ContactsEvent } from "Core/contacts/constants"
import {
  ExternalProvider,
  Provider,
} from "Core/__deprecated__/renderer/models/external-providers/external-providers.interface"
import { Scope } from "Core/__deprecated__/renderer/models/external-providers/google/google.interface"
import { OutLookScope } from "Core/__deprecated__/renderer/models/external-providers/outlook/outlook.interface"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import { googleAuthorize, outlookAuthorize } from "generic-view/store"

// AUTO DISABLED - fix me if you like :)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const authorize = createAsyncThunk<
  unknown,
  ExternalProvider,
  { state: ReduxRootState }
>(ContactsEvent.Authorize, async (payload, { dispatch }) => {
  switch (payload) {
    case Provider.Google:
      return dispatch(googleAuthorize(Scope.Contacts))
    case Provider.Apple:
      return undefined
    case Provider.Outlook:
      return dispatch(outlookAuthorize(OutLookScope.Contacts))
    default:
      return undefined
  }
})
