/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { CaseColour } from "core-device/models"
import { DeviceType } from "device-protocol/models"

export interface DevicePreviewProps {
  onClick?: () => void
  deviceType: DeviceType | null
  caseColour?: CaseColour
  serialNumber?: string | undefined
}
