/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAction, createAsyncThunk } from "@reduxjs/toolkit"
import { SynchronizeTimeEvent } from "../constants/event.constant"
import { synchronizeTimeRequest } from "Core/time-synchronization/requests/synchronize-time.request"
import delayResponse from "@appnroll/delay-response"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import { getTime } from "./get-time.action"

export const synchronizeTime = createAsyncThunk<
  void,
  undefined,
  { state: ReduxRootState }
>(
  SynchronizeTimeEvent.Synchronize,
  async (_, { rejectWithValue, abort, dispatch, getState }) => {
    getState().timeSynchronization.abortController?.abort()

    const abortController = new AbortController()
    abortController.abort = abort
    dispatch(setTimeSynchronizationAbortController(abortController))

    const response = await delayResponse(synchronizeTimeRequest(), 3000)
    if (response.error) {
      return rejectWithValue(response.error)
    }
    dispatch(getTime())
    return
  }
)

export const setTimeSynchronizationAbortController =
  createAction<AbortController>(SynchronizeTimeEvent.SetAbortController)
