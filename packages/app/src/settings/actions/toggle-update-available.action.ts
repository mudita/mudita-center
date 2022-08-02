/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { SettingsEvent } from "App/settings/constants"
import { checkAppUpdateFlowToShow } from "App/modals-manager/actions"

export const toggleUpdateAvailable = createAsyncThunk<boolean, boolean>(
  SettingsEvent.ToggleUpdateAvailable,
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/require-await
  async (payload, { dispatch }) => {
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    dispatch(checkAppUpdateFlowToShow())

    return payload
  }
)
