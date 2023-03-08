/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { BackupError } from "App/backup"
import { Backup, RestoreBackup } from "App/backup/dto"
import { State } from "App/core/constants"
import { AppError } from "App/core/errors"
import { SynchronizationState } from "App/data-sync/reducers"
import { CaseColor, DeviceType } from "App/device/constants"
import { MemorySpace } from "App/files-manager/components/files-manager/files-manager.interface"
import {
  CheckForUpdateMode,
  DownloadState,
  SilentCheckForUpdateState,
  UpdateError,
} from "App/update/constants"
import { OsRelease, ProcessedRelease } from "App/update/dto"
import { RejectableThunk } from "App/__deprecated__/renderer/store"

export interface PureOverviewProps {
  readonly batteryLevel: number | undefined
  readonly osVersion: string | undefined
  readonly memorySpace: MemorySpace | undefined
  readonly networkName: string
  readonly networkLevel: number
  readonly pureOsBackupLocation: string
  readonly updatingState: State
  readonly caseColour: CaseColor
  readonly lastBackupDate: Date
  readonly backupDeviceState: State
  readonly restoreDeviceState: State
  readonly forceUpdateState: State
  readonly backups: Backup[]
  readonly backupError: AppError<BackupError> | null
  readonly syncState: SynchronizationState
  readonly serialNumber: string | undefined
  readonly silentCheckForUpdateState: SilentCheckForUpdateState
  readonly checkingForUpdateState: State
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
  readonly setCheckForUpdateState: (state: State) => void
  readonly downloadUpdates: (releases: OsRelease[]) => void
  readonly clearUpdateState: () => void
  readonly abortDownload: () => void
  forceUpdate: (releases: OsRelease[]) => void
  readonly backupActionDisabled: boolean
}
