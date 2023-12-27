/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import { DataSyncState } from "Core/data-sync/reducers"

export const dataSyncStateSelector = (state: ReduxRootState): DataSyncState =>
  state.dataSync
