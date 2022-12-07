/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { State } from "App/core/constants"
import { AppError } from "App/core/errors"
import { DeviceType } from "App/device/constants"
import { DownloadState, UpdateError } from "App/update/constants"
import { OsRelease, ProcessedRelease } from "App/update/dto"

export interface HarmonyOverviewProps {
  readonly lowestSupportedOsVersion: string | undefined
  readonly batteryLevel: number | undefined
  readonly osVersion: string | undefined
  readonly updatingState: State
  readonly serialNumber: string | undefined
  readonly checkingForUpdateState: State
  readonly downloadingState: DownloadState
  readonly allReleases: OsRelease[] | null
  readonly updateOsError: AppError<UpdateError> | null
  readonly availableReleasesForUpdate: OsRelease[] | null
  readonly silentUpdateCheck: boolean
  readonly downloadingReleasesProcessStates: ProcessedRelease[] | null
  readonly startUpdateOs: (data: string) => void
  readonly setUpdateState: (data: State) => void
  readonly disconnectDevice: () => void
  readonly openContactSupportFlow: () => void
  readonly checkForUpdate: (deviceType: DeviceType) => void
  readonly silentCheckForUpdate: (deviceType: DeviceType) => void
  readonly downloadUpdates: (releases: OsRelease[]) => void
  readonly clearUpdateState: () => void
  readonly abortDownload: () => void
}
