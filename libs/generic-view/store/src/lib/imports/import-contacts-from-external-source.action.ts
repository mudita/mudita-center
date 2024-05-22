/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import { ActionName } from "../action-names"
import externalProvidersStore from "Core/__deprecated__/renderer/store/external-providers"
import { GoogleContactResourceItem } from "Core/__deprecated__/renderer/models/external-providers/google/google.interface"
import { UnifiedContact } from "device/models"
import { mapGoogleApi } from "./contacts-mappers/google-api/map-google-api"
import { addMissingFields } from "./contacts-mappers/helpers"

export const importContactsFromExternalSource = createAsyncThunk<
  UnifiedContact[],
  undefined,
  { state: ReduxRootState }
>(
  ActionName.ImportContactsFromExternalSource,
  async (_, { getState, dispatch, rejectWithValue, signal }) => {
    // eslint-disable-next-line @typescript-eslint/await-thenable
    const contacts = (await externalProvidersStore.dispatch.google.getContacts({
      skipMapping: true,
    })) as unknown as GoogleContactResourceItem[]

    return mapGoogleApi(contacts).map(addMissingFields)
  }
)
