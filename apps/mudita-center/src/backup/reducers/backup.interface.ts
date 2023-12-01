/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { AppError } from "App/core/errors"
import { State } from "App/core/constants"
import { Backup } from "App/backup/dto"
import { BackupError } from "App/backup/constants"

export interface BackupState {
  data: {
    backups: Backup[]
  }
  loadingState: State
  backingUpState: State
  restoringState: State
  error: AppError<BackupError> | null
}
