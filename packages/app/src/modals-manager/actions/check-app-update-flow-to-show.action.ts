/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { ReduxRootState, RootState } from "App/__deprecated__/renderer/store"
import { ModalsManagerEvent } from "App/modals-manager/constants"
import { showModal } from "App/modals-manager/actions/base.action"
import { ModalStateKey } from "App/modals-manager/reducers"

export const checkAppUpdateFlowToShow = createAsyncThunk<void, undefined>(
  ModalsManagerEvent.CheckAppUpdateFlowToShow,
  async (_, { getState, dispatch }) => {
    const state = getState() as RootState & ReduxRootState
    if (
      state.settings.settingsLoaded &&
      state.settings.appUpdateAvailable &&
      !state.modalsManager.collectingDataModalShow &&
      !state.modalsManager.appForcedUpdateFlowShow
    ) {
      dispatch(showModal(ModalStateKey.AppUpdateFlow))
    }
  }
)
