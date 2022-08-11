/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { DeviceType, CaseColour } from "@mudita/pure"
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
  readonly pureOsDownloaded: boolean | undefined
  readonly osVersion: string
  readonly caseColour: CaseColour | undefined
  readonly lastBackupDate: Date
  readonly serialNumber: string | undefined
  readonly disconnectDevice: () => void
  readonly onBackupCreate: () => void
  readonly onBackupRestore: () => void
  readonly onUpdateCheck: () => void
  readonly onUpdateDownload: () => void
  readonly onUpdateInstall: () => void
  readonly toggleDevMode?: () => void
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
  toggleDevMode,
  osVersion,
  caseColour,
  lastBackupDate,
  onBackupCreate,
  onBackupRestore,
  serialNumber,
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
      osVersion={osVersion}
      onUpdateCheck={onUpdateCheck}
      onDownload={onUpdateDownload}
      onUpdate={onUpdateInstall}
    />
    <BackupInfo
      lastBackupDate={lastBackupDate}
      onBackupCreate={onBackupCreate}
      onBackupRestore={onBackupRestore}
    />
    <FileManagerInfo
      usedSpace={memorySpace.total - memorySpace.reservedSpace}
      maxSpace={memorySpace.total}
      onFilesOpen={noop}
    />
  </OverviewPureWrapper>
)

export default OverviewContent
