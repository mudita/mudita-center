/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { State } from "App/core/constants"
import { AppError } from "App/core/errors"
import { DownloadState, UpdateError } from "App/update/constants"
import { Release } from "App/update/dto"

export interface UpdateOsState {
  updateOsState: State
  checkForUpdateState: State
  downloadState: DownloadState
  silentUpdateCheck: boolean
  error: AppError<UpdateError> | null
  data: {
    allReleases: Release[] | null
    availableReleasesForUpdate: Release[] | null
  }
}
