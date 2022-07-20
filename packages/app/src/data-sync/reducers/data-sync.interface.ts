/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { PayloadAction } from "@reduxjs/toolkit"
import { AppError } from "App/core/errors"
import { DataSyncError, DataSyncEvent } from "App/data-sync/constants"
import { AllIndexes } from "App/data-sync/types"

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
  AppError<DataSyncError.ReadAllIndexes>,
  DataSyncEvent.ReadAllIndexes
>

export type UpdateAllIndexesRejectAction = PayloadAction<
  AppError<DataSyncError.UpdateAllIndexes>,
  DataSyncEvent.UpdateAllIndexes
>

export type SetErrorStateError = PayloadAction<
  Error,
  DataSyncEvent.SetErrorState
>
