/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { State } from "App/core/constants"
import { clearStateAndData } from "App/update/actions/base.action"
import { UpdateOsEvent } from "App/update/constants"
import { ReduxRootState } from "App/__deprecated__/renderer/store"

export const handleDeviceAttached = createAsyncThunk<
  void,
  void,
  { state: ReduxRootState }
>(UpdateOsEvent.HandleDeviceAttached, (_, { dispatch, getState }) => {
  const { update, backup } = getState()

  if (
    update.updateOsState === State.Loading ||
    backup.restoringState === State.Loading ||
    backup.backingUpState === State.Loading
  ) {
    return
  }

  dispatch(clearStateAndData())
})
