/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { ContactsEvent } from "App/contacts/constants"
import {
  ExternalProvider,
  Provider,
} from "App/__deprecated__/renderer/models/external-providers/external-providers.interface"
import externalProvidersStore from "App/__deprecated__/renderer/store/external-providers"
import { Scope } from "App/__deprecated__/renderer/models/external-providers/google/google.interface"
import { OutLookScope } from "App/__deprecated__/renderer/models/external-providers/outlook/outlook.interface"

// AUTO DISABLED - fix me if you like :)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const authorize = createAsyncThunk<any, ExternalProvider>(
  ContactsEvent.Authorize,
  (payload) => {
    switch (payload) {
      case Provider.Google:
        return externalProvidersStore.dispatch.google.authorize(Scope.Contacts)
      case Provider.Apple:
        return undefined
      case Provider.Outlook:
        return externalProvidersStore.dispatch.outlook.authorize(
          OutLookScope.Contacts
        )
      default:
        return undefined
    }
  }
)
