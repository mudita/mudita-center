/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { State } from "App/core/constants"
import { clearState } from "App/update/actions/base.action"
import { UpdateOsEvent } from "App/update/constants"
import { ReduxRootState, RootState } from "App/__deprecated__/renderer/store"

export const handleDeviceAttached = createAsyncThunk<void, void>(
  UpdateOsEvent.HandleDeviceAttached,
  (_, { dispatch, getState }) => {
    const { update } = getState() as RootState & ReduxRootState

    if (update.updateOsState === State.Loading) {
      return
    }

    dispatch(clearState())
  }
)
