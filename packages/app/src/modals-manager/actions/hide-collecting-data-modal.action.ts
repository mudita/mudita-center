/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { ModalsManagerEvent } from "App/modals-manager/constants"
import { setModalsState } from "App/modals-manager/actions/base.action"
import { initialState } from "App/modals-manager/reducers"

export const hideCollectingDataModal = createAsyncThunk<void, undefined>(
  ModalsManagerEvent.HideCollectingDataModal,
  async (_,{ dispatch }) => {
    dispatch(setModalsState({...initialState}))
  }
)
