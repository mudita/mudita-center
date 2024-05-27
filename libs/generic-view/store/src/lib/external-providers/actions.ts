/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAction } from "@reduxjs/toolkit"
import { ActionName } from "../action-names"
import { Scope } from "Core/__deprecated__/renderer/models/external-providers/google/google.interface"

export const setAuthData = createAction<{ scope: Scope; data: unknown }>(
  ActionName.SetAuthDataProcess
)
