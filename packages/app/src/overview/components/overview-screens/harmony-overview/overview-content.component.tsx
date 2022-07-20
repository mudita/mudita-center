/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { DeviceType } from "@mudita/pure"
import { FunctionComponent } from "App/__deprecated__/renderer/types/function-component.interface"
import {
  DeviceInfo,
  StatusInfo,
  SystemInfo,
  OverviewWrapper,
} from "App/overview/components/overview/overview.styles"

interface OverviewProps {
  readonly onUpdateCheck: () => void
  readonly onUpdateDownload: () => void
  readonly onUpdateInstall: () => void
  readonly toggleDevMode?: () => void
  readonly disconnectDevice: () => void
  readonly osVersion: string
  readonly batteryLevel: number
  readonly pureOsAvailable: boolean
  readonly pureOsDownloaded: boolean | undefined
  readonly deviceType: DeviceType
}

const OverviewContent: FunctionComponent<OverviewProps> = ({
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
