/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Backup, RestoreBackup } from "App/backup/dto"
import { State } from "App/core/constants"
import { AppError } from "App/core/errors"
import { SynchronizationState } from "App/data-sync/reducers"
import { CaseColor, DeviceType } from "App/device/constants"
import { MemorySpace } from "App/files-manager/components/files-manager/files-manager.interface"
import { DownloadState, UpdateError } from "App/update/constants"
import { Release } from "App/update/dto"

export interface PureOverviewProps {
  readonly lowestSupportedOsVersion: string | undefined
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
  readonly backups: Backup[]
  readonly syncState: SynchronizationState
  readonly serialNumber: string | undefined
  readonly checkingForUpdateState: State
  readonly availableReleasesForUpdate: Release[] | null
  readonly downloadingState: DownloadState
  readonly allReleases: Release[] | null
  readonly updateOsError: AppError<UpdateError> | null
  readonly silentUpdateCheck: boolean
  readonly updateAllIndexes: () => Promise<void>
  readonly openContactSupportFlow: () => void
  readonly readRestoreDeviceDataState: () => void
  readonly startRestoreDevice: (option: RestoreBackup) => void
  readonly readBackupDeviceDataState: () => void
  readonly startBackupDevice: (secretKey: string) => void
  readonly setUpdateState: (data: State) => void
  readonly startUpdateOs: (data: string) => void
  readonly disconnectDevice: () => void
  readonly checkForUpdate: (deviceType: DeviceType) => void
  readonly silentCheckForUpdate: (deviceType: DeviceType) => void
  readonly downloadUpdate: (release: Release) => void
  readonly clearUpdateState: () => void
  readonly abortDownload: () => void
}
