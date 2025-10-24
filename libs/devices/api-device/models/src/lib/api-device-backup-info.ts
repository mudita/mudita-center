/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { AbsolutePathWithGrantOptions } from "app-utils/models"

export interface ApiDeviceBackupInfo {
  path: AbsolutePathWithGrantOptions["fileAbsolutePath"]
  createdAt: Date
}
