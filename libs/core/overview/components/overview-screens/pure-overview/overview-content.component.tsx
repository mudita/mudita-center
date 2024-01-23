/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { DeviceType, CaseColour } from "Core/device/constants"
import { FunctionComponent } from "Core/core/types/function-component.interface"
import {
  DeviceInfo,
  StatusInfo,
  SystemInfo,
  OverviewPureWrapper,
  FileManagerInfo,
  BackupInfo,
} from "Core/overview/components/overview/overview.styles"
import { noop } from "Core/__deprecated__/renderer/utils/noop"
import { MemorySpace } from "Core/files-manager/components/files-manager/files-manager.interface"

interface OverviewContentProps {
  batteryLevel: number
  memorySpace: MemorySpace
  networkName: string
  networkLevel: number | undefined
  osVersion: string
  caseColour: CaseColour | undefined
  lastBackupDate: Date | undefined
  serialNumber: string | undefined
  disconnectDevice: () => void
  onBackupCreate: () => void
  onBackupRestore: () => void
  onUpdateCheck: () => void
  onUpdateDownload: () => void
  onUpdateInstall: () => void
  toggleDevMode?: () => void
  backupActionDisabled: boolean
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
      deviceType={DeviceType.MuditaPure}
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
