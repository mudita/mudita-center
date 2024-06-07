/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAction } from "@reduxjs/toolkit"
import { ActionName } from "../action-names"
import { Scope } from "./google/google.interface"
import { TokenPayload } from "Core/__deprecated__/renderer/models/external-providers/outlook/outlook.interface"

export const setGoogleAuthData = createAction<{ scope: Scope; data: unknown }>(
  ActionName.SetGoogleAuthDataProcess
)

export const setOutlookAuthData = createAction<{
  scope: string
  data: TokenPayload
}>(ActionName.SetOutlookAuthDataProcess)
