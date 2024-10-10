/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { ActionName } from "generic-view/store"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import { selectFlashingAbortController } from "../selectors/select-flashing-abort-controller"

export const abortMscFlashing = createAsyncThunk<
  void,
  undefined,
  { state: ReduxRootState }
>(ActionName.MscFlashingAbort, async (_, { getState }) => {
  const abortController = selectFlashingAbortController(getState())

  abortController?.abort?.()

  return
})
