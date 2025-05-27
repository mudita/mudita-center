/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { deleteEntitiesDataRequest } from "device/feature"
import { DeviceId } from "Core/device/constants/device-id"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import { ActionName } from "../action-names"
import { EntitiesDeleteResponse, EntityId } from "device/models"
import { difference } from "lodash"
import delayResponse from "@appnroll/delay-response"
import { getEntitiesMetadataAction } from "./get-entities-metadata.action"
import { openToastAction } from "../toasts/open-toast.action"
import { IconType } from "generic-view/utils"
import { intl } from "Core/__deprecated__/renderer/utils/intl"

interface DeleteEntitiesDataActionPayload {
  entitiesType: string
  ids: EntityId[]
  deviceId: DeviceId
  onSuccess?: () => Promise<void> | void
  onError?: () => Promise<void> | void
  successMessage?: string
}

export const deleteEntitiesDataAction = createAsyncThunk<
  EntityId[],
  DeleteEntitiesDataActionPayload,
  {
    state: ReduxRootState
    rejectValue: { failedIds: string[]; successIds: string[] } | undefined
  }
>(
  ActionName.DeleteEntitiesData,
  async (
    { entitiesType, ids, deviceId, onSuccess, onError, successMessage },
    { rejectWithValue, dispatch }
  ) => {
    const response = await delayResponse(
      deleteEntitiesDataRequest({
        entitiesType,
        ids,
        deviceId,
      }),
      1000
    )

    if (!response.ok || response.data?.failedIds) {
      await onError?.()
      if (response.data) {
        const failedIds = (response.data as EntitiesDeleteResponse)!.failedIds
        const successIds = (response.data as EntitiesDeleteResponse)!.failedIds
          ? difference(
              ids,
              (response.data as EntitiesDeleteResponse)!.failedIds
            )
          : ids

        return rejectWithValue({ failedIds, successIds })
      }
      return rejectWithValue(undefined)
    }
    await onSuccess?.()

    await dispatch(
      openToastAction({
        key: `${entitiesType}DeleteSuccessToast`,
        text: intl.formatMessage(
          successMessage
            ? { id: "none", defaultMessage: successMessage }
            : {
                id: "module.genericViews.entities.delete.success.toastMessage",
              },
          { count: ids.length }
        ),
        icon: IconType.Success,
      })
    )

    await dispatch(getEntitiesMetadataAction({ entitiesType, deviceId }))
    return ids
  }
)
