/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import { ActionName } from "../action-names"
import { Scope } from "../external-providers/google/google.interface"
import { googleAuthorize } from "../external-providers/google/google-authorize.action"
import { ImportProvider } from "./reducer"
import { outlookAuthorize } from "../external-providers/outlook/outlook-authorize.action"
import { OutLookScope } from "../external-providers/outlook/outlook.interface"
import { cancelLoadEntities } from "../entities/cancel-load-entities.action"
import { selectActiveApiDeviceId } from "../selectors/select-active-api-device-id"

export const startImportAuthorization = createAsyncThunk<
  unknown,
  Exclude<ImportProvider, "FILE">,
  { state: ReduxRootState }
>(
  ActionName.StartImportAuthorization,
  async (provider, { dispatch, rejectWithValue, getState }) => {
    const deviceId = selectActiveApiDeviceId(getState())

    if (!deviceId) {
      return rejectWithValue(undefined)
    }

    await dispatch(cancelLoadEntities({ deviceId }))

    switch (provider) {
      case "GOOGLE":
        return await dispatch(googleAuthorize(Scope.Contacts)).unwrap()
      case "OUTLOOK":
        return await dispatch(outlookAuthorize(OutLookScope.Contacts)).unwrap()
      default:
        return rejectWithValue(undefined)
    }
  }
)
