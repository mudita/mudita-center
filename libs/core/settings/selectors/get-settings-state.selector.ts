/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { SettingsState } from "Core/settings/reducers/settings.interface"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"

export const settingsStateSelector = (state: ReduxRootState): SettingsState =>
  state.settings
