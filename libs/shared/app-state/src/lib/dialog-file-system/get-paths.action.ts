/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { ResultObject } from "Core/core/builder"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import { ActionName } from "../action-name"
import { getPathsRequest } from "./get-paths.request"
import { GetPathsInput } from "./get-paths-input.object"

export const getPaths = createAsyncThunk<
  ResultObject<string[] | undefined>,
  GetPathsInput,
  { state: ReduxRootState }
>(ActionName.GetPaths, (input) => {
  return getPathsRequest(input)
})
