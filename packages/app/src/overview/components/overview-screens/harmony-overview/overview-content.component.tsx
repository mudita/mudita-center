/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { DeviceType } from "App/device/constants"
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
  readonly checkForUpdateInProgress: boolean
  readonly osVersion: string
  readonly batteryLevel: number
  readonly pureOsAvailable: boolean
  readonly pureOsDownloaded: boolean
  readonly checkForUpdatePerformed: boolean
  readonly checkForUpdateFailed: boolean
  readonly deviceType: DeviceType
  readonly serialNumber: string | undefined
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
  serialNumber,
  checkForUpdateInProgress,
  checkForUpdatePerformed,
  checkForUpdateFailed,
}) => {
  return (
    <OverviewWrapper>
      <DeviceInfo
        deviceType={deviceType}
        onClick={toggleDevMode}
        onDisconnect={disconnectDevice}
        serialNumber={serialNumber}
      />
      <StatusInfo deviceType={deviceType} batteryLevel={batteryLevel} />
      <SystemInfo
        updateDownloaded={pureOsDownloaded}
        updateAvailable={pureOsAvailable}
        osVersion={osVersion}
        onUpdateCheck={onUpdateCheck}
        onDownload={onUpdateDownload}
        onUpdate={onUpdateInstall}
        checkForUpdateInProgress={checkForUpdateInProgress}
        checkForUpdatePerformed={checkForUpdatePerformed}
        checkForUpdateFailed={checkForUpdateFailed}
      />
    </OverviewWrapper>
  )
}
export default OverviewContent
