/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { PayloadAction } from "@reduxjs/toolkit"
import { AppError } from "Core/core/errors"
import { DataSyncError, DataSyncEvent } from "Core/data-sync/constants"
import { AllIndexes } from "Core/data-sync/types"

export enum SynchronizationStatus {
  Loading = "LOADING",
  Cache = "CACHE",
  Loaded = "LOADED",
  Empty = "EMPTY",
  Error = "ERROR",
}

export interface DataSyncState {
  status: SynchronizationStatus
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
