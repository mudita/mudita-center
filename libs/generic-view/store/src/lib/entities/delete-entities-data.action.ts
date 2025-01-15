/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { deleteEntitiesDataRequest } from "device/feature"
import { DeviceId } from "Core/device/constants/device-id"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import { ActionName } from "../action-names"
import { EntityId } from "device/models"
import { difference } from "lodash"
import delayResponse from "@appnroll/delay-response"
import { getEntitiesMetadataAction } from "./get-entities-metadata.action"

interface DeleteEntitiesDataActionPayload {
  entitiesType: string
  ids: EntityId[]
  deviceId: DeviceId
  onSuccess?: () => Promise<void> | void
  onError?: () => Promise<void> | void
}

export const deleteEntitiesDataAction = createAsyncThunk<
  EntityId[],
  DeleteEntitiesDataActionPayload,
  { state: ReduxRootState }
>(
  ActionName.DeleteEntitiesData,
  async (
    { entitiesType, ids, deviceId, onSuccess, onError },
    { rejectWithValue, dispatch }
  ) => {
    const idsToDelete = ids.concat(["555555555555555"])
    const response = await delayResponse(
      deleteEntitiesDataRequest({
        entitiesType,
        ids: idsToDelete,
        deviceId,
      }),
      1000
    )
    if (!response.ok) {
      await onError?.()
      return rejectWithValue(response.error)
    }
    console.log("Łodpowiedź: ", response)
    await onSuccess?.()
    await dispatch(getEntitiesMetadataAction({ entitiesType, deviceId }))
    return response.data?.failedIds
      ? difference(ids, response.data.failedIds)
      : ids
  }
)
