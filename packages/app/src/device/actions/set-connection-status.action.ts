/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { DeviceEvent, UpdatingState } from "App/device/constants"
import { MetadataKey, setValue } from "App/metadata"
import { ReduxRootState } from "App/__deprecated__/renderer/store"
import { State } from "App/core/constants"
import { setInitState } from "App/device/actions/base.action"
import { setDataSyncInitState } from "App/data-sync/actions"

export const setConnectionStatus = createAsyncThunk<boolean, boolean>(
  DeviceEvent.SetConnectionState,
  (payload, { getState, dispatch }) => {
    const state = getState() as ReduxRootState

    if (!payload) {
      dispatch(setDataSyncInitState())
    }

    if (state.device.updatingState === UpdatingState.Updating) {
      return payload
    }

    if (state.backup.restoringState === State.Loading) {
      return payload
    }

    if (state.backup.backingUpState === State.Loading) {
      return payload
    }

    if (!payload) {
      dispatch(setInitState())
      void setValue({ key: MetadataKey.DeviceOsVersion, value: null })
      void setValue({ key: MetadataKey.DeviceType, value: null })
    }

    return payload
  }
)
