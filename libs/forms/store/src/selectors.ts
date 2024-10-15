/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createSelector } from "reselect"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import { DeviceId } from "Core/device/constants/device-id"

export const selectForm = createSelector(
  (state: ReduxRootState) => state.forms,
  (state: ReduxRootState, params: { deviceId?: DeviceId; formName: string }) =>
    params,
  (forms, { deviceId, formName }) => {
    return forms[deviceId ?? "app"]?.[formName]
  }
)
