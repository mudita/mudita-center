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
import {
  googleCloseWindowRequest,
  outlookCloseWindowRequest,
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
