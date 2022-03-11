/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { ComponentProps } from "react"
import { DeviceType } from "@mudita/pure"
import { Store as BasicInfoInitialState } from "Renderer/models/basic-info/basic-info.typings"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import {
  DeviceInfo,
  StatusInfo,
  SystemInfo,
  OverviewPureWrapper,
  FileManagerInfo,
  BackupInfo,
} from "App/overview/components/overview/overview.styles"
import { noop } from "Renderer/utils/noop"
import { PhoneUpdate } from "Renderer/models/phone-update/phone-update.interface"
import { AppSettings } from "App/main/store/settings.interface"
import Backup from "App/overview/components/backup/backup.component"

interface OverviewUIProps {
  readonly onUpdateCheck: () => void
  readonly onUpdateDownload: () => void
  readonly onUpdateInstall: () => void
  toggleDevMode?: () => void
}

type BackupProps = ComponentProps<typeof Backup>

const OverviewContent: FunctionComponent<
  Omit<
    BasicInfoInitialState,
    | "loadData"
    | "basicInfoDataState"
    | "updatingState"
    | "deviceConnected"
    | "deviceUnlocked"
    | "initialDataLoaded"
    | "deviceType"
  > &
    PhoneUpdate &
    OverviewUIProps &
    Partial<AppSettings> &
    BackupProps
> = ({
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
      usedSpace={memorySpace.full - memorySpace.free}
      maxSpace={memorySpace.full}
      onFilesOpen={noop}
    />
  </OverviewPureWrapper>
)

export default OverviewContent
