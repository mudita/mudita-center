/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Operation, OperationStatus } from "App/backup/constants"

export interface UpdaterStatus {
  updater_version: string
  performed_operation: Operation
  operation_result: OperationStatus
}
