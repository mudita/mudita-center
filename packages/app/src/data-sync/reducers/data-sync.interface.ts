/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { PayloadAction } from "@reduxjs/toolkit"
import { DataSyncEvent } from "App/data-sync/constants"
import { AllIndexes } from "App/data-sync/types"
import {
  ReadAllIndexesError,
  UpdateAllIndexesError,
} from "App/data-sync/errors"

export enum SynchronizationState {
  Loading,
  Cache,
  Loaded,
  Empty,
  Error,
}

export interface DataSyncState {
  initialized: boolean
  state: SynchronizationState
  error: Error | string | null
}

export type ReadAllIndexesAction = PayloadAction<
  AllIndexes,
  DataSyncEvent.ReadAllIndexes
>

export type ReadAllIndexesRejectAction = PayloadAction<
  ReadAllIndexesError,
  DataSyncEvent.ReadAllIndexes
>

export type UpdateAllIndexesRejectAction = PayloadAction<
  UpdateAllIndexesError,
  DataSyncEvent.UpdateAllIndexes
>

export type DataInitializingError = PayloadAction<
  Error,
  DataSyncEvent.InitializingDataError
>
