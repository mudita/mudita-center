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
  errorMessage?: string
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
    {
      entitiesType,
      ids,
      deviceId,
      onSuccess,
      onError,
      successMessage,
      errorMessage,
    },
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

    const failedIds = !response.ok
      ? ids
      : (response.data as EntitiesDeleteResponse | undefined)?.failedIds ?? []
    const successIds = failedIds.length > 0 ? difference(ids, failedIds) : ids

    if (entitiesType !== "contacts" && failedIds.length > 0) {
      await onError?.()
      if (response.data) {
        return rejectWithValue({ failedIds, successIds })
      }
      return rejectWithValue(undefined)
    }
    await onSuccess?.()
    const toastConfig = {
      key: `${entitiesType}DeleteSuccessToast`,
      text: getToastText(successIds, successMessage, errorMessage),
      icon: successIds.length > 0 ? IconType.Success : IconType.Failure,
    }
    await dispatch(openToastAction(toastConfig))
    await dispatch(getEntitiesMetadataAction({ entitiesType, deviceId }))
    return successIds
  }
)

function getToastText(
  successIds: EntityId[],
  successMessage?: string,
  errorMessage?: string
) {
  if (successIds.length === 0) {
    return intl.formatMessage(
      errorMessage
        ? { id: "none", defaultMessage: errorMessage }
        : { id: "module.genericViews.entities.delete.error.toastMessage" }
    )
  }
  return intl.formatMessage(
    successMessage
      ? { id: "none", defaultMessage: successMessage }
      : { id: "module.genericViews.entities.delete.success.toastMessage" },
    { count: successIds.length }
  )
}
