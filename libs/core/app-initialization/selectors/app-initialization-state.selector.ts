/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import { AppInitializationState } from "Core/app-initialization/reducers/app-initialization.interface"

export const appInitializationState = (
  state: ReduxRootState
): AppInitializationState => state.appInitialization
