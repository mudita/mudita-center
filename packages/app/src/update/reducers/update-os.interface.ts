/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { State } from "App/core/constants"
import { AppError } from "App/core/errors"
import {
  DownloadState,
  SilentCheckForUpdateState,
  UpdateError,
} from "App/update/constants"
import { OsRelease, ProcessedRelease } from "App/update/dto"
import { CheckForUpdateState } from "../constants/check-for-update-state.constant"

export interface UpdateOsState {
  updateOsState: State
  checkForUpdateState: CheckForUpdateState
  downloadState: DownloadState
  forceUpdateState: State
  silentCheckForUpdate: SilentCheckForUpdateState
  error: AppError<UpdateError> | null
  needsForceUpdate: boolean
  checkedForForceUpdateNeed: boolean
  data: {
    allReleases: OsRelease[] | null
    availableReleasesForUpdate: OsRelease[] | null
    downloadedProcessedReleases: ProcessedRelease[] | null
    updateProcessedReleases: ProcessedRelease[] | null
  }
}
