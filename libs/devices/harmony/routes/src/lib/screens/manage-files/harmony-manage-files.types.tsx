/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FileManagerFileMap } from "devices/common/ui"

export enum FileCategoryId {
  AlarmFiles = "AlarmFiles",
  RelaxationFiles = "RelaxationFiles",
}

export type SegmentId = FileCategoryId | "otherFiles" | "free"

export type FileManagerCategoryFileMap = Record<
  FileCategoryId,
  FileManagerFileMap
>
