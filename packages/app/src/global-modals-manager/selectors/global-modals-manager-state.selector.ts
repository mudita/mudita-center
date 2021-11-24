/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Selector } from "reselect"
import { ReduxRootState } from "Renderer/store"
import { GlobalModalsManagerState } from "App/global-modals-manager/reducers"

export const globalModalsManagerStateSelector: Selector<ReduxRootState, GlobalModalsManagerState> = (
  state
) => state.globalModalsManager
