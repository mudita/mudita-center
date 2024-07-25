/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { ContactsEvent } from "Core/contacts/constants"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import {
  Scope,
  googleAuthorize,
  outlookAuthorize,
  ExternalProvider,
  Provider,
  OutLookScope,
} from "generic-view/store"

// AUTO DISABLED - fix me if you like :)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const authorize = createAsyncThunk<
  unknown,
  ExternalProvider,
  { state: ReduxRootState }
>(ContactsEvent.Authorize, async (payload, { dispatch }) => {
  switch (payload) {
    case Provider.Google:
      return dispatch(googleAuthorize(Scope.Contacts)).unwrap()
    case Provider.Apple:
      return undefined
    case Provider.Outlook:
      return dispatch(outlookAuthorize(OutLookScope.Contacts)).unwrap()
    default:
      return undefined
  }
})
