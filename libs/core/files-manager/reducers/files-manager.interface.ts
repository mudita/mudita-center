/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { AppError } from "Core/core/errors"
import { State } from "Core/core/constants"
import { File } from "Core/files-manager/dto"

export type SoundApp =
  | "PURE_MUSIC"
  | "HARMONY_RELAXATION"
  | "HARMONY_ALARM"
  | "UNKNOWN"

export interface FilesManagerState {
  filesMap: Partial<Record<SoundApp, File[]>>
  activeSoundApp: SoundApp
  loading: State
  deleting: State
  uploading: State
  uploadingFileCount: number
  deletingFileCount: number
  selectedItems: { rows: string[] }
  error: AppError | null
  uploadBlocked: boolean
  duplicatedFiles: string[]
  invalidFiles: string[]
}
