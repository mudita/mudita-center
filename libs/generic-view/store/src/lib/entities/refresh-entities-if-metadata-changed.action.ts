/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import { ActionName } from "../action-names"
import { getEntitiesMetadataAction } from "./get-entities-metadata.action"
import { selectEntitiesMetadata } from "../selectors"
import { getEntitiesDataAction } from "./get-entities-data.action"
import { EntitiesMetadata } from "Libs/device/models/src"

export const refreshEntitiesIfMetadataChanged = createAsyncThunk<
  void,
  { deviceId: string; entitiesType: string },
  { state: ReduxRootState }
>(
  ActionName.RefreshEntitiesIfMetadataChanged,
  async (
    { deviceId, entitiesType },
    { dispatch, getState, rejectWithValue }
  ) => {
    if (!deviceId) {
      return rejectWithValue(undefined)
    }

    const currentMetadata = selectEntitiesMetadata(getState(), {
      deviceId,
      entitiesType,
    })

    const metadata = await dispatch(
      getEntitiesMetadataAction({ deviceId, entitiesType })
    )

    if (
      currentMetadata?.uniqueKey !==
      (metadata.payload as EntitiesMetadata)?.uniqueKey
    ) {
      dispatch(getEntitiesDataAction({ deviceId, entitiesType }))
    }

    return
  }
)
