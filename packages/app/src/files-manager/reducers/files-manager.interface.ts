/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { AppError } from "App/core/errors"
import { State } from "App/core/constants"
import { File } from "App/files-manager/dto"

export interface FilesManagerState {
  files: File[]
  loading: State
  deleting: State
  uploading: State
  uploadingFileLength: number
  selectedItems: { rows: string[] }
  error: AppError | null
  uploadBlocked: boolean
}
