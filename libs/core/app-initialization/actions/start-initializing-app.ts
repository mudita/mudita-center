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
import { loadNews } from "Core/news/actions"

export const startInitializingApp = createAsyncThunk<
  void,
  void,
  { state: ReduxRootState }
>(AppInitializationEvent.StartInitializingApp, async (_, { dispatch }) => {
  void initAnalyticDataTracker()
  await dispatch(loadSettings())
  await dispatch(checkUpdateAvailable())
  await dispatch(checkAppRequiresSerialPortGroup())
  await dispatch(loadNews())
})
