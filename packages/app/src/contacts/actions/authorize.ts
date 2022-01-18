/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { ContactsEvent } from "App/contacts/constants"
import { ExternalProvider, Provider } from "Renderer/models/external-providers/external-providers.interface"
import externalProvidersStore from "Renderer/store/external-providers"
import { Scope } from "Renderer/models/external-providers/google/google.interface"
import { OutLookScope } from "Renderer/models/external-providers/outlook/outlook.interface"

export const authorize = createAsyncThunk<any, ExternalProvider>(
  ContactsEvent.Authorize,
  (payload) => {
    switch (payload) {
      case Provider.Google:
        return externalProvidersStore.dispatch.google.authorize(
          Scope.Contacts
        )
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
