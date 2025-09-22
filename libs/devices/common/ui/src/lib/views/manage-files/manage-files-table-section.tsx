/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FileManagerFileMap } from "./manage-files.types"

export interface ManageFilesTableSectionProps {
  fileMap: FileManagerFileMap
  activeRowId?: string
  onSelectedChange: (fileId: string, checked: boolean) => void
  selectedIds: Set<string>
}
