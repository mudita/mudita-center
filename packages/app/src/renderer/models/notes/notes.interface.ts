/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import { Note } from "Renderer/modules/tools/tabs/notes.component"
import { SortOrder } from "Common/enums/sort-order.enum"

export interface StateProps {
  notes: Note[]
  newNoteId?: string
  sortOrder: SortOrder
}
