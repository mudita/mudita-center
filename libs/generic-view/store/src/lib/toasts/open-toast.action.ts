/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { Toast } from "./reducer"
import { ActionName } from "../action-names"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import { addToast } from "./actions"

export const openToastAction = createAsyncThunk<
  void,
  Toast,
  { state: ReduxRootState }
>(ActionName.OpenToast, async (toastData, { dispatch }) => {
  dispatch(addToast(toastData))
  // Delay action to add toast before the state will update
  await new Promise((resolve) => setTimeout(resolve, 100))
  return
})
