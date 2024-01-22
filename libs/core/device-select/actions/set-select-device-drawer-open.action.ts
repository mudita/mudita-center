/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAction } from "@reduxjs/toolkit"
import { DeviceSelectEvent } from "Core/device-select/constants/event.constant"

export const setSelectDeviceDrawerOpen = createAction<boolean>(
  DeviceSelectEvent.SetSelectDeviceDrawerOpen
)
