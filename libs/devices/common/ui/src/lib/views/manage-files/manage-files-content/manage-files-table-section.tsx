/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FileManagerFileMap } from "../manage-files.types"

export interface ManageFilesTableSectionProps<FILE_MAP = FileManagerFileMap> {
  fileMap: FILE_MAP
  onRowClick?: (fileId?: string) => void
}
