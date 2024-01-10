/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { ipcRenderer } from "electron-better-ipc"
import { ResultObject } from "Core/core/builder"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import { APIConfigResponse, APIServiceEvents } from "./api-config.service"

enum APIActions {
  GetConfig = "api-actions-get-config",
}

export const getAPIConfigRequest = (
  ver: number
): Promise<ResultObject<APIConfigResponse>> => {
  return ipcRenderer.callMain(APIServiceEvents.APIConfig)
}

export const getAPIAny = (ver: unknown): Promise<ResultObject<unknown>> => {
  return ipcRenderer.callMain(APIServiceEvents.APIAny, ver)
}

export const getAPIConfig = createAsyncThunk<
  unknown,
  unknown,
  { state: ReduxRootState }
>(APIActions.GetConfig, (payload) => {
  return getAPIAny(payload ?? {})
})
