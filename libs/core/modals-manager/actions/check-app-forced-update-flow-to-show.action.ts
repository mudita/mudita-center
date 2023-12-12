/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { ReduxRootState, RootState } from "Core/__deprecated__/renderer/store"
import { ModalsManagerEvent } from "Core/modals-manager/constants"
import { showModal } from "Core/modals-manager/actions/base.action"
import { ModalStateKey } from "Core/modals-manager/reducers"

export const checkAppForcedUpdateFlowToShow = createAsyncThunk<void, undefined>(
  ModalsManagerEvent.CheckAppForcedUpdateFlowToShow,
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/require-await
  async (_, { getState, dispatch }) => {
    const state = getState() as RootState & ReduxRootState

    if (state.settings.loaded && state.settings.updateRequired) {
      dispatch(showModal(ModalStateKey.AppForcedUpdateFlow))
    }
  }
)
