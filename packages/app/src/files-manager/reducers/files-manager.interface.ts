/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { AppError } from "App/core/errors"
import { File } from "App/files-manager/dto"

export enum ResultState {
  Loading,
  Loaded,
  Empty,
  Error,
}

export interface FilesManagerState {
  resultState: ResultState
  files: File[]
  error: AppError | null
}
