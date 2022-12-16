/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { CaseColor } from "App/device/constants"

export default interface DeviceInfo {
  readonly serialNumber: string
  readonly osVersion: string
  readonly caseColour: CaseColor
  readonly backupFilePath: string
  readonly syncFilePath: string
  readonly updateFilePath: string
  readonly recoveryStatusFilePath: string
  readonly deviceToken: string
}
