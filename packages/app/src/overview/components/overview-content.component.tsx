/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { ComponentProps } from "react"
import { Store as BasicInfoInitialState } from "Renderer/models/basic-info/basic-info.typings"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import styled from "styled-components"
import Phone from "App/overview/components/phone/phone.component"
import Network from "App/overview/components/network/network.component"
import System from "App/overview/components/system/system.component"
import FilesManager from "App/overview/components/files-manager/files-manager.component"
import { noop } from "Renderer/utils/noop"
import { PhoneUpdate } from "Renderer/models/phone-update/phone-update.interface"
import { AppSettings } from "App/main/store/settings.interface"
import Backup from "App/overview/components/backup/backup.component"

const PhoneInfo = styled(Phone)`
  grid-area: Phone;
`

const NetworkInfo = styled(Network)`
  grid-area: Network;
`
const SystemInfo = styled(System)`
  grid-area: System;
`

const BackupInfo = styled(Backup)`
  grid-area: Backup;
`

const FileManagerInfo = styled(FilesManager)`
  grid-area: FilesManager;
  display: none; /* TODO: Remove when feature becomes available */
`

const OverviewWrapper = styled.div`
  display: grid;
  grid-template-columns: minmax(28rem, 1fr) 2fr;
  grid-template-rows: repeat(3, minmax(20.4rem, 1fr));
  grid-column-gap: 3.2rem;
  grid-row-gap: 3.2rem;
  padding: 3.2rem;
  grid-template-areas:
    "Phone Network"
    "Phone System"
    "Phone Backup"
`

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
    | "serialNumber"
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
}) => (
  <OverviewWrapper>
    <PhoneInfo
      onClick={toggleDevMode}
      onDisconnect={disconnectDevice}
      caseColour={caseColour}
    />
    <NetworkInfo
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
  </OverviewWrapper>
)

export default OverviewContent
