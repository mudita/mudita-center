/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { DeviceType, CaseColor } from "App/device/constants"

export interface DevicePreviewProps {
  onDisconnect: () => void
  onClick?: () => void
  deviceType: DeviceType | null
  caseColour?: CaseColor
  serialNumber?: string | undefined
}
