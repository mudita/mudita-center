/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { AppError } from "Core/core/errors"
import { State } from "Core/core/constants"
import { Backup } from "Core/backup/dto"
import { BackupError } from "Core/backup/constants"

export interface BackupState {
  data: {
    backups: Backup[]
  }
  loadingState: State
  backingUpState: State
  restoringState: State
  error: AppError<BackupError> | null
}
