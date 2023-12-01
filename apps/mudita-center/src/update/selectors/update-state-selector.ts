/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Selector } from "reselect"
import { ReduxRootState } from "App/__deprecated__/renderer/store"
import { UpdateOsState } from "App/update/reducers/update-os.interface"

export const updateStateSelector: Selector<ReduxRootState, UpdateOsState> = (
  state
) => state.update
