/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { DeviceType, CaseColor } from "App/device/constants"
import { FunctionComponent } from "App/__deprecated__/renderer/types/function-component.interface"
import {
  DeviceInfo,
  StatusInfo,
  SystemInfo,
  OverviewPureWrapper,
  FileManagerInfo,
  BackupInfo,
} from "App/overview/components/overview/overview.styles"
import { noop } from "App/__deprecated__/renderer/utils/noop"
import { MemorySpace } from "App/files-manager/components/files-manager/files-manager.interface"

interface OverviewContentProps {
  readonly batteryLevel: number
  readonly memorySpace: MemorySpace
  readonly networkName: string
  readonly networkLevel: number | undefined
  readonly pureOsAvailable: boolean
  readonly pureOsDownloaded: boolean
  readonly checkForUpdatePerformed: boolean
  readonly checkForUpdateInProgress: boolean
  readonly checkForUpdateFailed: boolean
  readonly osVersion: string
  readonly caseColour: CaseColor | undefined
  readonly lastBackupDate: Date | undefined
  readonly serialNumber: string | undefined
  readonly disconnectDevice: () => void
  readonly onBackupCreate: () => void
  readonly onBackupRestore: () => void
  readonly onUpdateCheck: () => void
  readonly onUpdateDownload: () => void
  readonly onUpdateInstall: () => void
  readonly toggleDevMode?: () => void
  readonly backupActionDisabled: boolean
}

const OverviewContent: FunctionComponent<OverviewContentProps> = ({
  batteryLevel,
  disconnectDevice,
  memorySpace,
  networkName,
  networkLevel,
  onUpdateCheck,
  onUpdateDownload,
  onUpdateInstall,
  pureOsAvailable,
  pureOsDownloaded,
  checkForUpdatePerformed,
  checkForUpdateInProgress,
  checkForUpdateFailed,
  toggleDevMode,
  osVersion,
  caseColour,
  lastBackupDate,
  onBackupCreate,
  onBackupRestore,
  serialNumber,
  backupActionDisabled,
}) => (
  <OverviewPureWrapper>
    <DeviceInfo
      caseColour={caseColour}
      deviceType={DeviceType.MuditaPure}
      onClick={toggleDevMode}
      onDisconnect={disconnectDevice}
      serialNumber={serialNumber}
    />
    <StatusInfo
      deviceType={DeviceType.MuditaPure}
      batteryLevel={batteryLevel}
      network={networkName}
      networkLevel={networkLevel}
    />
    <SystemInfo
      updateDownloaded={pureOsDownloaded}
      updateAvailable={pureOsAvailable}
      checkForUpdatePerformed={checkForUpdatePerformed}
      checkForUpdateInProgress={checkForUpdateInProgress}
      checkForUpdateFailed={checkForUpdateFailed}
      osVersion={osVersion}
      onUpdateCheck={onUpdateCheck}
      onDownload={onUpdateDownload}
      onUpdate={onUpdateInstall}
    />
    <BackupInfo
      lastBackupDate={lastBackupDate}
      onBackupCreate={onBackupCreate}
      onBackupRestore={onBackupRestore}
      backupActionDisabled={backupActionDisabled}
    />
    <FileManagerInfo
      usedSpace={
        memorySpace.total -
        memorySpace.reservedSpace -
        memorySpace.usedUserSpace
      }
      maxSpace={memorySpace.total}
      onFilesOpen={noop}
    />
  </OverviewPureWrapper>
)

export default OverviewContent
