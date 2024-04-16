/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Selector } from "reselect"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import { UpdateOsState } from "Core/update/reducers/update-os.interface"

export const updateStateSelector: Selector<ReduxRootState, UpdateOsState> = (
  state
) => state.update
