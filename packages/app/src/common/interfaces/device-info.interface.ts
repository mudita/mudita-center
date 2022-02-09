/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { CaseColour } from "@mudita/pure"

export default interface DeviceInfo {
  // Device's serial number.
  readonly serialNumber: string

  // Current OS version.
  readonly osVersion: string

  // Device's case colour.
  readonly caseColour: CaseColour

  //  path to the location of backup files on device file-system
  readonly backupLocation: string
}
