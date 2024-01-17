/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { ipcRenderer } from "electron-better-ipc"
import { ResultObject } from "Core/core/builder"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import { APIConfigServiceEvents } from "device/models"

enum APIActions {
  GetConfig = "api-actions-get-config",
}

export const getAPIAny = (ver: unknown): Promise<ResultObject<unknown>> => {
  return ipcRenderer.callMain(APIConfigServiceEvents.APIAny, ver)
}

export const getAPIConfig = createAsyncThunk<
  unknown,
  unknown,
  { state: ReduxRootState }
>(APIActions.GetConfig, (payload) => {
  return getAPIAny(payload ?? {})
})
