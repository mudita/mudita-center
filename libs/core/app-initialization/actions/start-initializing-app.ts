/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import { AppInitializationEvent } from "Core/app-initialization/constants/event.constant"
import { initAnalyticDataTracker } from "Core/analytic-data-tracker/helpers"
import { checkUpdateAvailable, loadSettings } from "Core/settings/actions"
import { checkAppRequiresSerialPortGroup } from "Core/modals-manager/actions"

export const startInitializingApp = createAsyncThunk<
  void,
  void,
  { state: ReduxRootState }
>(AppInitializationEvent.StartInitializingApp, async (_, { dispatch }) => {
  console.log("startInitializingApp")

  await initAnalyticDataTracker()

  await dispatch(loadSettings())

  await dispatch(checkUpdateAvailable())

  void dispatch(checkAppRequiresSerialPortGroup())
})
