/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { ModalsManagerEvent } from "App/modals-manager/constants"
import { hideModals } from "App/modals-manager/actions/base.action"
import { checkAppForcedUpdateFlowToShow } from "App/modals-manager/actions/check-app-forced-update-flow-to-show.action"
import { checkAppUpdateFlowToShow } from "App/modals-manager/actions/check-app-update-flow-to-show.action"

export const hideCollectingDataModal = createAsyncThunk<void, undefined>(
  ModalsManagerEvent.HideCollectingDataModal,
  async (_, { dispatch }) => {
    dispatch(hideModals())
    dispatch(checkAppUpdateFlowToShow())
    dispatch(checkAppForcedUpdateFlowToShow())
  }
)
