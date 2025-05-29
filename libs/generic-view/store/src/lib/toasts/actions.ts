/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAction } from "@reduxjs/toolkit"
import { Toast } from "./reducer"
import { ActionName } from "../action-names"

export const addToast = createAction<Toast>(
  ActionName.AddToast
)
export const removeToast = createAction(ActionName.RemoveToast)
