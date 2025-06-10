/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ThunkDispatch, UnknownAction } from "@reduxjs/toolkit"
import { Dispatch } from "react"
import { AppStore } from "./app-store"

export type AppDispatch = ThunkDispatch<AppStore, undefined, UnknownAction> &
  Dispatch<UnknownAction>
