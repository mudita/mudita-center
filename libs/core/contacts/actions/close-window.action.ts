/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { ContactsEvent } from "Core/contacts/constants"
import {
  googleCloseWindowRequest,
  outlookCloseWindowRequest,
  ExternalProvider,
  Provider,
} from "generic-view/store"

export const closeWindow = createAsyncThunk<unknown, ExternalProvider>(
  ContactsEvent.CloseWindow,
  (payload) => {
    switch (payload) {
      case Provider.Google:
        return googleCloseWindowRequest()
      case Provider.Apple:
        return undefined
      case Provider.Outlook:
        return outlookCloseWindowRequest()
      default:
        return undefined
    }
  }
)
