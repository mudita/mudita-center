/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FileManagerFile } from "devices/common/ui"

export enum FileCategoryId {
  alarmFiles = "alarmFiles",
  relaxationFiles = "relaxationFiles",
}

export type SegmentId = FileCategoryId | "otherFiles" | "free"

export type FileManagerFileMap = Record<string, FileManagerFile>

export type FileManagerCategoryFileMap = Record<
  FileCategoryId,
  FileManagerFileMap
>
