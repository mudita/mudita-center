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

// export const getAPIConfigRequest = () => {
export const getAPIConfigRequest = (
  ver: number
): Promise<ResultObject<APIConfigResponse>> => {
  //   let event: string = "v1"
  //   if (ver > 1 && ver < 4) {
  //     event = "v2"
  //   } else if (ver >= 4 && ver < 10) {
  //     event = "v4"
  //   } else {
  //     throw new Error()
  //   }
  return ipcRenderer.callMain(APIServiceEvents.APIConfig)
}

export const getAPIConfig = createAsyncThunk<
  void,
  void,
  { state: ReduxRootState }
>(APIActions.GetConfig, async () => {
  const { ok, data, error } = await getAPIConfigRequest(3)

  if (ok) {
    const x = data
    console.log(x)
  }
  //   console.log(res)

  //   if (error || data === undefined) {
  //     return rejectWithValue(
  //       new AppError(
  //         MessagesError.AddNewMessage,
  //         "Add New Message request failed"
  //       )
  //     )
  //   }

  return
})
