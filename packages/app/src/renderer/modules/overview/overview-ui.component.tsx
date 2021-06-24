/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { Store as BasicInfoInitialState } from "Renderer/models/basic-info/basic-info.typings"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import styled from "styled-components"
import Phone from "Renderer/components/rest/overview/phone/phone.component"
import Network from "Renderer/components/rest/overview/network/network.component"
import System from "Renderer/components/rest/overview/system/system.component"
import FilesManager from "Renderer/components/rest/overview/files-manager/files-manager.component"
import { noop } from "Renderer/utils/noop"
import { PhoneUpdate } from "Renderer/models/phone-update/phone-update.interface"
import { AppSettings } from "App/main/store/settings.interface"

const PhoneInfo = styled(Phone)`
  grid-area: Phone;
`

const NetworkInfo = styled(Network)`
  grid-area: Network;
`

const FileManagerInfo = styled(FilesManager)`
  grid-area: FilesManager;
  display: none; /* TODO: Remove when feature becomes available */
`

const OverviewWrapper = styled.div`
  display: grid;
  grid-template-columns: minmax(27rem, 1fr) minmax(59rem, 1fr);
  /* TODO: Change to grid-template-rows: repeat(4, 1fr) when Files Manager will be available */
  grid-template-rows: repeat(2, 1fr);
  grid-column-gap: 4rem;
  grid-row-gap: 4rem;
  height: 100%;
  padding: 3.2rem 3rem 3.7rem 4rem;
  grid-template-areas:
    "Phone Network"
    "Phone System"
    /*"Phone FilesManager" TODO: Uncomment when feature is done */;
`

interface OverviewUIProps {
  readonly onUpdateCheck: () => void
  readonly onUpdateDownload: () => void
  readonly onUpdateInstall: () => void
  toggleDevMode?: () => void
}

const OverviewUI: FunctionComponent<
  Omit<
    BasicInfoInitialState,
    | "loadData"
    | "basicInfoDataState"
    | "deviceUpdating"
    | "deviceConnected"
    | "deviceUnlocked"
    | "initialDataLoaded"
  > &
    PhoneUpdate &
    OverviewUIProps &
    Partial<AppSettings>
> = ({
  batteryLevel,
  changeSim,
  disconnectDevice,
  memorySpace,
  networkName,
  networkLevel,
  onUpdateCheck,
  onUpdateDownload,
  onUpdateInstall,
  osVersion,
  pureOsAvailable,
  pureOsDownloaded,
  simCards,
  toggleDevMode,
}) => (
  <OverviewWrapper>
    <PhoneInfo onClick={toggleDevMode} onDisconnect={disconnectDevice} />
    <NetworkInfo
      simCards={simCards}
      batteryLevel={batteryLevel}
      network={networkName}
      networkLevel={networkLevel}
    />
    <System
      updateDownloaded={pureOsDownloaded}
      updateAvailable={pureOsAvailable}
      osVersion={osVersion}
      onUpdateCheck={onUpdateCheck}
      onDownload={onUpdateDownload}
      onUpdate={onUpdateInstall}
    />
    <FileManagerInfo
      usedSpace={memorySpace.full - memorySpace.free}
      maxSpace={memorySpace.full}
      onFilesOpen={noop}
    />
  </OverviewWrapper>
)

export default OverviewUI
