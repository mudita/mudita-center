/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { initialState } from "App/modals-manager/reducers"
import { ModalsManagerEvent } from "App/modals-manager/constants"
import { setModalsState } from "App/modals-manager/actions/base.action"

export const showCollectingDataModal = createAsyncThunk<void, undefined>(
  ModalsManagerEvent.ShowCollectingDataModal,
  async (_, { dispatch }) => {
    dispatch(setModalsState({ ...initialState, collectingDataModalShow: true }))
  }
)
