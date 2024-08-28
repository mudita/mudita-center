/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import { ActionName } from "../action-names"
import { setDataTransferAbort } from "./actions"

export const abortDataTransfer = createAsyncThunk<
  void,
  undefined,
  { state: ReduxRootState }
>(ActionName.AbortDataTransfer, (_, { getState, dispatch }) => {
  const { genericDataTransfer } = getState()

  genericDataTransfer.abortController?.abort?.()
  dispatch(setDataTransferAbort(undefined))
  return
})
