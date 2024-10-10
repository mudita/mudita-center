/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Dispatch, createAsyncThunk } from "@reduxjs/toolkit"
import { ActionName } from "generic-view/store"
import { FlashingProcessState } from "../../constants"
import { setFlashingProcessState } from "../set-flashing-process-state/set-flashing-process-state.action"

export const abortFlashingProcess = createAsyncThunk<
  void,
  void,
  { dispatch: Dispatch; signal: AbortSignal }
>(ActionName.MscAbortFlashingProcess, async (_, { dispatch, signal }) => {
  const abortController = new AbortController()
  console.log("abort flashing process")
  signal.addEventListener("abort", () => {
    abortController.abort()
    dispatch(setFlashingProcessState(FlashingProcessState.Failed))
  })

  throw new Error("You lost connection to Your device")
})
