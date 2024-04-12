/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { State } from "Core/core/constants"

export interface FilesStorageProps {
  state: State
  resetAllItems: () => void
  selectAllItems: () => void
  toggleItem: (id: string) => void
  selectedItems: string[]
  onDeleteClick: (ids: string[]) => void
  onManagerDeleteClick: () => void
  disableUpload: boolean
}
