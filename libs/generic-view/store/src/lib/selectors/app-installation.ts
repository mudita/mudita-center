/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createSelector } from "@reduxjs/toolkit"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"

export const selectAppInstallationFileName = createSelector(
  (state: ReduxRootState) => state.genericAppInstallation.installationProgress,
  (installationProgress) => installationProgress.fileName
)

export const selectInstallationProgress = createSelector(
  (state: ReduxRootState) => state.genericAppInstallation.installationProgress,
  (installationProgress) => installationProgress.progress
)

export const selectInstallationId = createSelector(
  (state: ReduxRootState) => state.genericAppInstallation.installationProgress,
  (installationProgress) => installationProgress.installationId
)
