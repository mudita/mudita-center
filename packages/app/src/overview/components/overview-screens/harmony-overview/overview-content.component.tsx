/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { CaseColor, DeviceType } from "App/device/constants"
import { FunctionComponent } from "App/__deprecated__/renderer/types/function-component.interface"
import {
  DeviceInfo,
  StatusInfo,
  SystemInfo,
  OverviewWrapper,
} from "App/overview/components/overview/overview.styles"

interface OverviewProps {
  onUpdateCheck: () => void
  onUpdateDownload: () => void
  onUpdateInstall: () => void
  toggleDevMode?: () => void
  disconnectDevice: () => void
  osVersion: string
  batteryLevel: number
  serialNumber: string | undefined
  caseColor?: CaseColor
}

const OverviewContent: FunctionComponent<OverviewProps> = ({
  batteryLevel,
  disconnectDevice,
  onUpdateCheck,
  onUpdateDownload,
  onUpdateInstall,
  toggleDevMode,
  osVersion,
  serialNumber,
  caseColor,
}) => {
  return (
    <OverviewWrapper>
      <DeviceInfo
        deviceType={DeviceType.MuditaHarmony}
        onClick={toggleDevMode}
        onDisconnect={disconnectDevice}
        serialNumber={serialNumber}
        caseColour={caseColor}
      />
      <StatusInfo
        deviceType={DeviceType.MuditaHarmony}
        batteryLevel={batteryLevel}
      />
      <SystemInfo
        deviceType={DeviceType.MuditaHarmony}
        osVersion={osVersion}
        onUpdateCheck={onUpdateCheck}
        onDownload={onUpdateDownload}
        onUpdate={onUpdateInstall}
      />
    </OverviewWrapper>
  )
}
export default OverviewContent
