/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import { ActionName } from "../action-names"
import externalProvidersStore from "Core/__deprecated__/renderer/store/external-providers"
import { Scope } from "Core/__deprecated__/renderer/models/external-providers/google/google.interface"

export const importContactsFromExternalSource = createAsyncThunk<
  unknown,
  undefined,
  { state: ReduxRootState }
>(
  ActionName.ImportContactsFromExternalSource,
  async (_, { getState, dispatch, rejectWithValue, signal }) => {
    await new Promise((resolve) => {
      setTimeout(resolve, 5000)
    })

    return undefined
  }
)