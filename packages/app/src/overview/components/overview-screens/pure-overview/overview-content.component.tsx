/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { DeviceType } from "@mudita/pure"
import { Store as BasicInfoInitialState } from "Renderer/models/basic-info/basic-info.typings"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import {
  DeviceInfo,
  StatusInfo,
  SystemInfo,
  OverviewWrapper,
  FileManagerInfo,
} from "App/overview/components/overview/overview.styles"
import { noop } from "Renderer/utils/noop"
import { PhoneUpdate } from "Renderer/models/phone-update/phone-update.interface"
import { AppSettings } from "App/main/store/settings.interface"

interface OverviewUIProps {
  readonly onUpdateCheck: () => void
  readonly onUpdateDownload: () => void
  readonly onUpdateInstall: () => void
  toggleDevMode?: () => void
}

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
    Partial<AppSettings>
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
}) => (
  <OverviewWrapper>
    <DeviceInfo
      caseColour={caseColour}
      deviceType={DeviceType.MuditaPure}
      onClick={toggleDevMode}
      onDisconnect={disconnectDevice}
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
    <FileManagerInfo
      usedSpace={memorySpace.full - memorySpace.free}
      maxSpace={memorySpace.full}
      onFilesOpen={noop}
    />
  </OverviewWrapper>
)

export default OverviewContent
