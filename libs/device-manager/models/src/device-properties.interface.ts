/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { DeviceBaseProperties } from "device-protocol/models"
import { CaseColour } from "core-device/models"

export interface DeviceProperties extends DeviceBaseProperties {
  caseColour?: CaseColour
}
