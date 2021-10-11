/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import {
  DeviceInfo,
  StatusInfo,
  SystemInfo,
  OverviewWrapper,
} from "App/overview/components/overview/overview.styles"
import { PhoneUpdate } from "Renderer/models/phone-update/phone-update.interface"
import { AppSettings } from "App/main/store/settings.interface"
import { HarmonyDeviceData } from "App/device"

interface OverviewUIProps {
  readonly onUpdateCheck: () => void
  readonly onUpdateDownload: () => void
  readonly onUpdateInstall: () => void
  toggleDevMode?: () => void
}

const OverviewContent: FunctionComponent<
  Omit<HarmonyDeviceData, "serialNumber"> &
    PhoneUpdate &
    OverviewUIProps &
    Partial<AppSettings>
> = ({
  batteryLevel,
  disconnectDevice,
  onUpdateCheck,
  onUpdateDownload,
  onUpdateInstall,
  pureOsAvailable,
  pureOsDownloaded,
  toggleDevMode,
  osVersion,
  deviceType,
}) => (
  <OverviewWrapper>
    <DeviceInfo
      deviceType={deviceType}
      onClick={toggleDevMode}
      onDisconnect={disconnectDevice}
    />
    <StatusInfo deviceType={deviceType} batteryLevel={batteryLevel} />
    <SystemInfo
      updateDownloaded={pureOsDownloaded}
      updateAvailable={pureOsAvailable}
      osVersion={osVersion}
      onUpdateCheck={onUpdateCheck}
      onDownload={onUpdateDownload}
      onUpdate={onUpdateInstall}
    />
  </OverviewWrapper>
)

export default OverviewContent
