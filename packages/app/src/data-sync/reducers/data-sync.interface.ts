/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { PayloadAction } from "@reduxjs/toolkit"
import { DataSyncEvent } from "App/data-sync/constants"
import { AllIndexes } from "App/data-sync/types"
import { UpdateAllIndexesError } from "App/data-sync/errors"

export enum SynchronizationState {
  Loading,
  Loaded,
  Empty,
  Error,
}

export interface DataSyncState {
  initialized: boolean
  state: SynchronizationState
  error: Error | string | null
}

export type UpdateAllIndexesAction = PayloadAction<
  AllIndexes,
  DataSyncEvent.UpdateAllIndexes
>

export type UpdateAllIndexesRejectAction = PayloadAction<
  UpdateAllIndexesError,
  DataSyncEvent.UpdateAllIndexes
>
