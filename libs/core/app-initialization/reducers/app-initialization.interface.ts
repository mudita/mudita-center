/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export interface AppInitializationState {
  appInitializationStatus: AppInitializationStatus
  appInitializationPreparationFinished: boolean
}

export enum AppInitializationStatus {
  Idle = "IDLE",
  Initializing = "INITIALIZING",
  Initialized = "INITIALIZED",
  Aborted = "ABORTED",
}
