/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import { ActionName } from "../action-names"
import { Scope } from "../external-providers/google/google.interface"
import { googleAuthorize } from "../external-providers/google/google-authorize.action"

export const startGoogleAuthorization = createAsyncThunk<
  unknown,
  undefined,
  { state: ReduxRootState }
>(
  ActionName.StartGoogleAuthorization,
  async (_, { getState, dispatch, rejectWithValue, signal }) => {
    return dispatch(googleAuthorize(Scope.Contacts))
  }
)
