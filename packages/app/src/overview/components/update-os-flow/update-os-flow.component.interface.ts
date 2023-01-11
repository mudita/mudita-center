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

export interface UpdateOsFlowProps {
  currentOsVersion: string
  silentCheckForUpdateState: SilentCheckForUpdateState
  checkForUpdateState: State
  downloadState: DownloadState
  updateState: State
  availableReleasesForUpdate: OsRelease[] | null
  allReleases: OsRelease[] | null
  error: AppError<UpdateError> | null
  downloadingReleasesProcessStates: ProcessedRelease[] | null
  updatingReleasesProcessStates: ProcessedRelease[] | null
  downloadUpdates: (releases?: OsRelease[]) => void
  abortDownloading: () => void
  updateOs: (releases?: OsRelease[]) => void
  clearUpdateOsFlow: () => void
  openContactSupportFlow: () => void
  openHelpView: () => void
  tryAgainCheckForUpdate: () => void
}
