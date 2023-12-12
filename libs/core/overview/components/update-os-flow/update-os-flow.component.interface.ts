/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { State } from "Core/core/constants"
import { AppError } from "Core/core/errors"
import { DeviceType } from "Core/device"
import { ModalLayers } from "Core/modals-manager/constants/modal-layers.enum"
import {
  DownloadState,
  SilentCheckForUpdateState,
  UpdateError,
} from "Core/update/constants"
import { CheckForUpdateState } from "Core/update/constants/check-for-update-state.constant"
import { OsRelease, ProcessedRelease } from "Core/update/dto"

export interface UpdateOsFlowProps {
  currentOsVersion: string
  silentCheckForUpdateState: SilentCheckForUpdateState
  checkForUpdateState: CheckForUpdateState
  downloadState: DownloadState
  updateState: State
  availableReleasesForUpdate: OsRelease[] | null
  allReleases: OsRelease[] | null
  error: AppError<UpdateError> | null
  downloadingReleasesProcessStates: ProcessedRelease[] | null
  updatingReleasesProcessStates: ProcessedRelease[] | null
  areAllReleasesDownloaded: boolean
  deviceType: DeviceType
  downloadUpdates: (releases?: OsRelease[]) => void
  abortDownloading: () => void
  updateOs: (releases?: OsRelease[]) => void
  clearUpdateOsFlow: () => void
  openContactSupportFlow: () => void
  openHelpView: () => void
  tryAgainCheckForUpdate: () => void
  layer?: ModalLayers
}
