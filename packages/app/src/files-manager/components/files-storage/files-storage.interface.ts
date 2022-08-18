/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ComponentProps } from "react"
import { File } from "App/files-manager/dto"
import { State } from "App/core/constants"
import FilesManagerSearchInput from "App/files-manager/components/files-manager-search-input/files-manager-search-input"

export interface FilesStorageProps
  extends ComponentProps<typeof FilesManagerSearchInput> {
  state: State
  files: File[]
  noFoundFiles: boolean
  resetAllItems: () => void
  selectAllItems: () => void
  toggleItem: (id: string) => void
  uploadFiles: () => void
  selectedItems: string[]
  allItemsSelected: boolean
  onDeleteClick: (ids: string[]) => void
  onManagerDeleteClick: () => void
}
