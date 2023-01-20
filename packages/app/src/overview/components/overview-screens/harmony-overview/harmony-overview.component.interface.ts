/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { State } from "App/core/constants"
import { AppError } from "App/core/errors"
import { DeviceType } from "App/device/constants"
import {
  CheckForUpdateMode,
  DownloadState,
  SilentCheckForUpdateState,
  UpdateError,
} from "App/update/constants"
import { OsRelease, ProcessedRelease } from "App/update/dto"
import { RejectableThunk } from "App/__deprecated__/renderer/store"

export interface HarmonyOverviewProps {
  readonly lowestSupportedOsVersion: string | undefined
  readonly batteryLevel: number | undefined
  readonly osVersion: string | undefined
  readonly silentCheckForUpdateState: SilentCheckForUpdateState
  readonly updatingState: State
  readonly serialNumber: string | undefined
  readonly checkingForUpdateState: State
  readonly downloadingState: DownloadState
  readonly allReleases: OsRelease[] | null
  readonly updateOsError: AppError<UpdateError> | null
  readonly availableReleasesForUpdate: OsRelease[] | null
  readonly downloadingReleasesProcessStates: ProcessedRelease[] | null
  readonly updatingReleasesProcessStates: ProcessedRelease[] | null
  readonly areAllReleasesDownloaded: boolean
  readonly startUpdateOs: (releases: OsRelease[]) => void
  readonly setUpdateState: (data: State) => void
  readonly disconnectDevice: () => void
  readonly openContactSupportFlow: () => void
  readonly checkForUpdate: (
    deviceType: DeviceType,
    mode: CheckForUpdateMode
  ) => RejectableThunk
  readonly setCheckForUpdateState: (state: State) => void
  readonly downloadUpdates: (releases: OsRelease[]) => void
  readonly clearUpdateState: () => void
  readonly abortDownload: () => void
}
