/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { ActionName } from "generic-view/store"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import { selectFlashingAbortController } from "../selectors/select-flashing-abort-controller"
import { setFlashingProcessState } from "./set-flashing-process-state.action"
import { FlashingProcessState } from "../constants"

export const abortMscFlashing = createAsyncThunk<
  void,
  { reason?: Extract<FlashingProcessState, "canceled" | "failed"> } | undefined,
  { state: ReduxRootState }
>(
  ActionName.MscFlashingAbort,
  async ({ reason } = {}, { dispatch, getState }) => {
    const abortController = selectFlashingAbortController(getState())

    abortController?.abort?.()

    if (reason) {
      dispatch(setFlashingProcessState(reason))
    }

    return
  }
)
