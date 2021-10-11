/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAction } from "@reduxjs/toolkit"
import { RestoreDeviceEvent } from "App/restore-device/constants"

export const readRestoreDeviceDataState = createAction(
  RestoreDeviceEvent.ReadRestoreDeviceDataState
)
