/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { ReduxRootState, RootState } from "Renderer/store"
import { ModalsManagerEvent } from "App/modals-manager/constants"
import { showCollectingDataModal } from "App/modals-manager/actions/index"

export const checkCollectingDataModalToShow = createAsyncThunk<void, undefined>(
  ModalsManagerEvent.CheckCollectingDataModalToShow,
  async (_,{ getState, dispatch }) => {
    const state = getState() as RootState & ReduxRootState
    if (
      state.settings.settingsLoaded &&
      state.settings.appCollectingData === undefined
    ) {
      dispatch(showCollectingDataModal())
    }
  }
)
