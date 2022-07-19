/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Selector } from "@reduxjs/toolkit"
import { SettingsState } from "App/settings/reducers/settings.interface"
import { ReduxRootState } from "App/__deprecated__/renderer/store"

export const settingsStateSelector: Selector<ReduxRootState, SettingsState> = (
  state
) => state.settings
