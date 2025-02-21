/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { PayloadAction, createAsyncThunk } from "@reduxjs/toolkit"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import { ActionName } from "../action-names"
import { GoogleContactResourceItem } from "generic-view/store"
import { UnifiedContact } from "device/models"
import { mapGoogleApi } from "./contacts-mappers/google-api/map-google-api"
import { addMissingFields } from "./contacts-mappers/helpers"
import { googleGetContacts } from "../external-providers/google/google-get-contacts.action"
import { outlookGetContacts } from "../external-providers/outlook/outlook-get-contacts.action"
import { Contact } from "Core/contacts/reducers/contacts.interface"
import { mapOutlookApi } from "./contacts-mappers/outlook-api/map-outlook-api"

export const importContactsFromExternalSource = createAsyncThunk<
  UnifiedContact[],
  undefined,
  { state: ReduxRootState }
>(
  ActionName.ImportContactsFromExternalSource,
  async (_, { getState, dispatch }) => {
    const provider = getState().genericImport.currentImportProvider

    if (provider === "GOOGLE") {
      // eslint-disable-next-line @typescript-eslint/await-thenable
      const { payload } = (await dispatch(
        googleGetContacts({
          skipMapping: true,
        })
      )) as PayloadAction<GoogleContactResourceItem[] | []>

      return mapGoogleApi(payload).map(addMissingFields)
    }

    if (provider === "OUTLOOK") {
      // eslint-disable-next-line @typescript-eslint/await-thenable
      const { payload } = (await dispatch(
        outlookGetContacts()
      )) as PayloadAction<Contact[] | []>

      return mapOutlookApi(payload).map(addMissingFields)
    }

    return []
  }
)
