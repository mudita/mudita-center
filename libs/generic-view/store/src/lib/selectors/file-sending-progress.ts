/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createSelector } from "@reduxjs/toolkit"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"

export const selectFileSendingProgress = createSelector(
  (state: ReduxRootState) => state.genericFileTransfer.sendingFilesProgress,
  (state: ReduxRootState, transferId?: number) => transferId,
  (filesProgress, transferId) => {
    if (!transferId || !filesProgress || !filesProgress[transferId]) {
      return
    }
    return (
      filesProgress[transferId].chunksTransferred /
      filesProgress[transferId].chunksCount
    )
  }
)
