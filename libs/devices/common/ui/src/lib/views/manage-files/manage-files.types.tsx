/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { IconType } from "app-theme/models"

export interface FileManagerFileCategory {
  id: string
  icon: IconType
  markerColor: string
  label: string
  fileListEmptyStateDescription: string
  directoryPath: string
  supportedFileTypes: string[]
  size: string
  count: number
}

export type FileManagerFile = {
  id: string
  name: string
  type: string
  size: number
}

export type FileManagerFileMap = Record<string, FileManagerFile>

export type { ManageFilesTableSectionProps } from "./manage-files-table-section"
