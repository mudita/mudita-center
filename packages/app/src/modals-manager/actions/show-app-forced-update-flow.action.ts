/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { initialState } from "App/modals-manager/reducers"
import { ModalsManagerEvent } from "App/modals-manager/constants"
import { setModalsState } from "App/modals-manager/actions/base.action"
import { ReduxRootState, RootState } from "Renderer/store"

export const showAppForcedUpdateFlow = createAsyncThunk<void, undefined>(
  ModalsManagerEvent.ShowAppForcedUpdateFlow,
  async (_, { getState, dispatch }) => {
    const state = getState() as RootState & ReduxRootState
    if (!state.modalsManager.collectingDataModalShow) {
      dispatch(
        setModalsState({ ...initialState, appForcedUpdateFlowShow: true })
      )
    }
  }
)
