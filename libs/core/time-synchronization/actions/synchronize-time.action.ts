/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { SynchronizeTimeEvent } from "../constants/event.constant"
import { synchronizeTimeRequest } from "Core/time-synchronization/requests/synchronize-time.request"
import delayResponse from "@appnroll/delay-response"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import { setAbortController } from "../reducers/set-abort-controller"

export const synchronizeTime = createAsyncThunk<boolean, undefined>(
  SynchronizeTimeEvent.Synchronize,
  async (_, { rejectWithValue, abort, signal, dispatch }) => {
    const abortController = new AbortController()
    abortController.abort = abort
    dispatch(setAbortController(abortController))

    signal.addEventListener("abort", () => {
      return rejectWithValue("Aborted")
    })

    if (signal.aborted) {
      return rejectWithValue("Aborted")
    }
    const response = await delayResponse(synchronizeTimeRequest(), 500)

    if (response.error) {
      return rejectWithValue(response.error)
    }

    return true
  }
)

export const abortTimeSynchronization = createAsyncThunk<
  void,
  undefined,
  { state: ReduxRootState }
>(SynchronizeTimeEvent.Abort, (_, { getState }) => {
  const abortController = getState().timeSynchronization.abortController
  abortController?.abort()
})
