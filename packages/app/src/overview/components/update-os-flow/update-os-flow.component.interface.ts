/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { State } from "App/core/constants"
import { AppError } from "App/core/errors"
import { DownloadState, UpdateError } from "App/update/constants"
import { Release } from "App/update/dto"

export interface UpdateOsFlowProps {
  currentOsVersion: string
  checkForUpdateState: State
  downloadState: DownloadState
  updateState: State
  releaseAvailableForUpdate: Release | null
  silentUpdateCheck: boolean
  allReleases: Release[] | null
  error: AppError<UpdateError> | null
  downloadUpdate: (release?: Release) => void
  abortDownloading: () => void
  updateOs: (release?: Release) => void
  clearUpdateOsFlow: () => void
  openContactSupportFlow: () => void
  openHelpView: () => void
}
