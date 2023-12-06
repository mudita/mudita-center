/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { DeviceEvent } from "Core/device/constants"
import { MetadataKey, setValue } from "Core/metadata"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import { State } from "Core/core/constants"
import { setInitState } from "Core/device/actions/base.action"
import { setDataSyncInitState } from "Core/data-sync/actions"
import { readRestoreDeviceDataState } from "Core/backup/actions"

export const setConnectionStatus = createAsyncThunk<boolean, boolean>(
  DeviceEvent.SetConnectionState,
  (payload, { getState, dispatch }) => {
    const state = getState() as ReduxRootState

    if (!payload) {
      dispatch(setDataSyncInitState())
    }

    if (state.update.updateOsState === State.Loading) {
      return payload
    }

    if (state.backup.restoringState === State.Loading) {
      return payload
    }

    if (state.backup.backingUpState === State.Loading) {
      return payload
    }

    if (
      !payload ||
      state.backup.restoringState === State.Failed ||
      state.backup.backingUpState === State.Failed
    ) {
      dispatch(setInitState())
      dispatch(readRestoreDeviceDataState())
      void setValue({ key: MetadataKey.DeviceOsVersion, value: null })
      void setValue({ key: MetadataKey.DeviceType, value: null })
    }

    return payload
  }
)
