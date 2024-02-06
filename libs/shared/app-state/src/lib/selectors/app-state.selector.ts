/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import { AppState } from "shared/app-state"

export const appStateSelector = (state: ReduxRootState): AppState => {
  return state.appState
}
