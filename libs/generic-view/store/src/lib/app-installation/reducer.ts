/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createReducer } from "@reduxjs/toolkit"
import { startAppInstallationAction } from "./start-app-installation.action"
import { getAppinstallationProgressAction } from "./get-app-installation-progress.action"

interface AppInstallationState {
  installationProgress: {
    fileName: string
    installationId: number
    progress: number
  }
}

const initialState: AppInstallationState = {
  installationProgress: {
    fileName: "",
    installationId: 0,
    progress: 0,
  },
}

export const genericAppInstallationReducer = createReducer(
  initialState,
  (builder) => {
    builder
      .addCase(startAppInstallationAction.pending, (state, action) => {
        state.installationProgress.fileName = action.meta.arg.fileName || ""
      })
      .addCase(startAppInstallationAction.fulfilled, (state, action) => {
        state.installationProgress.installationId =
          action.payload.installationId
      })
      .addCase(getAppinstallationProgressAction.fulfilled, (state, action) => {
        state.installationProgress.progress =
          action.payload.appInstallationProcessConfig.progress
      })
  }
)
