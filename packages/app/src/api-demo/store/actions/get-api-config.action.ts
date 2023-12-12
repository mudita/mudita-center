/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { ipcRenderer } from "electron-better-ipc"
import { APIConfigResponse } from "App/api-main/api-module"
import { ReduxRootState } from "App/__deprecated__/renderer/store"
import { ResultObject } from "App/core/builder"
import { APIServiceEvents } from "App/api-main/api-config.service"

enum APIActions {
  GetConfig = "api-actions-get-config",
}

export const getAPIConfigRequest = (
  ver: number
): Promise<ResultObject<APIConfigResponse>> => {
  return ipcRenderer.callMain(APIServiceEvents.APIConfig)
}

export const getAPIAny = (ver: any): Promise<ResultObject<any>> => {
  return ipcRenderer.callMain(APIServiceEvents.APIAny, ver)
}

export const getAPIConfig = createAsyncThunk<
  any,
  any,
  { state: ReduxRootState }
>(APIActions.GetConfig, async (payload) => {
  const response = await getAPIAny(payload ?? {})

  return response
})
