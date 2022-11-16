/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAction, PayloadAction } from "@reduxjs/toolkit"
import { State } from "App/core/constants"
import { UpdateOsEvent } from "App/update/constants"

export const setUpdateState = createAction<State>(UpdateOsEvent.SetUpdateState)

export type SetUpdateStateAction = PayloadAction<
  State,
  UpdateOsEvent.SetUpdateState
>
