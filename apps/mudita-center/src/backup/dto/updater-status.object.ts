/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Operation } from "App/backup/constants"

export interface UpdaterStatus {
  version: string
  branch: string
  revision: string
  operation: Operation
  successful: boolean
  message: string
}
