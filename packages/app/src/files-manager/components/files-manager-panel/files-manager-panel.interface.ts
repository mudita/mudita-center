/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */
import { ComponentProps } from "react"
import FilesManagerSearchInput from "App/files-manager/components/files-manager-search-input/files-manager-search-input"

export interface FilesManagerPanelProps
  extends ComponentProps<typeof FilesManagerSearchInput> {
  onUploadFile: () => void
  disabled: boolean
  toggleAll: () => void
  resetRows: () => void
  onDeleteClick: () => void
  selectedFiles: string[]
  allItemsSelected: boolean
}
