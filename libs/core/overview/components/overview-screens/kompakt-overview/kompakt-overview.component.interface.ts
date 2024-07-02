/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { BackupError } from "Core/backup"
import { Backup, RestoreBackup } from "Core/backup/dto"
import { State } from "Core/core/constants"
import { AppError } from "Core/core/errors"
import { SynchronizationStatus } from "Core/data-sync/reducers"
import { CaseColour } from "core-device/models"
import { DeviceType } from "device-protocol/models"
import { MemorySpace } from "Core/files-manager/components/files-manager-core/files-manager.interface"
import {
  CheckForUpdateMode,
  DownloadState,
  SilentCheckForUpdateState,
  UpdateError,
} from "Core/update/constants"
import { OsRelease, ProcessedRelease } from "Core/update/dto"
import { RejectableThunk } from "Core/__deprecated__/renderer/store"
import { CheckForUpdateState } from "Core/update/constants/check-for-update-state.constant"

export interface KompaktOverviewProps {
  readonly batteryLevel: number | undefined
  readonly osVersion: string | undefined
  readonly memorySpace: MemorySpace | undefined
  readonly networkName: string
  readonly networkLevel: number
  readonly pureOsBackupLocation: string
  readonly updatingState: State
  readonly caseColour: CaseColour
  readonly lastBackupDate: Date | undefined
  readonly backupDeviceState: State
  readonly restoreDeviceState: State
  readonly forceUpdateState: State
  readonly backups: Backup[]
  readonly backupError: AppError<BackupError> | null
  readonly syncState: SynchronizationStatus
  readonly serialNumber: string | undefined
  readonly silentCheckForUpdateState: SilentCheckForUpdateState
  readonly checkingForUpdateState: CheckForUpdateState
  readonly availableReleasesForUpdate: OsRelease[] | null
  readonly downloadingState: DownloadState
  readonly allReleases: OsRelease[] | null
  readonly updateOsError: AppError<UpdateError> | null
  readonly downloadingReleasesProcessStates: ProcessedRelease[] | null
  readonly updatingReleasesProcessStates: ProcessedRelease[] | null
  readonly areAllReleasesDownloaded: boolean
  readonly forceUpdateNeeded: boolean
  readonly updateAllIndexes: () => Promise<void>
  readonly openContactSupportFlow: () => void
  readonly readRestoreDeviceDataState: () => void
  readonly startRestoreDevice: (option: RestoreBackup) => void
  readonly readBackupDeviceDataState: () => void
  readonly startBackupDevice: (secretKey: string) => void
  readonly closeForceUpdateFlow: () => void
  readonly startUpdateOs: (releases: OsRelease[]) => void
  readonly disconnectDevice: () => void
  readonly checkForUpdate: (
    deviceType: DeviceType,
    mode: CheckForUpdateMode
  ) => RejectableThunk
  readonly setCheckForUpdateState: (state: CheckForUpdateState) => void
  readonly downloadUpdates: (releases: OsRelease[]) => void
  readonly clearUpdateState: () => void
  readonly abortDownload: () => void
  forceUpdate: (releases: OsRelease[]) => void
  readonly backupActionDisabled: boolean
}
