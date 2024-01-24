/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { ipcRenderer } from "electron-better-ipc"
import { ResultObject } from "Core/core/builder"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import { APIConfigServiceEvents } from "device/models"
import { ActionName } from "./action-names"

export const getAPIAnyRequest = (
  ver: unknown
): Promise<ResultObject<unknown>> => {
  return ipcRenderer.callMain(APIConfigServiceEvents.APIAny, ver)
}

export const getAPIAny = createAsyncThunk<
  unknown,
  unknown,
  { state: ReduxRootState }
>(ActionName.GetAny, (payload) => {
  return getAPIAnyRequest(payload ?? {})
})
