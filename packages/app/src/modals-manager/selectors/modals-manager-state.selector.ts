/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Selector } from "reselect"
import { ReduxRootState } from "Renderer/store"
import { ModalsManagerState } from "App/modals-manager/reducers"

export const modalsManagerStateSelector: Selector<
  ReduxRootState,
  ModalsManagerState
> = (state) => state.modalsManager
