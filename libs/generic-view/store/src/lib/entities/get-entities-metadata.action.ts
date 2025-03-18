/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { ActionName } from "../action-names"
import { getEntitiesMetadataRequest } from "device/feature"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import { EntitiesMetadata } from "device/models"
import { selectDeviceEntityAbortController } from "../selectors/entities"

export const getEntitiesMetadataAction = createAsyncThunk<
  EntitiesMetadata,
  Required<Parameters<typeof getEntitiesMetadataRequest>[0]>,
  { state: ReduxRootState }
>(
  ActionName.GetEntitiesMetadata,
  async (data, { rejectWithValue }) => {
    const response = await getEntitiesMetadataRequest(data)

    if (!response.ok) {
      return rejectWithValue(response.error)
    }

    return response.data
  }
)
