/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ThunkDispatch, UnknownAction } from "@reduxjs/toolkit"
import { Dispatch } from "react"
import { AppState } from "./app-state"

export type AppDispatch = ThunkDispatch<AppState, undefined, UnknownAction> &
  Dispatch<UnknownAction>
