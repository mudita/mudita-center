/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export interface FilesManagerPanelProps {
  onUploadFile: () => void
  disabled: boolean
  toggleAll: () => void
  resetRows: () => void
  onDeleteClick: () => void
  selectedFiles: string[]
  allItemsSelected: boolean
}
