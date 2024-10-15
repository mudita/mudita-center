/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { Toast } from "./reducer"
import { ActionName } from "../action-names"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import { addToast } from "./actions"
import { theme } from "generic-view/theme"

export const openToastAction = createAsyncThunk<
  void,
  Toast["key"],
  { state: ReduxRootState }
>(ActionName.OpenToast, async (toastKey, { dispatch }) => {
  dispatch(addToast(toastKey))
  // Delay any actions following this one
  // so the toast can render before the state will be potentially updated
  await new Promise((resolve) => {
    setTimeout(resolve, theme.animation.toast.duration)
  })
  return
})
