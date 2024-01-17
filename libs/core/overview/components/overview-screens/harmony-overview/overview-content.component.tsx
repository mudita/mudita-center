/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { CaseColor, DeviceType } from "Core/device/constants"
import { FunctionComponent } from "Core/core/types/function-component.interface"
import {
  DeviceInfo,
  StatusInfo,
  SystemInfo,
  OverviewWrapper,
} from "Core/overview/components/overview/overview.styles"

interface OverviewProps {
  readonly onUpdateCheck: () => void
  readonly onUpdateDownload: () => void
  readonly onUpdateInstall: () => void
  readonly toggleDevMode?: () => void
  readonly disconnectDevice: () => void
  readonly osVersion: string
  readonly batteryLevel: number
  readonly serialNumber: string | undefined
  readonly caseColour?: CaseColor
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
  caseColour,
}) => {
  return (
    <OverviewWrapper>
      <DeviceInfo
        caseColour={caseColour}
        deviceType={DeviceType.MuditaHarmony}
        onClick={toggleDevMode}
        onDisconnect={disconnectDevice}
        serialNumber={serialNumber}
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
