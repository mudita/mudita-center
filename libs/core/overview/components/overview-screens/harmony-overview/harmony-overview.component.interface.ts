/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { State } from "Core/core/constants"
import { AppError } from "Core/core/errors"
import { CaseColour, DeviceType } from "Core/device/constants"
import {
  CheckForUpdateMode,
  DownloadState,
  SilentCheckForUpdateState,
  UpdateError,
} from "Core/update/constants"
import { OsRelease, ProcessedRelease } from "Core/update/dto"
import { RejectableThunk } from "Core/__deprecated__/renderer/store"
import { CheckForUpdateState } from "Core/update/constants/check-for-update-state.constant"

export interface HarmonyOverviewProps {
  readonly batteryLevel: number | undefined
  readonly osVersion: string | undefined
  readonly silentCheckForUpdateState: SilentCheckForUpdateState
  readonly updatingState: State
  readonly serialNumber: string | undefined
  readonly checkingForUpdateState: CheckForUpdateState
  readonly downloadingState: DownloadState
  readonly forceUpdateState: State
  readonly updateOsError: AppError<UpdateError> | null
  readonly availableReleasesForUpdate: OsRelease[] | null
  readonly downloadingReleasesProcessStates: ProcessedRelease[] | null
  readonly updatingReleasesProcessStates: ProcessedRelease[] | null
  readonly areAllReleasesDownloaded: boolean
  readonly forceUpdateNeeded: boolean
  readonly startUpdateOs: (releases: OsRelease[]) => void
  readonly openContactSupportFlow: () => void
  readonly checkForUpdate: (
    deviceType: DeviceType,
    mode: CheckForUpdateMode
  ) => RejectableThunk
  readonly setCheckForUpdateState: (state: CheckForUpdateState) => void
  readonly downloadUpdates: (releases: OsRelease[]) => void
  readonly clearUpdateState: () => void
  readonly abortDownload: () => void
  readonly forceUpdate: (releases: OsRelease[]) => void
  readonly closeForceUpdateFlow: () => void
  readonly caseColour: CaseColour
}
