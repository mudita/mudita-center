/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { File } from "App/files-manager/dto"
import { State } from "App/core/constants"

export interface FilesStorageProps {
  state: State
  files: File[]
  noFoundFiles: boolean
  searchValue: string
  onSearchValueChange: (value: string) => void
  resetAllItems: () => void
  selectAllItems: () => void
  toggleItem: (id: string) => void
  uploadFiles: () => void
  selectedItems: string[]
  allItemsSelected: boolean
  onDeleteClick: (ids: string[]) => void
  onManagerDeleteClick: () => void
}
