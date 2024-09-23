/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { ActionName } from "../action-names"
import { getEntitiesMetadataRequest } from "device/feature"
import { setEntitiesMetadata } from "./actions"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"

export const getEntitiesMetadataAction = createAsyncThunk<
  undefined,
  Required<Parameters<typeof getEntitiesMetadataRequest>[0]>,
  { state: ReduxRootState }
>(ActionName.GetEntitiesData, async (data, { rejectWithValue, dispatch }) => {
  const response = await getEntitiesMetadataRequest(data)

  if (!response.ok) {
    return rejectWithValue(response.error)
  }

  dispatch(
    setEntitiesMetadata({
      entitiesType: data.entitiesType,
      metadata: response.data,
      deviceId: data.deviceId,
    })
  )
  return
})
