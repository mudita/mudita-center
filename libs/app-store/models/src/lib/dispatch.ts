/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import type { ThunkDispatch, UnknownAction } from "@reduxjs/toolkit"
import type { AppState } from "./app-state"

export type AppDispatch = ThunkDispatch<AppState, unknown, UnknownAction>
